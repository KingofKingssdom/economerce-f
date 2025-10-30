import "../indexAdmin.css"

import axios from 'axios';
import { useEffect, useState } from 'react';


function AddProduct() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [productCode, setProductCode] = useState("");
    const [productName, setProductName] = useState("");
    const [quantityProduct, setQuantityProduct] = useState("");
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState("");
    const [promotional, setPromotional] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [brandId, setBrandId] = useState("");
    const [urlPhoto, setUrlPhoto] = useState("");



    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState(false);
    useEffect(() => {
        const fetchCategory = async () => {
            const response = await axios.get(`${API_BASE_URL}/category/search/all`);
            setCategories(response.data.data);
        }
        fetchCategory();
    }, [])
    useEffect(() => {
        const fetchBrand = async () => {
            const response = await axios.get(`${API_BASE_URL}/brand/search/all`);
            setBrands(response.data.data);
        }
        fetchBrand();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset thông báo trước đó
        setMessage("");
        setErrorMessage("");

        // Kiểm tra các trường bắt buộc
        if (!productName) {
            setErrorMessage("Vui lòng điền đầy đủ các thông tin.");
            return;
        }

        const formData = new FormData();
        formData.append("productCode", productCode);
        formData.append("productName", productName);
        formData.append("quantityProduct", quantityProduct);
        formData.append("description", description);
        formData.append("featured", featured);
        formData.append("promotional", promotional);
        formData.append("categoryId", categoryId);
        formData.append("brandId", brandId);
        formData.append("urlPhoto", urlPhoto);


        try {
            const response = await axios.post(`${API_BASE_URL}/product/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200 || response.status === 201) {
                setMessage(true)
                setTimeout(() => { setMessage(false) }, 5000)
                // Reset form
                setProductName("");
                setProductCode("");
                setFeatured("");
                setPromotional("");
                setQuantityProduct("");
                setDescription("");
                setUrlPhoto("");
            } else {
                setErrorMessage("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage("Có lỗi");
            } else {
                alert("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
            }
        }
    };


    return (
        <div className='container-admin'>
            <div className="content">
                {message && <p className="notification-success">Thêm thành công</p>}
                {errorMessage && <p className="notification-error">Thêm không thành công</p>}
                <div className="header-add">
                    <h2>Thêm sản phẩm</h2>
                </div>
                <div className="form-container">

                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label htmlFor="productCode">Mã sản phẩm:</label>
                            <input
                                type="text"
                                id="productCode"
                                name="productCode"
                                value={productCode}
                                onChange={(e) => setProductCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label htmlFor="fullName">Tên sản phẩm:</label>
                            <input
                                type="text"
                                id="productName"
                                name="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Thông tin khuyến mãi:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="quantityProduct">Số lượng nhập hàng:</label>
                            <input
                                type="number"
                                id="quantityProduct"
                                name="quantityProduct"
                                value={quantityProduct}
                                onChange={(e) => setQuantityProduct(e.target.value)}
                                required
                            />
                        </div>
                        <div className="">
                            <label htmlFor="categoryId">Danh mục sản phẩm:</label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                value={categoryId}
                                onChange={(e) => setCategoryId(Number(e.target.value))}
                            >
                                <option value="">Chọn</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.categoryName}</option>
                                ))}

                            </select>
                        </div>
                        <div className="">
                            <label htmlFor="brandId">Nhãn hiệu sản phẩm:</label>
                            <select
                                id="brandId"
                                name="brandId"
                                value={brandId}
                                onChange={(e) => setBrandId(Number(e.target.value))}
                            >
                                <option value="">Chọn</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="featured">Sản phẩm nổi bật:</label>
                            <select
                                id="featured"
                                name="featured"
                                value={featured}
                                onChange={(e) => setFeatured(e.target.value)}
                            >
                                <option value="">Chọn</option>
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="promotional">Sản phẩm khuyến mãi:</label>
                            <select
                                id="promotional"
                                name="promotional"
                                value={promotional}
                                onChange={(e) => setPromotional(e.target.value)}
                            >
                                <option value="">Chọn</option>
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="urlPhoto">Chọn ảnh sản phẩm:</label>
                            <input
                                type="file"
                                id="urlPhoto"
                                name="urlPhoto"
                                onChange={(e) => setUrlPhoto(e.target.files[0])}
                            />
                        </div>

                        <button className='button-add' type="submit">Thêm</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default AddProduct;
