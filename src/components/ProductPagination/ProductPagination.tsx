import { Pagination } from "antd";
import { useRouter } from "next/dist/client/router";
import React from "react";

export interface ProductPaginationProps {
  page: number;
  itemsPerPage: number;
  totalPage: number;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({
  page,
  itemsPerPage,
  totalPage,
}) => {
  const router = useRouter();
  const onChange = (page: number) => {
    router.push(`/${page}`);
  };
  return (
    <Pagination
      current={page}
      onChange={onChange}
      pageSize={itemsPerPage}
      total={totalPage}
    />
  );
};

export default ProductPagination;
