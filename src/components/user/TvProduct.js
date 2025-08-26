import { useState, useEffect } from "react";
import "./indexUser.css"
import Product from "./common/Product";
import { FaArrowDownShortWide, FaArrowDownWideShort } from "react-icons/fa6";
import {Link} from "react-router-dom";
import axios from "axios";
function TvProduct() {
        const [brands, setBrands] = useState([])
        const [selectFilter, setSelectFilter] = useState(null);
        const [brandId, setBrandId] = useState(null);
        const [tivis, setTivis] = useState([]);
        useEffect(() =>{
            const fetchBrand = async () => {
                try{
                    const response = await axios.get("http://localhost:8080/brand/category?categoryId=7");
                    setBrands(response.data);
                }
                catch(error){
                    console.error("Loi goi api ", error);
                }

            }  
            fetchBrand();
        },[])
    useEffect(()=>{
        const fetchTivi = async () => {
            try{
                const response = await axios.get("http://localhost:8080/product/category?categoryId=7");
                setTivis(response.data);
            
            }
            catch(error){
                console.error('Loi goi api', error);
            }

        }
        fetchTivi();
    },[])
    const handleBrand = async (selectedBrandId) => {
        setBrandId(selectedBrandId); 
        setSelectFilter(null);
        try {
            const response = await axios.get(`http://localhost:8080/product/category/brand?categoryId=7&brandId=${selectedBrandId}`);
            setTivis(response.data);
        } catch (error) {
            console.error("Lỗi khi gọi API sản phẩm theo thương hiệu:", error);
        }
    };
    const handleSelectFilter = async (filterType) => {
        setSelectFilter(filterType);
    
        let url = "http://localhost:8080/product/";
        
        if (filterType === "highToLow") {
            url += brandId ? `category/brand/price/desc?categoryId=7&brandId=${brandId}` : `category/price/desc?categoryId=7`;
        } else if (filterType === "lowToHigh") {
            url += brandId ? `category/brand/price/asc?categoryId=7&brandId=${brandId}` : `category/price/asc?categoryId=7`;
        }
    
        try {
            const response = await axios.get(url);
            setTivis(response.data);
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
                    <img src="./image/tvBanner1.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                    <img src="./image/tvBanner2.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="./image/tvBanner3.webp" className="d-block w-100" alt="..."/>
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
                    <img src="./image/tvBanner4.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                    <img src="./image/tvBanner5.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="./image/tvBanner6.webp" className="d-block w-100" alt="..."/>
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
                    { tivis.length > 0 ? (tivis.map(
                    (tivi)=>{
                        return (
                            <div className="box" key={tivi.id}>
                                <Link to = {`/tvDetail/${tivi.id}`}>
                                <Product 
                             
                             discountInfo = {tivi.discountPercent}
                             percent = {tivi.installment}
                             image= {tivi.productImage}
                             title ={tivi.productName}
                             price = { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                 tivi.priceCurrent)}
                             discount={new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND" }).format(tivi.pricePrevious)}
                             description={tivi.description}
                            />
                                </Link>
                            
                            </div>
                            )
                        
                        }
                    )):(<p>Không có sản phẩm nào</p>)}
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default TvProduct;