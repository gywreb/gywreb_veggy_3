import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { openDB } from "../../../utils/openDB";

export default nextConnect().get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await openDB();
    const product = await db.get(
      "SELECT * FROM Products WHERE id = ?",
      req.query.id
    );
    product
      ? res.json(product)
      : res.status(404).json({ message: "Product not found!" });
  }
);
