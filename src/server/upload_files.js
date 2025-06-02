import express from 'express';
import multer from 'multer';
import cors from 'cors';
import * as ftp from 'basic-ftp';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({origin: 'http://localhost:5173'}));

const upload = multer({ dest: 'uploads/' });

app.post('/upload-multiple', upload.any(), async (req, res) => {
    const client = new ftp.Client();
    client.ftp.verbose = false;

    const groupedResults = {}; // { variantId: [url1, url2] }

    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS,
            port: 21,
            secure: false
        });

        for (const file of req.files) {
            const variantField = file.fieldname;
            const variantId = variantField.split('_')[1];

            const remoteFileName = `${Date.now()}_${file.originalname}`;
            await client.uploadFrom(file.path, remoteFileName);
            fs.unlinkSync(file.path);

            const url = `https://ffmsdev.com/ImageHolder/${remoteFileName}`;

            if (!groupedResults[variantId]) {
                groupedResults[variantId] = [];
            }

            groupedResults[variantId].push(url);
        }

        res.send({ message: "Upload success", uploaded: groupedResults });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Upload failed" });
    } finally {
        client.close();
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});