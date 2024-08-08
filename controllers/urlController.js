import { nanoid } from "nanoid";
import urlModel from "../models/Url.js";

export const generateShortUrl = async (req, res) => {
  try {
    const body = req.body;
    if (!body.url)
      return res
        .status(400)
        .send({ success: false, message: "Url is required" });

    const shortUrl = nanoid(8);

    await urlModel.create({
      shortId: shortUrl,
      redirectUrl: body.url,
    });

    res
      .status(201)
      .send({ success: true, message: "Short Url Generated", shortUrl });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something Wrong while generating Short URl" });
  }
};

export const redirectUrlController = async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const url = await urlModel.findOne({ shortId });

    if (url) {
      return res.redirect(url.redirectUrl);
    } else {
      res.status(404).json({ message: "URL not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
