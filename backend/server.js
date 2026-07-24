const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


app.post("/api/audit", async (req, res) => {
  let { url } = req.body;

  // Check empty input
  if (!url) {
    return res.status(400).json({
      error: "URL is required"
    });
  }
// Validate URL
try {
  const parsedUrl = new URL(
    url.startsWith("http") ? url : "https://" + url
  );

  if (!parsedUrl.hostname.includes(".")) {
    return res.status(400).json({
      error: "Invalid URL format"
    });
  }

  url = parsedUrl.href;

} catch {
  return res.status(400).json({
    error: "Invalid URL format"
  });
}


  try {
    const startTime = Date.now();

    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 PagePulse Bot"
      }
    });


    const responseTime = Date.now() - startTime;


    const contentType = response.headers["content-type"];


    // Check HTML response
    if (!contentType || !contentType.includes("text/html")) {
      return res.status(400).json({
        error: "Only HTML pages are supported"
      });
    }


    const html = response.data;

    const $ = cheerio.load(html);


    const title =
      $("title").text() || "No title found";


    const description =
      $('meta[name="description"]').attr("content") ||
      "No description found";


    const h1Count = $("h1").length;


    let missingAltImages = 0;

    $("img").each((index, img) => {
      const alt = $(img).attr("alt");

      if (!alt || alt.trim() === "") {
        missingAltImages++;
      }
    });


    const text = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim();


    const wordCount = text
      ? text.split(" ").length
      : 0;


    let seoScore = 100;

    if (title === "No title found") seoScore -= 20;
    if (description === "No description found") seoScore -= 20;
    if (h1Count === 0) seoScore -= 20;
    if (missingAltImages > 0) seoScore -= 10;
    if (wordCount < 300) seoScore -= 10;

    if (seoScore < 0) seoScore = 0;


    res.json({
      url,
      status: response.status,
      responseTime: `${responseTime} ms`,
      title,
      metaDescription: description,
      h1Count,
      imagesMissingAltText: missingAltImages,
      approximateWordCount: wordCount,
      seoScore
    });


  } catch (error) {

    if (error.code === "ECONNABORTED") {
      return res.status(408).json({
        error: "Request timeout"
      });
    }


    return res.status(500).json({
      error: "Unable to fetch webpage"
    });
  }
});


app.get("/",(req,res)=>{
    res.send("Page Pulse API Running");
});



const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});