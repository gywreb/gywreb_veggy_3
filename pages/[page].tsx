import { GetStaticPaths } from "next";
import HomePage, { getStaticProps, itemsPerPage } from ".";
import { openDB } from "../utils/openDB";

export default HomePage;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const db = await openDB();
    const products = await db.all("SELECT * FROM Products");
    if (products) {
      const paths = Array.from(
        Array(Math.ceil(products.length / itemsPerPage) + 1).keys()
      )
        .map((page) => {
          return { params: { page: page.toString() } };
        })
        .slice(0);
      return { fallback: false, paths };
    }
    return {
      fallback: false,
      paths: [],
    };
  } catch (error) {
    return { fallback: false, paths: [] };
  }
};
