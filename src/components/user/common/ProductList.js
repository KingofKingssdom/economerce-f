import "../indexUser.css"
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
function ProductList(props) {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [brandId, setBrandId] = useState(0);
    const [filterBrand, setFilterBrand] = useState([]);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPage, setSelectedPage] = useState(1);
    const leftArrow = () => {
        setOffset((prev) => prev + 40);
    }
    const rigtArrow = () => {
        setOffset((prev) => prev - 40);
    }

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/product/get/category/brand?categoryId=1&brandId=${brandId}`)
            .then((response) => {
                setFilterBrand(response.data.data.content);
                setCurrentPage(response.data.data.totalPages);
            })
    }, [brandId]);


    let productShow = brandId !== 0 ? filterBrand : props.dataProduct;
    console.log("Tổng trang", currentPage);
    const pages = [];
    for (let i = 1; i <= currentPage; i++) {
        pages.push(
            <div
                key={i}
                className={`page-item ${selectedPage === i ? "active" : ""}`}
                onClick={() => setSelectedPage(i)}
            >{i}
            </div>);
    }
    return (
        <>
            <div className="brand-selection">
                <h4>Chọn theo hãng</h4>
                <div className="item-brand">
                    {props.dataProductList?.map((brand) => (
                        <div
                            key={brand.id}
                            className={`box-brand ${brandId === brand.id ? "active" : ""}`}
                            onClick={
                                () => setBrandId(brand.id)}
                        // chỗ này sẽ làm nút lọc sản phẩm
                        >
                            <img src={brand.urlImageBrand} alt={brand.brandName} />
                        </div>))}
                </div>
            </div>

            <div className="item-product">
                {productShow.length > 0 ? (
                    productShow?.map((phone) => (
                        <div className="box" key={phone.id}>
                            <Product
                                preLink="/phoneDetail"
                                id={phone.id}
                                discountInfo="Trả góp 0%"
                                image={phone.urlPhotoProduct}
                                title={phone.productName}
                                price={phone.productVariants?.[0]?.priceDiscount}
                                discount={phone.productVariants?.[0]?.priceOrigin}
                                description={phone.description}
                            />
                        </div>))) : (
                    <p>Không có sản phẩm nào.</p>
                )}
            </div>
            <div className="container-page">
                <div className="btn-page-left"
                    onClick={leftArrow}
                ><FaArrowLeft /></div>
                <div className="number-item">
                    <div className="slider-item" style={{ transform: `translateX(${offset}px)` }}>
                        {pages}

                    </div>

                </div>
                <div className="btn-page-right"
                    onClick={rigtArrow}
                ><FaArrowRight /></div>
            </div>
        </>
    )

}


export default ProductList;