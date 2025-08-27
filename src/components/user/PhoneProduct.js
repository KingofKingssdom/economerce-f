import { useEffect, useState } from "react";
import "./indexUser.css";
import Product from "./common/Product";
import { FaArrowDownShortWide, FaArrowDownWideShort } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";

function PhoneProduct() {
    const [brands, setBrands] = useState([]);
    const [phones, setPhones] = useState([]);
    const [selectFilter, setSelectFilter] = useState(null);
    const [brandId, setBrandId] = useState(null); // Lưu brandId khi người dùng chọn hãng

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await axios.get("http://localhost:8080/brand/category?categoryId=1");
                setBrands(response.data);
            } catch (error) {
                console.error("Lỗi khi gọi API thương hiệu:", error);
            }
        };
        fetchBrand();
    }, []);

    // Lấy ra sản phẩm toàn bộ theo danh mục 1
    useEffect(() => {
        const fetchPhone = async () => {
            try {
                const response = await axios.get("http://localhost:8080/product/category?categoryId=1");
                setPhones(response.data);
            } catch (error) {
                console.error("Lỗi khi gọi API sản phẩm:", error);
            }
        };
        fetchPhone();
    }, []);

    // Khi chọn hãng, lưu brandId và gọi API lấy sản phẩm theo brand
    const handleBrand = async (selectedBrandId) => {
        setBrandId(selectedBrandId); // Cập nhật brandId vào state
        setSelectFilter(null);
        try {
            const response = await axios.get(`http://localhost:8080/product/category/brand?categoryId=1&brandId=${selectedBrandId}`);
            setPhones(response.data);
        } catch (error) {
            console.error("Lỗi khi gọi API sản phẩm theo thương hiệu:", error);
        }
    };

    // Khi chọn filter (Cao - Thấp hoặc Thấp - Cao)
    const handleSelectFilter = async (filterType) => {
        setSelectFilter(filterType);
    
        let url = "http://localhost:8080/product/";
        
        if (filterType === "highToLow") {
            url += brandId ? `category/brand/price/desc?categoryId=1&brandId=${brandId}` : `category/price/desc?categoryId=1`;
        } else if (filterType === "lowToHigh") {
            url += brandId ? `category/brand/price/asc?categoryId=1&brandId=${brandId}` : `category/price/asc?categoryId=1`;
        }
    
        try {
            const response = await axios.get(url);
            setPhones(response.data);
        } catch (error) {
            console.error("Lỗi khi gọi API lọc sản phẩm:", error);
        }
    };

    return (
        <>
            <div className="container-detail">
              <p className="name-product-detail">Điện thoại</p> 
                {/* Chọn thương hiệu */}
                <div className="brand-selection">
                    <h4>Chọn theo hãng</h4>
                    <div className="item-brand">
                        {brands.map((brand) => (
                            <div
                                key={brand.id}
                                className={`box-brand ${brandId === brand.id ? "active" : ""}`} 
                                onClick={() => handleBrand(brand.id)}
                            >
                                <img src={`data:image/webp;base64,${brand.imageBrand}`} alt={brand.brandName} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bộ lọc sản phẩm */}
                <div className="product">
                    <h4>Sắp xếp theo</h4>
                    <div className="product-filter">
                        <p
                            className={`btn-filter ${selectFilter === "highToLow" ? "active" : ""}`}
                            onClick={() => handleSelectFilter("highToLow")}
                        >
                            <FaArrowDownShortWide /> Giá Cao - Thấp
                        </p>
                        <p
                            className={`btn-filter ${selectFilter === "lowToHigh" ? "active" : ""}`}
                            onClick={() => handleSelectFilter("lowToHigh")}
                        >
                            <FaArrowDownWideShort /> Giá Thấp - Cao
                        </p>
                    </div>

                    {/* Hiển thị danh sách sản phẩm */}
                    <div className="item-product">
                        {phones.length > 0 ? (
                            phones.map((phone) => (
                                <div className="box" key={phone.id}>
                                    <Link to={`/phoneDetail/${phone.id}`}>
                                        <Product
                                            discountInfo={phone.discountPercent}
                                            percent={phone.installment}
                                            image={phone.productImage}
                                            title={phone.productName}
                                            price={new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(phone.priceCurrent)}
                                            discount={new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(phone.pricePrevious)}
                                            description={phone.description}
                                        />
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>Không có sản phẩm nào.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PhoneProduct;
