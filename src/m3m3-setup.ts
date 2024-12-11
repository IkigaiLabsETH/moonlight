import StakeForFee from "@meteora-ag/m3m3";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import { AnchorProvider } from "@coral-xyz/anchor";
import { BN } from "@coral-xyz/anchor";
import { U64_MAX } from "@meteora-ag/m3m3";

class M3M3Service {
  private m3m3: StakeForFee | null = null;
  private provider: AnchorProvider | null = null;

  private assertInitialized() {
    if (!this.m3m3 || !this.provider) {
      throw new Error('M3M3Service not initialized. Call init() first');
    }
  }

  async init(wallet: any) {
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    this.provider = new AnchorProvider(connection, wallet, {
      commitment: "confirmed"
    });
    const poolAddress = new PublicKey("YOUR_POOL_ADDRESS");
    this.m3m3 = await StakeForFee.create(connection, poolAddress);
  }

  // Stake tokens
  async stakeTokens(wallet: any, amount: number) {
    this.assertInitialized();
    const stakeAmount = new BN(
      amount * 10 ** this.m3m3!.accountStates.tokenAMint.decimals
    );
    const stakeTx = await this.m3m3!.stake(stakeAmount, wallet.publicKey);
    return await this.provider!.sendAndConfirm(stakeTx);
  }

  // Get user balances
  async getUserBalances(wallet: any) {
    this.assertInitialized();
    await this.m3m3!.refreshStates();
    const userEscrow = await this.m3m3!.getUserStakeAndClaimBalance(wallet.publicKey);
    
    return {
      stakeBalance: userEscrow.stakeEscrow.stakeAmount.toNumber() / 
        10 ** this.m3m3!.accountStates.tokenAMint.decimals,
      claimableFeeA: userEscrow.unclaimFee.feeA.toNumber() / 
        10 ** this.m3m3!.accountStates.tokenAMint.decimals,
      claimableFeeB: userEscrow.unclaimFee.feeB.toNumber() / 
        10 ** this.m3m3!.accountStates.tokenBMint.decimals
    };
  }

  // Claim fees
  async claimFees(wallet: any) {
    this.assertInitialized();
    const claimTxs = await this.m3m3!.claimFee(
      wallet.publicKey,
      new BN(U64_MAX)
    );
    // Handle array of transactions
    const signatures = [];
    for (const tx of claimTxs) {
      signatures.push(await this.provider!.sendAndConfirm(tx));
    }
    return signatures;
  }

  // Unstake tokens
  async unstakeTokens(wallet: any, amount: BN) {
    this.assertInitialized();
    const unstakeKeyPair = Keypair.generate();
    const unstakeTx = await this.m3m3!.unstake(
      amount,
      unstakeKeyPair.publicKey, 
      wallet.publicKey
    );
    unstakeTx.partialSign(unstakeKeyPair);
    return await this.provider!.sendAndConfirm(unstakeTx);
  }

  // Cancel unstake
  async cancelUnstake(wallet: any, unstakeKeyPair: Keypair) {
    this.assertInitialized();
    const cancelTx = await this.m3m3!.cancelUnstake(
      unstakeKeyPair.publicKey,
      wallet.publicKey
    );
    return await this.provider!.sendAndConfirm(cancelTx);
  }

  // Withdraw after unstake period
  async withdrawUnstaked(wallet: any, unstakeKeyPair: Keypair) {
    this.assertInitialized();
    const withdrawTx = await this.m3m3!.withdraw(
      unstakeKeyPair.publicKey,
      wallet.publicKey
    );
    return await this.provider!.sendAndConfirm(withdrawTx);
  }

  // Get unstake period
  getUnstakePeriod() {
    this.assertInitialized();
    return this.m3m3!.accountStates.feeVault.configuration.unstakeLockDuration.toNumber();
  }
}

export const m3m3Service = new M3M3Service(); 