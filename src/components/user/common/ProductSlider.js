import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Product from "./Product"; // import đúng đường dẫn Product component của bạn

function ProductSlider(props) {
  const datas = props.data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4); // mặc định desktop
  const widthBox = 276; // chiều rộng 1 box (bạn có thể thay bằng % nếu muốn)

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setItemsToShow(4); // Desktop
      } else if (width >= 768) {
        setItemsToShow(3); // Tablet
      } else {
        setItemsToShow(2); // Mobile
      }
      setCurrentIndex(0); // reset về đầu khi resize
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);

    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const changeLeft = () => {
    setCurrentIndex((pre) => (pre === 0 ? 0 : pre - widthBox));
  };

  const changeRight = () => {
    setCurrentIndex((pre) => {
      const maxOffset = (datas.length - itemsToShow) * widthBox;
      if (pre >= maxOffset) {
        return maxOffset;
      } else {
        return pre + widthBox;
      }
    });
  };

  return (
    <>
      <div className="container-box" style={{ overflow: "hidden", position: "relative" }}>
        <div
          className="slider-box-product"
          style={{
            display: "flex",
            transform: `translateX(-${currentIndex}px)`,
            transition: "ease 0.7s",
          }}
        >
          {datas.map((data) => (
            <Product
              key={data.id}
              preLink={props.links}
              id={data.id}
              discountInfo="Trả góp 0%"
              image={data.urlPhotoProduct}
              title={data.productName}
              price={data.productVariants?.[0]?.priceDiscount}
              discount={data.productVariants?.[0]?.priceOrigin}
              description={data.description}
            />
          ))}
        </div>

        <div className="container-button-slider-product">
          <button
            onClick={changeLeft}
            className={`btn-left-product ${currentIndex === 0 ? "hidden-btn" : ""}`}
          >
            <IoIosArrowBack />
          </button>
          <button
            onClick={changeRight}
            className={`btn-right-product ${
              currentIndex >= (datas.length - itemsToShow) * widthBox ? "hidden-btn" : ""
            }`}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductSlider;