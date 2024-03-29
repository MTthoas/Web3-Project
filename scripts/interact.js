require('dotenv').config()

async function main() {
    
    console.log('Getting the non fun token contract...\n');
    const contractAddress = process.env.CONTRACT_ADDRESS
    const nonFunToken = await ethers.getContractAt('NonFunToken', contractAddress);
    const signers = await ethers.getSigners();

    console.log('Querying NFT collection name...');
    const name = await nonFunToken.name();
    console.log(`Token Collection Name: ${name}\n`);

    console.log('Querying NFT collection symbol...');
    const symbol = await nonFunToken.symbol();
    console.log(`Token Collection Symbol: ${symbol}\n`);

    // Mint a new NFT to the contractOwner

    console.log('Minting a new NFT from the collection to the contractOwner...');
    const contractOwner = signers[0].address;
    const initialMintCount = 10; // Number of NFTs to mint
    let initialMint = [];
    for (let i = 1; i <= initialMintCount; i++) {
        let tx = await nonFunToken.mintCollectionNFT(signers[0].address, i.toString());
        await tx.wait(); // wait for this tx to finish to avoid nonce issues
        initialMint.push(i.toString());
    }
    console.log(`${symbol} NFT with tokenIds ${initialMint} and minted to: ${contractOwner}\n`);

    // Query the balance of the contractOwner

    console.log(`Querying the balance count of contractOwner ${contractOwner}...`);
    let contractOwnerBalances = await nonFunToken.balanceOf(contractOwner);
    console.log(`${contractOwner} has ${contractOwnerBalances} NFTs from this ${symbol} collection\n`)

    // Query the owner of the first NFT minted

    const NFT1 = initialMint[0];
    console.log(`Querying the owner of ${symbol}#${NFT1}...`);
    const owner = await nonFunToken.ownerOf(NFT1);
    console.log(`Owner of NFT ${symbol} ${NFT1}: ${owner}\n`);

    // Transfer the first NFT minted to the second signer

    const collector = signers[1].address;
    console.log(`Transferring ${symbol}#${NFT1} to collector ${collector}...`);
    // safeTransferFrom() is overloaded (ie. multiple functions with same name) hence differing syntax
    await nonFunToken["safeTransferFrom(address,address,uint256)"](contractOwner, collector, NFT1);
    console.log(`${symbol}#${NFT1} transferred from ${contractOwner} to ${collector}`);
    console.log(`Querying the owner of ${symbol}#${NFT1}...`);
    let NFT1Owner = await nonFunToken.ownerOf(NFT1);
    console.log(`Owner of ${symbol}#${NFT1}: ${NFT1Owner}\n`);

    // Approve the contractOwner to spend the collector's NFT, then transfer it back

    const collectorContract = nonFunToken.connect(signers[1]); 
    await collectorContract.approve(contractOwner, NFT1);
    console.log(`contractOwner ${contractOwner} has been approved to spend collector ${collector} ${symbol}#${NFT1}\n`);

    console.log(`Getting the account approved to spend ${symbol}#${NFT1}...`);
    let NFT1Spender = await nonFunToken.getApproved(NFT1);
    console.log(`${NFT1Spender} has the approval to spend ${symbol}#${NFT1}\n`);



    // safeTransferFrom() with valid approve()
    console.log(`Transferring ${symbol}#${NFT1} from collector ${collector} to contractOwner ${contractOwner} using contractOwner wallet...`);
    // Calling the safeTransferFrom() using the contractOwner instance
    await nonFunToken["safeTransferFrom(address,address,uint256)"](collector, contractOwner, NFT1);
    NFT1Owner = await nonFunToken.ownerOf(NFT1);
    console.log(`Owner of ${symbol}#${NFT1}: ${NFT1Owner}\n`);

      // setApprovalForAll()
    console.log(`Approving collector to spend all of contractOwner ${symbol} NFTs...`);
      // Using the contractOwner contract instance as the caller of the function
    await nonFunToken.setApprovalForAll(collector, true) // The second parameter can be set to false to remove operator
    console.log(`collector ${collector} has been approved to spend all of contractOwner ${contractOwner} ${symbol} NFTs\n`)

    console.log(`Checking if collector has been approved to spend all of contractOwner ${symbol} NFTs`);
    const approvedForAll = await nonFunToken.isApprovedForAll(contractOwner, collector);
    console.log(`Is collector ${collector} approved to spend all of contractOwner ${contractOwner} ${symbol} NFTs: ${approvedForAll}\n`);


    // An example of safeTransferFrom() when the collector has approval to move all of the contractOwner NFTs. In this case, the collector transfers all of the NFTs in the contractOwner wallet to themselves.
    console.log(`Validating collector has approval to transfer all of contractOwner NFTs...`);
    // contractOwner NFT count before transfer
    contractOwnerBalances = await nonFunToken.balanceOf(contractOwner);
    console.log(`BEFORE: ${contractOwner} has ${contractOwnerBalances} NFTs from this ${symbol} collection`);
    let collectorBalances = await nonFunToken.balanceOf(collector);
    console.log(`BEFORE: ${collector} has ${collectorBalances} NFTs from this ${symbol} collection`);
    console.log(`Collector transferring all contractOwner NFTs to collector wallet`);
    for (let i = 0; i < initialMint.length; i++) {
        // Using the collector wallet to call the transfer
        await collectorContract["safeTransferFrom(address,address,uint256)"](contractOwner, collector, initialMint[i]);
    }
    console.log(`NFT transfer completed`);
    contractOwnerBalances = await nonFunToken.balanceOf(contractOwner);
    console.log(`AFTER: ${contractOwner} has ${contractOwnerBalances} NFTs from this ${symbol} collection`);
    collectorBalances = await nonFunToken.balanceOf(collector);
    console.log(`AFTER: ${collector} has ${collectorBalances} NFTs from this ${symbol} collection`);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });