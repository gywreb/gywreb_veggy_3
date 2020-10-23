import { Row } from "antd";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import Head from "next/head";
import React from "react";
import SQL from "sql-template-strings";
import ProductDetail from "../../src/components/ProductDetail/ProductDetail";
import { IProduct } from "../../src/type";
import { openDB } from "../../utils/openDB";

export interface ProductDetailsPageProps {
  product: IProduct | null;
}

const ProductDetailsPage: NextPage<ProductDetailsPageProps> = ({ product }) => {
  return (
    <>
      <Head>
        <title>Veggy | {product?.name}</title>
      </Head>
      <Row gutter={[0, 48]} justify="center">
        <ProductDetail product={product!} />
      </Row>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  try {
    const id = ctx.params?.id;
    const db = await openDB();
    const product = await db.get<IProduct>(
      SQL`SELECT * FROM Products WHERE id=${id}`
    );
    return { props: { product } };
  } catch (error) {
    return { props: { product: null } };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const db = await openDB();
    const products = await db.all<IProduct[]>(SQL`SELECT * FROM Products`);
    const paths = products.map(({ id }) => {
      return { params: { id: id.toString() } };
    });
    return { fallback: false, paths };
  } catch (error) {
    return { fallback: false, paths: [] };
  }
};

export default ProductDetailsPage;
