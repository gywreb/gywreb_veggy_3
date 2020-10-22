import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useRef } from "react";
import styles from "./HeaderContent.module.scss";

const HeaderContent: React.FC = () => {
  const searchBar = useRef<Input>(null);
  const router = useRouter();

  const handleSearch = () => {
    const keyword = searchBar.current?.input.value;
    if (keyword?.length) {
      router.push({
        pathname: "/",
        query: { page: 1, keyword },
      });
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    if (!keyword.length && router.query.keyword) {
      router.push({
        pathname: "/",
        query: { page: 1 },
      });
    }
  };

  return (
    <div className="container">
      <Row className={styles.header_body} align="middle" gutter={[24, 24]}>
        <Col span={5}>
          <Link href="/">
            <a>
              <img src="/images/logo/veggy.png" alt="logo" />
            </a>
          </Link>
        </Col>
        <Col span={16} className="centerized">
          <Input.Search
            className={styles.search_bar}
            placeholder="Search for products"
            size="large"
            ref={searchBar}
            defaultValue={router.query.keyword || ""}
            onChange={handleSearchInput}
            onSearch={handleSearch}
            onPressEnter={handleSearch}
            enterButton
            disabled={router.pathname === "/" ? false : true}
          />
        </Col>
        <Col span={3}>
          <Button size="large" icon={<ShoppingCartOutlined />}></Button>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderContent;
