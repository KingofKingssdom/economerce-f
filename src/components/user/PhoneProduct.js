import { useEffect, useState } from "react";
import "./indexUser.css";


import axios from "axios";
import ProductList from "./common/ProductList";

function PhoneProduct() {
  const [d, setData] = useState(null);
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/brand/get/category?categoryId=1")
      .then((response) => {
        setData(response.data.data);
      })

  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/product/search/category?categoryId=1")
      .then((response) => {
        setDataProduct(response.data.data.content);
      })
  }, []);


  return (
    <>
      <div className="container-detail">
        <p className="name-product-detail">Điện thoại</p>
        <div className="bg-phone-detail">
          <ProductList
            dataProductList={d}
            dataProduct={dataProduct}
          />
        </div>

      </div>
    </>
  );
}

export default PhoneProduct;
