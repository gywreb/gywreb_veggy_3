import { Col, Row, Typography } from "antd";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../src/components/ProductCard/ProductCard";
import ProductPagination from "../src/components/ProductPagination/ProductPagination";
import { loadProducts } from "../src/store/slices/products";
import { IProduct, RootState } from "../src/type";
import { openDB } from "../utils/openDB";

export const itemsPerPage = 8;

export interface HomePageProps {
  products: IProduct[] | null;
  startProduct: number;
  endProduct: number;
  page: number | null;
  totalProducts: number | null;
}

const HomePage: NextPage<HomePageProps> = ({
  products,
  startProduct,
  endProduct,
  page,
  totalProducts,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const keyword = useSelector<RootState, string | null>(
    (state) => state.products.keyword
  );
  const productsFromStore = useSelector<RootState, IProduct[]>(
    (state) => state.products.list
  );
  const [renderedProducts, setRenderedProducts] = useState<IProduct[] | null>(
    null
  );
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [isFound, setIsFound] = useState<boolean>(true);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  useEffect(() => {
    if (keyword && productsFromStore) {
      const keywordRegEx = new RegExp(keyword, "gi");
      const searchedProducts = productsFromStore.filter((product) =>
        product.name.match(keywordRegEx)
      );
      !searchedProducts.length ? setIsFound(false) : setIsFound(true);
      setTotalItems(searchedProducts.length);
      setRenderedProducts(searchedProducts.slice(startProduct, endProduct));
    } else {
      setIsFound(true);
      setTotalItems(null);
      setRenderedProducts(null);
    }
  }, [keyword, products]);

  return (
    <>
      {isFound ? (
        <>
          <Row gutter={[16, 16]} justify="center">
            {(renderedProducts || products)?.map((product) => (
              <Col key={product.id} xs={12} md={8} lg={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          {totalItems! > 9 || (!totalItems && totalProducts! > 9) ? (
            <Row style={{ margin: "20px 0px 50px" }} justify="center">
              <ProductPagination
                page={page || 1}
                itemsPerPage={itemsPerPage}
                totalPage={totalItems || totalProducts || 0}
              />
            </Row>
          ) : null}
        </>
      ) : (
        <Row gutter={[24, 24]} justify="center">
          <div className="centerized">
            <img src="/images/empty/bare-tree.png" alt="empty" />
          </div>
          <Col span={24} className="centerized">
            <Typography.Title level={2}>No Item Found! :(</Typography.Title>
          </Col>
        </Row>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  try {
    const currentPage = ctx.params?.page;
    const currentPageNumber = +(currentPage || 1);
    const startProduct = (currentPageNumber - 1) * itemsPerPage;
    const endProduct = currentPageNumber * itemsPerPage;
    const db = await openDB();
    const allProducts = await db.all("SELECT * FROM Products ");
    const products = allProducts.slice(startProduct, endProduct);
    return {
      props: {
        products,
        startProduct,
        endProduct,
        page: currentPageNumber,
        totalProducts: allProducts.length,
      },
    };
  } catch (error) {
    return { props: { products: null, page: null, totalProducts: null } };
  }
};

export default HomePage;
