import "./indexUser.css"
import Product from "./common/Product";
import { FaArrowDownShortWide, FaArrowDownWideShort } from "react-icons/fa6";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
function SoundProduct() {
        const [brands, setBrands] = useState([])
        const [selectFilter, setSelectFilter] = useState(null);
        const [sounds, setSounds] = useState([]);
        const [brandId, setBrandId] = useState(null);
        useEffect(() =>{
            const fetchBrand = async () => {
                try{
                    const response = await axios.get("http://localhost:8080/brand/category?categoryId=4");
                    setBrands(response.data);
                }
                catch(error){
                    console.error("Loi goi api ", error);
                }

            }  
            fetchBrand();
        },[])

    useEffect(()=>{
        const fetchSound = async () => {
            try{
                const response = await axios.get("http://localhost:8080/product/category?categoryId=4");
                setSounds(response.data);
            
            }
            catch(error){
                console.error('Loi goi api', error);
            }

        }
        fetchSound();
    },[])
    const handleBrand = async (selectedBrandId) => {
        setBrandId(selectedBrandId); 
        setSelectFilter(null);
        try {
            const response = await axios.get(`http://localhost:8080/product/category/brand?categoryId=4&brandId=${selectedBrandId}`);
            setSounds(response.data);
        } catch (error) {
            console.error("Lỗi khi gọi API sản phẩm theo thương hiệu:", error);
        }
    };
    const handleSelectFilter = async (filterType) => {
        setSelectFilter(filterType);
    
        let url = "http://localhost:8080/product/";
        
        if (filterType === "highToLow") {
            url += brandId ? `category/brand/price/desc?categoryId=4&brandId=${brandId}` : `category/price/desc?categoryId=4`;
        } else if (filterType === "lowToHigh") {
            url += brandId ? `category/brand/price/asc?categoryId=4&brandId=${brandId}` : `category/price/asc?categoryId=4`;
        }
    
        try {
            const response = await axios.get(url);
            setSounds(response.data);
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
                    <img src="./image/soundBanner1.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                    <img src="./image/soundBanner2.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="./image/soundBanner3.webp" className="d-block w-100" alt="..."/>
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
                    <img src="./image/soundBanner4.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                    <img src="./image/soundBanner5.webp" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src="./image/soundBanner6.webp" className="d-block w-100" alt="..."/>
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
                    {sounds.length > 0 ? (sounds.map(
                    (sound)=>{
                        return (
                            <div className="box" key={sound.id}>
                                <Link to={`/soundDetail/${sound.id}`}>
                                <Product 
                            discountInfo = {sound.discountPercent}
                            percent = {sound.installment}
                            image= {sound.productImage}
                            title ={sound.productName}
                            price = { new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                                sound.priceCurrent)}
                            discount={new Intl.NumberFormat("vi-VN", {style: "currency", currency: "VND" }).format(sound.pricePrevious)}
                            description={sound.description}
                            
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
export default SoundProduct;