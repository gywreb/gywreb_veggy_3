import axios from "axios";
import cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export default nextConnect()
  .use(cors())
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { data } = await axios.get(
        "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"
      );
      res.json(data);
    } catch (error) {}
  });
