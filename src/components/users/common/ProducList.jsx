import "../../../styles/index.css"
import Product from "./Product.jsx"
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getProductByCategoryIdAndBrandId } from "../../../services/ApiProduct.js";
function ProductList(props) {
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const [initialList, setInitialList] = useState([]);
    const [brandId, setBrandId] = useState(0);
    const [filterBrand, setFilterBrand] = useState([]);
    // const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPage, setSelectedPage] = useState(1);
    const categoryId = props.categoryId
    // const leftArrow = () => {
    //     setOffset((prev) => prev + 40);
    // }
    // const rigtArrow = () => {
    //     setOffset((prev) => prev - 40);
    // }
    useEffect(() => {
        if (props.dataProduct) {
            setInitialList(props.dataProduct);
        }
    }, [props.dataProduct]);
    const fetchProduct = async () => {
        if (brandId === 0) return;

        try {
            const response = await getProductByCategoryIdAndBrandId(categoryId, brandId);
            if (response.data) {
                setFilterBrand(response.data);
            }
        } catch (error) {
            console.error("Lỗi lấy sản phẩm:", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [brandId]);


    const productShow = (brandId !== 0 ? filterBrand : initialList) || [];
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
                <h4>Lọc theo hãng</h4>
                <div className="item-brand">
                    {props.dataBrand?.map((brand) => (
                        <div
                            key={brand.id}
                            className={`box-brand ${brandId === brand.id ? "active" : ""}`}
                            onClick={
                                () => setBrandId(brand.id)}
                        >
                            <img src={`${IMAGE_BASE_URL}${brand.urlImageBrand}`} alt={brand.brandName} />
                        </div>))}
                </div>
            </div>

            <div className="item-product">
                {productShow.length > 0 ? (
                    productShow?.map((data) => (
                        <div className="box" key={data.id}>
                            <Product
                                preLink={props.link}
                                id={data.id}
                                discountInfo="Trả góp 0%"
                                image={data.urlPhotoProduct}
                                title={data.productName}
                                price={data.productVariants?.[0]?.currentPrice}
                                discount={data.productVariants?.[0]?.originPrice}
                                description={data.description}
                            />
                        </div>))) : (
                    <p>Không có sản phẩm nào.</p>
                )}
            </div>
            {/* <div className="container-page">
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
            </div> */}
        </>
    )
}
export default ProductList;