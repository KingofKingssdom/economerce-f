import "../../../../styles/index.css"
import { useState } from "react";
import { putCategory } from "../../../../services/ApiCategory";
import { useParams } from "react-router-dom";
function UpdateCateogry(props) {
    const categoryId = props.id
    const close = props.onSuccess;
    const [categoryCode, setCategoryCode] = useState("");
    const [categoryName, setCategoryName] = useState("");

    const handleCategoryCode = (e) => {
        setCategoryCode(e.target.value)
    }
    const handleCategoryName = (e) => {
        setCategoryName(e.target.value)
    }
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("categoryCode", categoryCode);
        formData.append("categoryName", categoryName);
        try {
            const response = await putCategory(categoryId, formData);
            alert("Cập nhập dữ liệu thành công")
            close();
            setCategoryName("");
            setCategoryCode("");
            window.location.reload();

        }
        catch (error) {
            alert("Thêm dữ liệu danh mục không thành công")
            console.error(" Lỗi thêm dữ liệu danh mục " + error);

        }
    };
    return (
        <>
            <div className=''>

                <div className="content-cateogry" style={{ margin: '50px auto', width: '95%', borderRadius: '10px', backgroundColor: '#FFF8F7' }}>
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                {errorMessage && <p className="notification-error">{errorMessage}</p>} */}
                    <div>
                        <div className="header-add">
                            <h1>Cập nhập Danh mục</h1>
                            <p>Quản lý các nhóm danh mục trong hệ thống cửa hàng của bạn</p>
                        </div>
                        <div className="container-form-add">
                            <div className="form-container">
                                <div className="form-content">
                                    <div className="item-form-content">
                                        <label htmlFor="categoryCode" className="lable-form">MÃ DANH MỤC</label>
                                        <input
                                            className="input-form"
                                            type="text"
                                            id="categoryCode"
                                            name="categoryCode"
                                            value={categoryCode}
                                            onChange={handleCategoryCode}
                                            placeholder="VD: DT"
                                            required

                                        />
                                    </div>
                                    <div className="item-form-content">
                                        <label htmlFor="categoryName" className="lable-form">TÊN DANH MỤC</label>
                                        <input
                                            className="input-form"
                                            type="text"
                                            id="categoryName"
                                            name="categoryName"
                                            placeholder="VD: Điện thoại"
                                            value={categoryName}
                                            onChange={handleCategoryName}
                                            required
                                        />
                                    </div>

                                </div>
                                <button className='button-add' onClick={handleSubmit}>Cập nhập danh mục</button>
                                <p><b>Vui lòng kiểm tra chính xác thông tin trước khi gửi dữ liệu</b></p>

                            </div>
                        </div>
                    </div>



                </div>

            </div>
        </>
    )
}
export default UpdateCateogry;