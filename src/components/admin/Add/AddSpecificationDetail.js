import "../indexAdmin.css";
import axios from 'axios';
import { useEffect, useState } from 'react';

function AddSpecificationDetail() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState(false);

    const [labelSpecification, setLabelSpecification] = useState("");
    const [valueSpecification, setValueSpecification] = useState("");
    const [productId, setProductId] = useState("");
    const [productSpecifications, setProductSpecifications] = useState([]);
    const [selectedSpecificationId, setSelectedSpecificationId] = useState("");
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`${API_BASE_URL}/product/search/all`);
            setProducts(response.data.data.content);
        }
        fetchProduct();
    }, [])

    useEffect(() => {
        if (!productId) {
            setProductSpecifications([]);
            return;
        }

        const fetchProductSpecifications = async () => {
            const response = await axios.get(
                `${API_BASE_URL}/productSpecification/search?productId=${productId}`
            );
            setProductSpecifications(response.data.data);
        };

        fetchProductSpecifications();
    }, [productId]);

    console.log(productId)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset thông báo trước đó
        setMessage("");
        setErrorMessage("");

        // Kiểm tra các trường bắt buộc
        if (!labelSpecification && !valueSpecification) {
            setErrorMessage("Vui lòng điền đầy đủ các thông tin.");
            return;
        }

        const formData = new FormData();
        formData.append("labelSpecification", labelSpecification);
        formData.append("valueSpecification", valueSpecification);
        formData.append("productSpecificationId", selectedSpecificationId);
        formData.append("productId", productId);


        try {
            const response = await axios.post(`${API_BASE_URL}/specificationDetail/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200 || response.status === 201) {
                setMessage(true)
                setTimeout(() => { setMessage(false) }, 5000)
                // Reset form
                setProductId("");
                setLabelSpecification("");
                setValueSpecification("");
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
                        <h2>Thêm chi tiết thông số sản phẩm</h2>
                    </div>
                    <div className="form-container">

                        <form onSubmit={handleSubmit}>
                            <div className="">
                                <label htmlFor="productId">Chọn sản phẩm: </label>
                                <select
                                    id="productId"
                                    name="productId"
                                    value={productId}
                                    onChange={(e) => {
                                        setProductId(e.target.value);
                                        // setSelectedSpecificationId("");
                                    }}
                                >
                                    <option value="">Chọn</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>{product.productName}</option>
                                    ))}

                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="productSpecification">Loại thông số: </label>
                                <select
                                    id="productSpecification"
                                    name="nameSpecification"
                                    value={selectedSpecificationId}
                                    onChange={(e) => setSelectedSpecificationId(e.target.value)}

                                >
                                    <option value="">Chọn</option>
                                    {productSpecifications.map((spec) => (
                                        <option key={spec.id} value={spec.id}>
                                            {spec.nameSpecification}
                                        </option>
                                    ))}

                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="labelSpecification">Tên thông số:</label>
                                <input
                                    type="text"
                                    id="labelSpecification"
                                    name="labelSpecification"
                                    value={labelSpecification}
                                    onChange={(e) => setLabelSpecification(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="">
                                <label htmlFor="valueSpecification">Chi tiết thông số:</label>
                                <input
                                    type="text"
                                    id="valueSpecification"
                                    name="valueSpecification"
                                    value={valueSpecification}
                                    onChange={(e) => setValueSpecification(e.target.value)}
                                    required
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
export default AddSpecificationDetail;
