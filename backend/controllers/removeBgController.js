import cloudinary from "../config/cloudinary.js";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const removeBgController = async (req, res) => {
  try {
    let result;

    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;

      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ with: 768, height: 768, crop: "limit" }],
        encoding: "base64",
      });
    }

    const MODEL =
      "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003";

    const input = {
      image: result.url,
    };

    const output = await replicate.run(MODEL, { input });

    console.log("url", result);

    res.json({ oldUrl: result.url, newurl: output });
    
  } catch (error) {
    console.error("error", error);
  }
};
