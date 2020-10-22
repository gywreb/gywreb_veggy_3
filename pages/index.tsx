import { Col, Pagination, Row } from "antd";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "../src/components/ProductCard/ProductCard";
import { loadProducts } from "../src/store/slices/products";
import { IProduct } from "../src/type";
import { openDB } from "../utils/openDB";

const itemsPerPage = 8;

export interface HomePageProps {
  products: IProduct[] | null;
  page: number | null;
  totalProducts: number | null;
  currentKeyWord: string | null;
}

const HomePage: NextPage<HomePageProps> = ({
  products,
  page,
  totalProducts,
  currentKeyWord,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onChange = (page: number) => {
    currentKeyWord
      ? router.push({
          pathname: "/",
          query: { page, keyword: currentKeyWord },
        })
      : router.push({
          pathname: "/",
          query: { page },
        });
  };

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        {products?.map((product) => (
          <Col key={product.id} xs={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      {totalProducts && totalProducts > 9 ? (
        <Row style={{ margin: "20px 0px 50px" }} justify="center">
          <Pagination
            current={page || 1}
            onChange={onChange}
            pageSize={itemsPerPage}
            total={totalProducts}
          />
        </Row>
      ) : null}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const currentPage = ctx.query?.page;
    const keyword = ctx.query?.keyword;
    const currentKeyWord = keyword || null;
    const currentPageNumber = +(currentPage || 1);
    const startProduct = (currentPageNumber - 1) * itemsPerPage;
    const endProduct = currentPageNumber * itemsPerPage;
    const db = await openDB();
    const allProducts = currentKeyWord
      ? await db.all("SELECT * FROM Products WHERE LOWER(name) LIKE ?", [
          "%" + currentKeyWord + "%",
        ])
      : await db.all("SELECT * FROM Products ");
    const products = allProducts.slice(startProduct, endProduct);
    return {
      props: {
        products,
        page: currentPageNumber,
        totalProducts: allProducts.length,
        currentKeyWord,
      },
    };
  } catch (error) {
    return { props: { products: null, page: null, totalProducts: null } };
  }
};

export default HomePage;
