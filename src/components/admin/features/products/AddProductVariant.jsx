import "../../../../styles/index.css"
import { useState, useEffect } from "react";
import { getProductAll } from "../../../../services/ApiProduct";
import { postProductVariant } from "../../../../services/ApiProduct";
import { FaCamera } from "react-icons/fa";
import { GrDocument, GrScheduleNew } from "react-icons/gr";
import { useParams } from "react-router-dom";
function AddProductVariant() {
    // const [errorMessage, setErrorMessage] = useState("");
    // const [message, setMessage] = useState(false);
    const { productId } = useParams();
    const [storage, setStorage] = useState("");
    const [colorName, setColorName] = useState("");
    const [priceOrigin, setPriceOrigin] = useState(0);
    const [priceCurrent, setPriceCurrent] = useState(0);
    // const [productId, setProductId] = useState("");
    const [stock, setStock] = useState(0);
    const [products, setProducts] = useState([]);
    const [urlPhoto, setUrlPhoto] = useState("");

    const [previewUrl, setPreviewUrl] = useState(null);
    // const fethProductAll = async () => {
    //     try {
    //         await getProductAll().then((response) => {
    //             setProducts(response.data)
    //         })
    //     } catch (error) {
    //         console.log("Lỗi lấy toàn bộ sản phẩm " + error)
    //     }
    // }
    // useEffect(() => {
    //     fethProductAll();
    // }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("storage", storage);
        form.append("originPrice", priceOrigin);
        form.append("currentPrice", priceCurrent);
        form.append("urlProductColor", urlPhoto);
        form.append("colorName", colorName);
        form.append("stock", stock)
        form.append("productId", productId)
        try {
            postProductVariant(form);
            alert("Thêm phiên bản sản phẩm thành công ");
            setStorage("");
            setStock(0);
            setColorName("");
            setUrlPhoto("");
            setPriceOrigin("");
            setPriceCurrent("");
        } catch (error) {
            alert("Thêm phiên bản sản phẩm thất bại ");
            console.log("Lỗi thêm phiên bản sản phẩm " + error);
        }
    }
    return (
        <>
            <div className='container-admin'>
                <div className="content-admin-add">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                    {errorMessage && <p className="notification-error">Thêm không thành công</p>} */}

                    <h1>Thêm phiên bản sản phẩm</h1>
                    <p>Quản lý thông tin các phiên bản sản phẩm</p>
                    <div className="form-container-add">
                        <div className="content-form-add-left">
                            <h2 style={{ textAlign: 'center' }}>Tải ảnh sản phẩm lên</h2>
                            <div className="item-form-common">
                                <label htmlFor="urlPhoto"
                                    style={{
                                        border: '1px dashed red',
                                        borderRadius: '5px',
                                        margin: '0 23px',
                                        width: '250px',
                                        height: '200px',
                                        backgroundColor: 'rgb(255,233,230)',

                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        overflow: 'hidden',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: 'rgb(40,28,38)'
                                    }}
                                >
                                    {
                                        previewUrl ? (
                                            <img src={previewUrl} alt="Preview" className="preview-img" />
                                        ) : (
                                            <div>
                                                <FaCamera />
                                                <h3>Chọn ảnh sản phẩm</h3>
                                                <p>PNG, JPG tối đa 5MB</p>
                                            </div>
                                        )
                                    }

                                </label>
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="urlPhoto"
                                    name="urlPhoto"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setUrlPhoto(file);
                                            setPreviewUrl(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <div className="c-i-form-b">
                                    <label htmlFor="colorName"
                                        style={{
                                            display: 'block',
                                            marginBottom: '5px',
                                            marginLeft: '20px'
                                        }}
                                    >Tên màu sắc phiên bản</label>
                                    <input
                                        style={{
                                            width: '250px',
                                            margin: '0 20px'
                                        }}
                                        type="text"
                                        id="colorName"
                                        name="colorName"
                                        value={colorName}
                                        onChange={(e) => setColorName(e.target.value)}
                                        placeholder="VD: Titan trắng"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="content-form-add-right">
                            <div className="content-form-add-right-b1">
                                <div className="title-form-b">
                                    <i><GrDocument /></i>  <h3>Thông tin chung</h3>
                                </div>
                                <div>
                                    <div className="c-form-b">
                                        <div className="c-i-form-b">
                                            <label htmlFor="storage"
                                                style={{
                                                    display: 'block',
                                                    marginBottom: '5px',

                                                }}
                                            >Dung lượng lưu trữ</label>
                                            <input

                                                type="text"
                                                id="storage"
                                                name="storage"
                                                value={storage}
                                                onChange={(e) => setStorage(e.target.value)}
                                                placeholder="VD: 256GB"
                                                required
                                            />
                                        </div>
                                        <div className="c-i-form-b">
                                            <label htmlFor="stock"
                                                style={{
                                                    display: 'block',
                                                    marginBottom: '5px',

                                                }}
                                            >Số lượng nhập hàng</label>
                                            <input

                                                type="number"
                                                id="stock"
                                                name="stock"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                                placeholder="VD: Iphone 17 Pro Max"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="content-form-add-right-b1">
                                <div className="title-form-b">
                                    <i><GrScheduleNew /></i>  <h3>Giá sản phẩm</h3>
                                </div>
                                <div>
                                    <div className="c-form-b">
                                        <div className="c-i-form-b">
                                            <label htmlFor="originPrice"
                                                style={{
                                                    display: 'block',
                                                    marginBottom: '5px',

                                                }}
                                            >Giá nhập kho</label>
                                            <input

                                                type="number"
                                                id="originPrice"
                                                name="originPrice"
                                                value={priceOrigin}
                                                onChange={(e) => setPriceOrigin(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="c-i-form-b">
                                            <label htmlFor="productName"
                                                style={{
                                                    display: 'block',
                                                    marginBottom: '5px',

                                                }}
                                            >Giá niêm yết</label>
                                            <input

                                                type="number"
                                                id="priceCurrent"
                                                name="priceCurrent"
                                                value={priceCurrent}
                                                onChange={(e) => setPriceCurrent(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <button className='button-add' style={{ width: '40%', marginLeft: '30%' }} onClick={handleSubmit}>Thêm phiên bản</button>
                            <p style={{ width: '55%', marginLeft: '25%' }}><b>Vui lòng kiểm tra chính xác thông tin trước khi gửi dữ liệu</b></p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default AddProductVariant;