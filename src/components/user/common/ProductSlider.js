import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Product from "./Product";

function ProductSlider(props) {
  const datas = props.data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [widthBox, setWidthBox] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const BoxRef = useRef(null);
  console.log(" Giá trị current ", BoxRef.current);
  useEffect(() => {
    const updateWidth = () => {
      if (BoxRef.current) {
        const width = BoxRef.current.offsetWidth;
        console.log("width", width);
        setWidthBox(width);
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1200) setItemsToShow(5);
        else if (screenWidth >= 992) setItemsToShow(4);
        else if (screenWidth >= 768) setItemsToShow(3);
        else setItemsToShow(2);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  console.log("widthBox", widthBox);

  const changeLeft = () => {
    setCurrentIndex((pre) => Math.max(pre - widthBox, 0));
  };

  const changeRight = () => {
    const maxOffset = (datas.length - itemsToShow) * widthBox;
    setCurrentIndex((prev) => {
      const next = prev + widthBox;
      if (next > maxOffset) {
        return prev; // không cho cuộn nữa
      }
      return next;
    });
  };


  return (
    <div
      className="container-box"
    >
      <div
        className="slider-box-product"
        style={{
          display: "flex",
          transform: `translateX(-${currentIndex}px)`,
          transition: "transform 0.7s ease",
        }}
      >
        {datas.map((data, index) => (
          <div
            key={data.id}
            className="product-box"
            ref={BoxRef}
          >
            <Product
              preLink={props.getLink ? props.getLink(data) : props.links}
              id={data.id}
              discountInfo="Trả góp 0%"
              image={data.urlPhotoProduct}
              title={data.productName}
              price={data.productVariants?.[0]?.priceDiscount}
              discount={data.productVariants?.[0]?.priceOrigin}
              description={data.description}
            />
          </div>
        ))}
      </div>

      {/* 🔹 Nút điều hướng */}
      <div className="container-button-slider-product">

        <button onClick={changeLeft} className="btn-left-product">
          <IoIosArrowBack />
        </button>

        <button onClick={changeRight} className="btn-right-product">
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}

export default ProductSlider;