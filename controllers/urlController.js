import { nanoid } from "nanoid";
import urlModel from "../models/Url.js";

export const generateShortUrl = async (req, res) => {
  try {
    const { url: originalUrl } = req.body;

    if (!originalUrl) {
      return res
        .status(400)
        .send({ success: false, message: "URL is required" });
    }

    const existingUrl = await urlModel.findOne({
      redirectUrl: originalUrl,
    });

    if (existingUrl) {
      return res.status(200).send({
        success: true,
        message: "Short URL already exists",
        shortUrl: `${req.headers.host}/url/${existingUrl.shortId}`,
      });
    }

    let shortId;
    let idExists;
    do {
      shortId = nanoid(8);
      idExists = await urlModel.findOne({ shortId });
    } while (idExists);

    const newUrl = new urlModel({
      shortId,
      redirectUrl: originalUrl,
    });

    await newUrl.save();

    res.status(201).send({
      success: true,
      message: "Short URL generated successfully",
      shortUrl: `${req.headers.host}/url/${shortId}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Something went wrong while generating short URL",
      error,
    });
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
