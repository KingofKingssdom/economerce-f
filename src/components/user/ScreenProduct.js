
import "./indexUser.css"
import Product from "./common/Product";
import { FaArrowDownShortWide, FaArrowDownWideShort } from "react-icons/fa6";
import {Link} from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
function ScreenProduct() {
        const [brands, setBrands] = useState([])
        const [selectFilter, setSelectFilter] = useState(null);
        const [screens, setScreens] = useState([]);
        const [brandId, setBrandId] = useState(null);
        useEffect(() =>{
            const fetchBrand = async () => {
                try{
                    const response = await axios.get("http://localhost:8080/brand/category?categoryId=6");
                    setBrands(response.data);
                }
                catch(error){
                    console.error("Loi goi api ", error);
                }

            }  
            fetchBrand();
        },[])
    useEffect(()=>{
        const fetchScreen = async () => {
            try{
                const response = await axios.get("http://localhost:8080/product/category?categoryId=6");
                setScreens(response.data);
            
            }
            catch(error){
                console.error('Loi goi api', error);
            }

        }
        fetchScreen();
    },[])
    const handleBrand = async (selectedBrandId) => {
        setBrandId(selectedBrandId); // Cập nhật brandId vào state
        setSelectFilter(null);
        try {
            const response = await axios.get(`http://localhost:8080/product/category/brand?categoryId=6&brandId=${selectedBrandId}`);
            setScreens(response.data);
        } catch (error) {
            console.error("Lỗi khi gọi API sản phẩm theo thương hiệu:", error);
        }
    };
    const handleSelectFilter = async (filterType) => {
        setSelectFilter(filterType);
    
        let url = "http://localhost:8080/product/";
        
        if (filterType === "highToLow") {
            url += brandId ? `category/brand/price/desc?categoryId=6&brandId=${brandId}` : `category/price/desc?categoryId=6`;
        } else if (filterType === "lowToHigh") {
            url += brandId ? `category/brand/price/asc?categoryId=6&brandId=${brandId}` : `category/price/asc?categoryId=6`;
        }
    
        try {
            const response = await axios.get(url);
            setScreens(response.data);
        } catch (error) {
            console.error("Lỗi khi gọi API lọc sản phẩm:", error);
        }
    };
    return(
        <>
        <div className="container-detail">
            <div className="banner-detail">
                <div className="banner">
                <div id="carousel1" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                    <img src="./image/screenBanner1.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                    <img src="./image/screenBanner2.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="./image/screenBanner3.webp" className="d-block w-100" alt="..."/>
                    </div>
                    
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carousel1" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carousel1" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
                </div>

                <div className="banner">
                <div id="carousel2" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                    <img src="./image/screenBanner4.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                    <img src="./image/screenBanner5.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="./image/screenBanner6.webp" className="d-block w-100" alt="..."/>
                    </div>
                    
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carousel2" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carousel2" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
                </div>
                
            </div>
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
                <div>
                <div className="item-product">
                    { screens.length > 0 ? (
                      screens.map(
                        (screen)=>{
                            return (
                                <div className="box" key={screen.id}>
                                    <Link to ={`/screenDetail/${screen.id}`}>
                                    <Product 
                                 
                                 discountInfo = {screen.discountPercent}
                                 percent = {screen.installment}
                                 image= {screen.productImage}
                                 title ={screen.productName}
                                 price = { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                     screen.priceCurrent)}
                                 discount={new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND" }).format(screen.pricePrevious)}
                                 description={screen.description}
                                />
                                    </Link>
                                
                                </div>
                                )
                            
                            }
                        )  
                    ): ( <p>Không có sản phẩm nào</p>)
                    }
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default ScreenProduct