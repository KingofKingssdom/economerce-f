import "../../../styles/index.css"
import { useState, useRef, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Product from "./Product";
function ProductSlider({ data = [], getLink }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 5;

  const changeLeft = () => {

    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const changeRight = () => {
    const maxIndex = data.length - itemsToShow;
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <div className="container-box" style={{ overflow: "hidden", width: "100%" }}>
      <div
        className="slider-box-product"
        style={{ '--current-index': currentIndex }}
      >
        {data.map((item) => {
          const link = getLink ? getLink(item) : "/productDetail";
          return (
            <div
              key={item.id}
              className="product-item-wrapper"

            >
              <Product
                preLink={link}
                id={item.id}
                discountInfo="Trả góp 0%"
                image={item.urlPhotoProduct}
                title={item.productName}
                price={item.productVariants?.[0]?.originPrice}
                discount={item.productVariants?.[0]?.currentPrice}
                description={item.description}
              />
            </div>
          );
        })}
      </div>

      {/* Nút điều hướng */}
      <div className="container-button-slider-product">
        <button
          onClick={changeLeft}
          className="btn-left-product"
          style={{ cursor: currentIndex === 0 ? "not-allowed" : "pointer", opacity: currentIndex === 0 ? 0.5 : 1 }}
        >
          <IoIosArrowBack />
        </button>

        <button
          onClick={changeRight}
          className="btn-right-product"
          style={{
            cursor: currentIndex >= data.length - itemsToShow ? "not-allowed" : "pointer",
            opacity: currentIndex >= data.length - itemsToShow ? 0.5 : 1
          }}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}
export default ProductSlider