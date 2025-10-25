// import needed modules
import express from "express";
import multer from "multer";
import crypto from "crypto";
import fs from "fs";

// create the express app
const app = express();

// create a temporary uploads folder for multer
const upload = multer({ dest: "uploads/" });

// serve everything inside the public folder (like index.html)
app.use(express.static("public"));

// route for handling the image comparison
app.post("/compare", upload.array("files", 2), (req, res) => {

    // check if exactly two files were uploaded
    if (req.files.length !== 2) {
        return res.status(400).send("<p>please upload exactly two images</p>");
    }

    // create an array to hold the hashes
    const hashes = req.files.map((file) => {
        // read file data
        const fileBuffer = fs.readFileSync(file.path);

        // generate a sha256 hash of the file
        const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

        // delete the temporary file after hashing
        fs.unlinkSync(file.path);

        // return the hash string
        return hash;
    });

    // check if both hashes are identical
    const match = hashes[0] === hashes[1];

    // choose a message depending on whether they match
    const result = match
        ? "✅ hashes match — files are identical"
        : "❌ hashes differ — files are different";

    // send back a simple html response with the hashes and result
    res.send(`
    <div style="font-family:sans-serif;text-align:center;margin-top:50px;">
      <h2>🔍 sha-256 hash comparison result</h2>
      <p><b>image 1 hash:</b><br>${hashes[0]}</p>
      <p><b>image 2 hash:</b><br>${hashes[1]}</p>
      <h3>${result}</h3>
      <a href="/">back to home</a>
    </div>
  `);
});

// start the web server on port 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`));
