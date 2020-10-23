import { Card, Col, Descriptions, Row, Typography } from "antd";
import React from "react";
import { IProduct } from "../../type";

export interface ProductDetailProps {
  product: IProduct;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { id, name, price, image, category } = product;
  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <img src={image} alt={name} />
        </Col>
        <Col xs={24} md={12}>
          <Descriptions
            title={
              <Typography.Title level={3}>{`${id}. ${name}`}</Typography.Title>
            }
            layout="vertical"
            bordered
          >
            <Descriptions.Item
              label={<Typography.Text strong>Price</Typography.Text>}
              span={3}
            >
              <Typography.Text
                type="danger"
                strong
                style={{ fontSize: "24px" }}
              >{`$${price}.00`}</Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item
              label={<Typography.Text strong>Category</Typography.Text>}
              span={3}
            >
              <Typography.Text type="success" strong>
                {category.toUpperCase()}
              </Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item
              label={<Typography.Text strong>Descriptions</Typography.Text>}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              sit sequi quis quo quasi ullam distinctio quisquam laboriosam modi
              officiis praesentium consequuntur esse blanditiis laudantium,
              natus deserunt sint. Est, asperiores?
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductDetail;
