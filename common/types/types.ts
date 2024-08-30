export type CreateToken = {
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  image: File | null;
  description: string;
  revokeUpdate: boolean;
  revokeFreeze: boolean;
  revokeMint: boolean;
}

export type CreateTokenResult = {
  transaction?: string;
  message?: string;
  success: boolean;
};

export type CreateTokenMetadata = {
  name: string;
  symbol: string;
  description: string;
};

export type TokenMetadata = {
  name: string;
  symbol: string;
  description: string;
  image: string;
};

export interface Token 	{
  account: string,
  onChainAccountInfo: {
    accountInfo: {
      key: string,
      isSigner: boolean,
      isWritable: boolean,
      lamports: number,
      data: {
        parsed: {
          info: {
            decimals: number,
            freezeAuthority: string,
            isInitialized: boolean,
            mintAuthority: string,
            supply: string
          },
          type: string
        },
        program: string,
        space: number
      },
      owner: string,
      executable: boolean,
      rentEpoch: number
    },
    error: string
  },
  onChainMetadata: {
    metadata: {
      tokenStandard: string,
      key: string,
      updateAuthority: string,
      mint: string,
      data: {
        name: string,
        symbol: string,
        uri: string,
        sellerFeeBasisPoints: string,
        creators: any
      },
      primarySaleHappened: boolean,
      isMutable: boolean,
      editionNonce: number,
      uses: {
        useMethod: string,
        remaining: number,
        total: number
      },
      collection: string | null,
      collectionDetails: string | null,
    },
    error: string
  },
  offChainMetadata: {
    metadata: {
      createdOn: string,
      description: string,
      image: string,
      name: string,
      showName: boolean,
      symbol: string
    },
    uri: string,
    error: ''
  },
  legacyMetadata: string | null
}

export interface TokenDetails {
  address: string,
  holder_count: number,
  symbol: string,
  name: string,
  decimals: number,
  price: number,
  logo: string,
  price_1m: number,
  price_5m: number,
  price_1h: number,
  price_6h: number,
  price_24h: number,
  volume_24h: number,
  swaps_5m: number,
  swaps_1h: number,
  swaps_6h: number,
  swaps_24h: number,
  liquidity: number,
  max_supply: number,
  total_supply: number,
  biggest_pool_address: string,
  chain: string,
  creation_timestamp: number,
  open_timestamp: number,
  circulating_supply: number | null,
  high_price: number | null,
  high_price_timestamp: number | null,
  low_price: number | null,
  low_price_timestamp: number | null,
  buys_1m: number,
  sells_1m: number,
  swaps_1m: number,
  volume_1m: number,
  buy_volume_1m: number,
  sell_volume_1m: number,
  net_in_volume_1m: number,
  buys_5m: number,
  sells_5m: number,
  volume_5m: number,
  buy_volume_5m: number,
  sell_volume_5m: number,
  net_in_volume_5m: number,
  buys_1h: number,
  sells_1h: number,
  volume_1h: number,
  buy_volume_1h: number,
  sell_volume_1h: number,
  net_in_volume_1h: number,
  buys_6h:number,
  sells_6h: number,
  volume_6h: number,
  buy_volume_6h: number,
  sell_volume_6h: number,
  net_in_volume_6h: number,
  buys_24h:number,
  sells_24h: number,
  buy_volume_24h: number,
  sell_volume_24h: number,
  net_in_volume_24h: number,
  fdv: number,
  market_cap: number,
  circulating_market_cap: number | null,
  link: any,
  social_links: any,
  hot_level: string,
  is_show_alert: false,
  buy_tax: number | null,
  sell_tax: number | null,
  is_honeypot: boolean | null,
  renounced: boolean | null,
  top_10_holder_rate: number,
  renounced_mint: number,
  renounced_freeze_account: number,
  burn_ratio: string,
  burn_status: string,
  pool_info: any,
  launchpad: string,
  launchpad_status: 1,
  rug_ratio: number | null,
  holder_rugged_num: number | null,
  holder_token_num: number | null,
  rugged_tokens: string[],
  creator_address: string,
  creator_balance: string,
  creator_token_balance: string,
  creator_close: boolean,
  creator_percentage: string,
  creator_token_status: string,
  dev_token_burn_amount: number | null,
  dev_token_burn_ratio: number | null,
  twitter_name_change_history: string[],
  dexscr_ad: number,
  dexscr_update_link: number,
  cto_flag: number
}
