import "../../../../styles/index.css"
import { useEffect, useState } from 'react';
import { getBrand } from "../../../../services/ApiBrand";
import { postProduct } from "../../../../services/ApiProduct";
import { getCategory } from "../../../../services/ApiCategory";
import { FaCamera } from "react-icons/fa";
import { GrDocument, GrScheduleNew } from "react-icons/gr";
import { HiOutlineSpeakerphone } from "react-icons/hi";
function AddProduct() {
    const [productCode, setProductCode] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [featured, setFeatured] = useState("");
    const [promotional, setPromotional] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [brandId, setBrandId] = useState("");
    const [urlPhoto, setUrlPhoto] = useState("");

    const [previewUrl, setPreviewUrl] = useState(null);

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    // const [errorMessage, setErrorMessage] = useState("");
    // const [message, setMessage] = useState(false);

    const fetchBrand = async () => {
        try {
            await getBrand().then((response) => {
                setBrands(response.data)
            })
        } catch (error) {
            console.log("Lỗi gọi dữ liệu lấy toàn bộ nhãn hiệu " + error);
        }
    }

    const fetchCategory = async () => {
        try {
            await getCategory().then((response) => {
                setCategories(response.data);
            })
        } catch (error) {
            console.log("Lỗi lấy toàn bộ danh mục " + error);
        }
    }
    useEffect(() => {
        fetchBrand();
        fetchCategory();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("productCode", productCode);
        form.append("productName", productName);
        form.append("description", description);
        form.append("featured", featured);
        form.append("promotional", promotional);
        form.append("categoryId", categoryId);
        form.append("brandId", brandId);
        form.append("urlPhoto", urlPhoto);
        try {
            postProduct(form);
            alert("Thêm sản phẩm thành công");

            setProductName("");
            setProductCode("");
            setFeatured("");
            setPromotional("");
            setDescription("");
            setUrlPhoto("");
        } catch (error) {
            alert("Thêm sản phẩm không thành công");
            console.log("Lỗi thêm sản phẩm " + error);
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Tạo một đường dẫn tạm thời cho file vừa chọn
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };
    return (
        <>
            <div className='container-admin'>
                <div className="content-admin-add">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                {errorMessage && <p className="notification-error">Thêm không thành công</p>} */}
                    <h1 style={{ lineHeight: '10px' }}>Thêm sản phẩm</h1>
                    <p>Quản lý kho hàng và thông tin sản phẩm mới</p>
                    <div className="form-container-add"
                    >
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
                        </div>
                        <div className="content-form-add-right">
                            <div className="content-form-add-right-b1">
                                <div className="title-form-b">
                                    <i><GrDocument /></i>  <h3>Thông tin chung</h3>
                                </div>
                                <div>
                                    <div className="c-form-b">
                                        <div className="c-i-form-b">
                                            <label htmlFor="productCode"
                                                style={{
                                                    display: 'block',
                                                    marginBottom: '5px',

                                                }}
                                            >Mã sản phẩm</label>
                                            <input

                                                type="text"
                                                id="productCode"
                                                name="productCode"
                                                value={productCode}
                                                onChange={(e) => setProductCode(e.target.value)}
                                                placeholder="VD: IP17-PRO-MAX"
                                                required
                                            />
                                        </div>
                                        <div className="c-i-form-b">
                                            <label htmlFor="productName"
                                                style={{
                                                    display: 'block',
                                                    marginBottom: '5px',

                                                }}
                                            >Tên sản phẩm</label>
                                            <input

                                                type="text"
                                                id="productName"
                                                name="productName"
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                                placeholder="VD: Iphone 17 Pro Max"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="content-form-add-right-b1">
                                <div className="title-form-b">
                                    <i><GrScheduleNew /></i>  <h3>Phân loại & thương hiệu</h3>
                                </div>
                                <div className="c-form-b">
                                    <div className="c-i-form-b">
                                        <label htmlFor="categoryId"
                                            style={{
                                                display: 'block',
                                                marginBottom: '5px',

                                            }}
                                        >Danh mục sản phẩm</label>
                                        <select
                                            style={{
                                                display: 'block',
                                                marginTop: '7px',
                                                width: '350px',
                                                marginRight: '50px',
                                                border: '1px solid rgb(205, 25, 24)',
                                                height: '25px',
                                                borderRadius: '5px'
                                            }}
                                            id="categoryId"
                                            name="categoryId"
                                            value={categoryId}
                                            onChange={(e) => setCategoryId(Number(e.target.value))}
                                        >
                                            <option value="">Lựa chọn</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.categoryName}</option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className="c-i-form-b">
                                        <label htmlFor="brandId"
                                            style={{
                                                display: 'block',
                                                marginBottom: '5px',

                                            }}
                                        >Nhãn hiệu sản phẩm</label>
                                        <select
                                            style={{
                                                display: 'block',
                                                marginTop: '7px',
                                                width: '330px',
                                                marginRight: '50px',
                                                border: '1px solid rgb(205, 25, 24)',
                                                height: '25px',
                                                borderRadius: '5px'
                                            }}
                                            id="brandId"
                                            name="brandId"
                                            value={brandId}
                                            onChange={(e) => setBrandId(Number(e.target.value))}
                                        >
                                            <option value="">Lựa chọn</option>
                                            {brands.map((brand) => (
                                                <option key={brand.id} value={brand.id}>{brand.brandName}</option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="content-form-add-right-b1">
                                <div className="title-form-b">
                                    <i><HiOutlineSpeakerphone /></i>  <h3>Tiếp thị & Khuyến mãi</h3>
                                </div>
                                <div>
                                    <div className="c-form-b">
                                        <div className="c-i-form-b">
                                            <label htmlFor="featured"
                                                style={{
                                                    display: 'block',
                                                    marginBottom: '5px',

                                                }}
                                            >Sản phẩm nổi bật
                                            </label>
                                            <select
                                                style={{
                                                    display: 'block',
                                                    marginTop: '7px',
                                                    width: '330px',
                                                    marginRight: '50px',
                                                    border: '1px solid rgb(205, 25, 24)',
                                                    height: '25px',
                                                    borderRadius: '5px'
                                                }}
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
                                        <div className="c-i-form-b">
                                            <label htmlFor="promotional"
                                                style={{
                                                    display: 'block',
                                                    marginBottom: '5px',

                                                }}
                                            >Sản phẩm khuyến mãi</label>
                                            <select
                                                style={{
                                                    display: 'block',
                                                    marginTop: '7px',
                                                    width: '330px',
                                                    marginRight: '50px',
                                                    border: '1px solid rgb(205, 25, 24)',
                                                    height: '25px',
                                                    borderRadius: '5px'
                                                }}
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
                                    </div>
                                    <div>
                                        <div className="c-i-form-b">
                                            <label htmlFor="description"
                                                style={{
                                                    display: 'block',
                                                    marginBottom: '5px',
                                                    marginLeft: '20px'

                                                }}
                                            >Thông tin khuyễn mãi</label>
                                            <input
                                                style={{
                                                    height: '60px', width: '94%',
                                                    margin: '0 20px'
                                                }}
                                                type="text"
                                                id="description"
                                                name="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="VD: Nhập chi tiết quà tặng, giảm giá..."
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <button className='button-add' style={{ width: '40%', marginLeft: '30%' }} onClick={handleSubmit}>Thêm sản phẩm</button>
                    <p style={{ width: '40%', marginLeft: '35%' }}><b>Vui lòng kiểm tra chính xác thông tin trước khi gửi dữ liệu</b></p>
                </div>
            </div>
        </>
    )
}
export default AddProduct;