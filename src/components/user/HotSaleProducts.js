import ProductSlider from "./common/ProductSlider";
import { useState, useEffect } from "react";
import axios from "axios";
function HotSaleProduct() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/product/search/featured?featured=true`)
      .then((response) => {
        setDataProduct(response.data.data);
      })

  }, []);


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
          <div className="time-container-hotSale">
            <div className="timer-left">
              Từ
              <span className="day-sale">20 / 08</span>
              Đến
              <span className="day-sale">22 / 08</span>
            </div>
            <div className="timer-right">
              Kết thúc sau <span className="day-sale">10 : 10 : 59</span>
            </div>
          </div>
          <ProductSlider
            getLink={(product) => {
              switch (product.categoryId) {
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