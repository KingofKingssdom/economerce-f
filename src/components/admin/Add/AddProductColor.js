import "../indexAdmin.css";
import axios from 'axios';
import { useEffect, useState } from 'react';

function AddProductColor() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState(false);

    const [titleVariant, setTitleVariant] = useState("");
    const [productId, setProductId] = useState("");
    const [urlPhoto, setUrlPhoto] = useState("");

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`${API_BASE_URL}/product/search/all`);
            setProducts(response.data.data.content);
        }
        fetchProduct();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset thông báo trước đó
        setMessage("");
        setErrorMessage("");

        // Kiểm tra các trường bắt buộc
        if (!titleVariant) {
            setErrorMessage("Vui lòng điền đầy đủ các thông tin.");
            return;
        }

        const formData = new FormData();
        formData.append("titleVariant", titleVariant);
        formData.append("productId", productId);
        formData.append("urlPhoto", urlPhoto);

        try {
            const response = await axios.post(`${API_BASE_URL}/productColor/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200 || response.status === 201) {
                setMessage(true)
                setTimeout(() => { setMessage(false) }, 5000)
                // Reset form
                setProductId("");
                setTitleVariant("");
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
        <>
            <div className='container-admin'>
                <div className="content">
                    {message && <p className="notification-success">Thêm thành công</p>}
                    {errorMessage && <p className="notification-error">Thêm không thành công</p>}
                    <div className="header-add">
                        <h2>Thêm màu sắc sản phẩm</h2>
                    </div>
                    <div className="form-container">

                        <form onSubmit={handleSubmit}>
                            <div className="">
                                <label htmlFor="productCode">Tên màu sắc sản phẩm:</label>
                                <input
                                    type="text"
                                    id="titleVariant"
                                    name="titleVariant"
                                    value={titleVariant}
                                    onChange={(e) => setTitleVariant(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="">
                                <label htmlFor="productId">Chọn sản phẩm: </label>
                                <select
                                    id="productId"
                                    name="productId"
                                    value={productId}
                                    onChange={(e) => setProductId(Number(e.target.value))}
                                >
                                    <option value="">Chọn</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>{product.productName}</option>
                                    ))}

                                </select>
                            </div>
                            <div>
                                <label htmlFor="urlPhoto">Chọn ảnh màu sắc sản phẩm:</label>
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
        </>
    );

}
export default AddProductColor;
