

## Full Instructions for Using Thirdweb Contracts

### 1. Create a Fresh Repository

1. **Initialize a New Project**: Use `npx thirdweb create` to create a new project.
    ```bash
    npx thirdweb create
    ```
    Follow the prompts to set up your project. Choose the appropriate template and options for your needs.

### 2. Install Thirdweb Contracts

1. **Navigate to Your Project Directory**:
    ```bash
    cd your-project-directory
    ```

2. **Install Thirdweb Contracts Package**:
    ```bash
    npm install @thirdweb-dev/contracts
    ```
    or
    ```bash
    yarn add @thirdweb-dev/contracts
    ```

### 3. Create and Edit Your Solidity Contract

1. **Create a New Solidity File**: Create a new Solidity file in your `contracts` directory, e.g., `MyContract.sol`.

2. **Import the Required Extensions**: Import the necessary extensions from the Thirdweb contracts package. For example, to use the `ERC721Mintable` and `Ownable` extensions:
    ```solidity
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    import "@thirdweb-dev/contracts/extension/ERC721Mintable.sol";
    import "@thirdweb-dev/contracts/extension/Ownable.sol";

    contract MyNFT is ERC721Mintable, Ownable {
        constructor() ERC721Mintable("MyNFT", "MNFT") Ownable() {
            // Additional initialization code
        }

        function mintNFT(address to, uint256 tokenId) public onlyOwner {
            _mint(to, tokenId);
        }
    }
    ```

### 4. Compile and Deploy Your Contract

1. **Compile Your Contract**: Use your preferred tool (e.g., Hardhat, Truffle) to compile your contract. For Hardhat:
    ```bash
    npx hardhat compile
    ```

2. **Deploy Your Contract**: Write a deployment script and deploy your contract. For example, using Hardhat:
    ```javascript: scripts/deploy.js
    const { ethers } = require("hardhat");

    async function main() {
        const MyNFT = await ethers.getContractFactory("MyNFT");
        const myNFT = await MyNFT.deploy();
        await myNFT.deployed();
        console.log("MyNFT deployed to:", myNFT.address);
    }

    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
    ```

    Run the deployment script:
    ```bash
    npx hardhat run scripts/deploy.js --network your-network
    ```

### 5. Interact with Your Contract

1. **Use Thirdweb SDK**: You can use the Thirdweb SDK to interact with your deployed contract. Install the SDK:
    ```bash
    npm install @thirdweb-dev/sdk
    ```
    or
    ```bash
    yarn add @thirdweb-dev/sdk
    ```

2. **Write Interaction Scripts**: Create scripts to interact with your contract. For example, to mint an NFT:
    ```javascript: scripts/mint.js
    const { ThirdwebSDK } = require("@thirdweb-dev/sdk");
    const sdk = new ThirdwebSDK("your-network");

    async function main() {
        const contract = await sdk.getContract("your-contract-address");
        await contract.call("mintNFT", "recipient-address", "token-id");
        console.log("NFT minted successfully");
    }

    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
    ```

    Run the interaction script:
    ```bash
    node scripts/mint.js
    ```

### 6. Adding Logic to Use Extensions

1. **Implement Additional Functions**: Depending on the extensions you are using, you can add more functions to utilize their capabilities. For example, if you are using the `ERC721Burnable` extension, you can add a function to burn tokens:
    ```solidity
    import "@thirdweb-dev/contracts/extension/ERC721Burnable.sol";

    contract MyNFT is ERC721Mintable, ERC721Burnable, Ownable {
        constructor() ERC721Mintable("MyNFT", "MNFT") Ownable() {
            // Additional initialization code
        }

        function mintNFT(address to, uint256 tokenId) public onlyOwner {
            _mint(to, tokenId);
        }

        function burnNFT(uint256 tokenId) public {
            _burn(tokenId);
        }
    }
    ```

2. **Use Extension-Specific Functions**: Make sure to call the functions provided by the extensions in your contract logic. For example, if you are using the `ERC721Enumerable` extension, you can add a function to get the total supply of tokens:
    ```solidity
    import "@thirdweb-dev/contracts/extension/ERC721Enumerable.sol";

    contract MyNFT is ERC721Mintable, ERC721Enumerable, Ownable {
        constructor() ERC721Mintable("MyNFT", "MNFT") Ownable() {
            // Additional initialization code
        }

        function mintNFT(address to, uint256 tokenId) public onlyOwner {
            _mint(to, tokenId);
        }

        function totalSupply() public view returns (uint256) {
            return _totalSupply();
        }
    }
    ```

### References
- [Thirdweb Extensions Documentation](https://portal.thirdweb.com/contracts/build/extensions)
- [Thirdweb SDK Documentation](https://portal.thirdweb.com/sdk)

By following these comprehensive steps, you can create, deploy, and interact with contracts using Thirdweb, leveraging their powerful extensions to enhance your smart contracts.