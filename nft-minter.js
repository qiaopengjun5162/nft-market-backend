// import dotenv from 'dotenv';
import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
// dotenv.config("./.env");

// 0x5FbDB2315678afecb367f032d93F642f64180aa3

export async function mint(address, uri) {
    // const provider = new JsonRpcProvider(process.env.RPC);
    const provider = new JsonRpcProvider("http://localhost:8545");
    const signer = await provider.getSigner()

    const MyNFTAbi = JSON.parse(fs.readFileSync('./abis/MyNFT.json'));
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    const MyNFTContract = new ethers.Contract(contractAddress, MyNFTAbi, signer);
    // const MyNFTContract = new ethers.Contract(process.env.NFT, MyNFTAbi, signer);

    const result = await MyNFTContract.safeMint(address, uri);
    console.log(result.hash);
}

// mint('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 'https://ipfs.io/ipfs/QmZ4tj')
