import fs from 'fs';
import { create } from 'kubo-rpc-client';

// connect to ipfs daemon API server
const ipfs = create('http://localhost:5001')

export async function uploadFileToIPFS(filePath) {
    const file = fs.readFileSync(filePath);
    const result = await ipfs.add({
        path: filePath,
        content: file
    });
    console.log(result);
    return result
}

// uploadFileToIPFS("files/qkl-logo.jpg");

export async function uploadJSONToIPFS(json) {
    const result = await ipfs.add(JSON.stringify(json));
    console.log(result);
    return result
}

// uploadJSONToIPFS({ name: "test" })
