import { Col, Pagination, Row } from "antd";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../src/components/ProductCard/ProductCard";
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

  const onChange = (page: number) => {
    router.push(`/${page}`);
  };

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  useEffect(() => {
    if (keyword && productsFromStore) {
      const keywordRegEx = new RegExp(keyword, "gi");
      const searchedProducts = productsFromStore.filter((product) =>
        product.name.match(keywordRegEx)
      );
      setTotalItems(searchedProducts.length);
      setRenderedProducts(searchedProducts.slice(startProduct, endProduct));
    } else {
      setTotalItems(null);
      setRenderedProducts(null);
    }
  }, [keyword, products]);

  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        {(renderedProducts || products)?.map((product) => (
          <Col key={product.id} xs={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      {(totalItems && totalItems > 9) ||
      (totalItems ? false : totalProducts && totalProducts > 9) ? (
        <Row style={{ margin: "20px 0px 50px" }} justify="center">
          <Pagination
            current={page || 1}
            onChange={onChange}
            pageSize={itemsPerPage}
            total={totalItems || totalProducts || 0}
          />
        </Row>
      ) : null}
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
