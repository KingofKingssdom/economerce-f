import '../indexAdmin.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function UpdateProduct() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const { id } = useParams();
    const navigate = useNavigate();
    const [productCode, setProductCode] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [quantityProduct, setQuantityProduct] = useState("");
    const [featured, setFeatured] = useState(false);
    const [promotional, setPromotional] = useState(false);

    const [categoryIds, setCategoryIds] = useState("");
    const [brandIds, setBrandIds] = useState("");
    const [urlPhoto, setUrlPhoto] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState(false);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    console.log(categoryIds)
    console.log("brandId " + brandIds)

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
            setErrorMessage("Vui lòng điền đầy đủ các trường bắt buộc.");
            return;
        }

        const formData = new FormData();
        formData.append("productCode", productCode);
        formData.append("productName", productName);
        formData.append("featured", featured);
        formData.append("promotional", promotional);
        formData.append("quantityProduct", quantityProduct);
        formData.append("description", description);

        formData.append("categoryIds", categoryIds);
        formData.append("brandIds", brandIds);
        if (urlPhoto) {
            formData.append("urlPhoto", urlPhoto);
        }


        try {
            const response = await axios.put(`${API_BASE_URL}/product/update?productId=${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",

                },
            });
            if (response.status === 200 || response.status === 201) {
                setMessage(true);
                setTimeout(() => {
                    setMessage(false);
                    navigate('/admin/listProduct');
                }, 5000);
                // Reset form
                setProductCode("");
                setProductName("");
                setFeatured("");
                setPromotional("");
                setQuantityProduct("");
                setDescription("");
                setCategoryIds("");
                setBrandIds("");
                setUrlPhoto(null);

            } else {
                setErrorMessage("Đã có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className='container-admin'>
                <div className="content">
                    {message && <p className="notification-success">Cập nhập thành công</p>}
                    {errorMessage && <p className="notification-error">Cập nhập thất bại</p>}
                    <div className="header-add">
                        <h1>Cập nhập sản phẩm</h1>
                    </div>
                    <div className="form-container">

                        <form onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="productCode">Mã sản phẩm:</label>
                                <input
                                    placeholder='Mã sản phẩm'
                                    type="text"
                                    id="productCode"
                                    name="productCode"
                                    value={productCode}
                                    onChange={(e) => setProductCode(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="productName">Tên sản phẩm:</label>
                                <input
                                    placeholder='Tên sản phẩm'
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="">
                                <label htmlFor="description">Thông tin khuyến mãi:</label>
                                <input
                                    placeholder='khuyến mãi'
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="promotional">Sản phẩm khuyễn mãi:</label>
                                <select id='promotional' name='promotional'
                                    onChange={(e) => setPromotional(e.target.value)}
                                    required
                                >
                                    <option value="">Chọn</option>
                                    <option value={true}>Có</option>
                                    <option value={false}>Không</option>

                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="featured">Sản phẩm nổi bật:</label>
                                <select id='featured' name='featured'
                                    onChange={(e) => setFeatured(e.target.value)}
                                    required
                                >
                                    <option value="">Chọn</option>
                                    <option value={true}>Có</option>
                                    <option value={false}>Không</option>

                                </select>
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
                                <label htmlFor="categoryIds">Danh mục sản phẩm:</label>
                                <select
                                    id="categoryIds"
                                    name="categoryIds"
                                    value={categoryIds}
                                    onChange={(e) => setCategoryIds(Number(e.target.value))}
                                >
                                    <option value="">Chọn</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.categoryName}</option>
                                    ))}

                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="categoryIds">Nhãn hiệu sản phẩm:</label>
                                <select
                                    id="brandIds"
                                    name="brandIds"
                                    value={brandIds}
                                    onChange={(e) => setBrandIds(Number(e.target.value))}
                                >
                                    <option value="">Chọn</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="urlPhoto">Chọn ảnh sản phẩm:</label>
                                <input
                                    type="file"
                                    id="urlPhoto"
                                    name="urlPhoto"
                                    accept="image/*"
                                    onChange={(e) => setUrlPhoto(e.target.files[0])}
                                />
                            </div>

                            <button className='button-add' type="submit">Cập nhập</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
export default UpdateProduct;