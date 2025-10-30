import { useEffect, useState } from "react";
import "./indexUser.css";


import axios from "axios";
import ProductList from "./common/ProductList";

function PhoneProduct() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [d, setData] = useState(null);
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/brand/get/category?categoryId=1`)
      .then((response) => {
        setData(response.data.data);
      })

  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/product/search/category?categoryId=1`)
      .then((response) => {
        setDataProduct(response.data.data.content);
      })
  }, []);


  return (
    <>
      <div className="container-detail">
        <p className="name-product-detail">Điện thoại</p>
        <ProductList
          dataProductList={d}
          dataProduct={dataProduct}
        />
      </div>
    </>
  );
}

export default PhoneProduct;
