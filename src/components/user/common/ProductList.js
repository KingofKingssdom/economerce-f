import "../indexUser.css"
import Product from "./Product";
import { useState, useEffect } from "react";
import axios from "axios";
function ProductList(props) {
    const [brandId, setBrandId] = useState(0);
    const [filterBrand, setFilterBrand] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/product/get/category/brand?categoryId=1&brandId=${brandId}`)
            .then((response) => {
                setFilterBrand(response.data.data.content);

            })
    }, [brandId]);

    let productShow = brandId !== 0 ? filterBrand : props.dataProduct;

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
                                // percent = {data.percent}
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
        </>
    )

}


export default ProductList;