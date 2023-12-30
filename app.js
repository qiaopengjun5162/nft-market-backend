// const express = require('express');
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import fileUpload from "express-fileupload";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./ipfs-uploader.js";
import { mint } from './nft-minter.js';
dotenv.config("./.env");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors())

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/upload', (req, res) => {
    // 先获取title
    const title = req.body.title;
    const description = req.body.description;
    const address = req.body.address

    const file = req.files.file;
    const filename = file.name;
    const filePath = "files/" + filename;
    file.mv(filePath, async (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("File " + filename + " failed to upload");
        }

        const fileResult = await uploadFileToIPFS(filePath);
        const fileCid = fileResult.cid.toString();

        const metadata = {
            title: title,
            description: description,
            image: 'http://127.0.0.1:8080/ipfs/' + fileCid
        }
        const metadataResult = await uploadJSONToIPFS(metadata);
        const metadataCid = metadataResult.cid.toString();
        console.log(metadataCid);

        // await mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 'http://127.0.0.1:8080/ipfs/' + metadataCid)
        const userAddress = address || process.env.ADDRESS;
        await mint(userAddress, 'http://127.0.0.1:8080/ipfs/' + metadataResult.cid.toString())

        res.json({
            message: 'file uploaded successfully!',
            // data: fileCid
            metadata: metadata
        })
    });
    // console.log(req.files);
});

const HOST = process.env.HOST
const PORT = process.env.PORT

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT}`)
});
