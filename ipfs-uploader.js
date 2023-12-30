import fs from 'fs';
import { create } from 'kubo-rpc-client';

// connect to ipfs daemon API server
const ipfs = create('http://localhost:5001')

export async function uploadFileToIPFS(filePath) {
    try {
        const file = fs.readFileSync(filePath);
        const result = await ipfs.add({
            path: filePath,
            content: file
        });
        console.log(result);
        return result
    } catch (err) {
        console.error('Failed to add file to IPFS:', err);
    }
}

// uploadFileToIPFS("files/qkl-logo.jpg");

export async function uploadJSONToIPFS(json) {
    try {
        const result = await ipfs.add(JSON.stringify(json));
        console.log(result);
        return result
    } catch (err) {
        console.error('Failed to add JSON to IPFS:', err);
    }
}

// uploadJSONToIPFS({ name: "test" })
