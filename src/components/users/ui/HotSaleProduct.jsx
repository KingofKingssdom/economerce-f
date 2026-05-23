import "../../../styles/index.css";
import { useState, useEffect } from "react";
import { getProductPromotional } from "../../../services/ApiProduct";
import ProductSlider from "../common/ProductSlider";
function HotSaleProduct() {
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    getProductPromotional().then((response) => {
      setDataProduct(response.data);
    })
  }, [])
  return (
    <>
      <div className="container-hotSale">
        <div className="container-header-hotSale">
          <div className="header-hotSale">
            <p>BẢNG TIN KHUYẾN MÃI</p>
          </div>
          <div className="top-sale">
          </div>
        </div>


        <div className="content-hotSale">

          <ProductSlider
            getLink={(product) => {
              const categoryId = product.resCategory?.id;
              switch (categoryId) {
                case 1:
                  return "/phoneDetail";
                case 2:
                  return "/tabletDetail";
                case 3:
                  return "/laptopDetail";
                default:
                  return "/productDetail";
              }
            }}

            data={dataProduct}
          />
        </div>

      </div>
    </>
  )
}
export default HotSaleProduct;