import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import Link from "next/link";
import React from "react";
import { IProduct } from "../../type";
import styles from "./ProductCard.module.scss";

export interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, image, category } = product;
  return (
    <Link href={`/product/${id}`}>
      <a>
        <Card
          className={styles.card_body}
          hoverable
          cover={<img alt="product_img" src={image} />}
        >
          <Meta title={name} description={`$${price} - ${category}`} />
        </Card>
      </a>
    </Link>
  );
};

export default ProductCard;
