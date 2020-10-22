import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { openDB } from "../../../utils/openDB";

export default nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await openDB();
    const products = await db.all("SELECT * FROM Products");
    res.json(products);
  }
);
