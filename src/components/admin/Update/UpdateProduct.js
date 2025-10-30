import '../indexAdmin.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");
    const [pricePrevious, setPricePrevious] = useState("");
    const [priceCurrent, setPriceCurrent] = useState("");
    const [discountPercent, setDiscountPercent] = useState("");
    const [quantity, setQuantity] = useState("");
    const [status, setStatus] = useState("");
    const [installment, setInstallment] = useState("");
    const [description, setDescription] = useState("");
    const [categoryIds, setCategoryIds] = useState("");
    const [brandIds, setBrandIds] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState(false);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchCategory = async () => {
            const response = await axios.get("http://localhost:8080/category/getAll");
            setCategories(response.data);
        }
        fetchCategory();
    }, [])
    useEffect(() => {
        const fetchBrand = async () => {
            const response = await axios.get("http://localhost:8080/brand/getAll");
            setBrands(response.data);
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
        formData.append("productName", productName);
        formData.append("pricePrevious", pricePrevious);
        formData.append("priceCurrent", priceCurrent);
        formData.append("discountPercent", discountPercent);
        formData.append("quantity", quantity);
        formData.append("status", status);
        formData.append("installment", installment);
        formData.append("description", description);
        formData.append("categoryIds", categoryIds);
        formData.append("brandIds", brandIds);
        if (productImage) {
            formData.append("productImage", productImage);
        }


        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8080/product/update/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 200 || response.status === 201) {
                setMessage(true);
                setTimeout(() => {
                    setMessage(false);
                    navigate('/admin/listProduct');
                }, 5000);
                // Reset form
                setProductName("");
                setPricePrevious("");
                setPriceCurrent("");
                setDiscountPercent("");
                setQuantity("");
                setStatus("");
                setInstallment("");
                setDescription("");
                setCategoryIds("");
                setBrandIds("");
                setProductImage(null);

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
                                <label htmlFor="discountPercent">Giảm giá:</label>
                                <input
                                    placeholder='Giảm %'
                                    type="text"
                                    id="discountPercent"
                                    name="discountPercent"
                                    value={discountPercent}
                                    onChange={(e) => setDiscountPercent(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="wordDay">Trả góp với lãi xuất:</label>
                                <input
                                    placeholder='lãi xuất %'
                                    type="text"
                                    id="installment"
                                    name="installment"
                                    value={installment}
                                    onChange={(e) => setInstallment(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="full-width">
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
                                <label htmlFor="dob">Giá trước khi giảm:</label>
                                <input
                                    type="number"
                                    id="pricePrevious"
                                    name="pricePrevious"
                                    value={pricePrevious}
                                    onChange={(e) => setPricePrevious(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="priceCurrent">Giá bán:</label>
                                <input
                                    type="number"
                                    id="priceCurrent"
                                    name="priceCurrent"
                                    value={priceCurrent}
                                    onChange={(e) => setPriceCurrent(e.target.value)}
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
                                <label htmlFor="quantity">Số lượng nhập hàng:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="gender-container">
                                <label htmlFor="status">Trạng thái:</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Chọn</option>
                                    <option value="Còn hàng">Còn hàng</option>
                                    <option value="Hết hàng">Hết hàng</option>
                                </select>
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
                                <label htmlFor="productImage">Chọn ảnh sản phẩm:</label>
                                <input
                                    type="file"
                                    id="productImage"
                                    name="productImage"
                                    accept="image/*"
                                    onChange={(e) => setProductImage(e.target.files[0])}
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