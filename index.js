import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));

const API_URL = "https://evilinsult.com/generate_insult.php?lang=en&type=json";


app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const insult = response.data.insult;
    res.render("index.ejs", { insult: insult });
  } catch (error) {
    res.status(500);
  }
});

app.get("/insult", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json({ insult: response.data.insult });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch insult" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
