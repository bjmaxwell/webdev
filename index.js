import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://qrtag.net/api/qr_transparent_6.svg?url=";

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { content: null }); // Initialize content as null
});

app.get("/generate-qr", async (req, res) => {
  const {url} = req.query; // Get the URL from the query parameter

  try {
    // Use axios to fetch the QR code from the API
    const response = await axios.get(API_URL + url);
    res.render("index.ejs", { content: response.data, error: "Please enter a valid URL" });
  } catch (error) {
    res.render("index.ejs", { error: JSON.stringify(error), content: null });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
