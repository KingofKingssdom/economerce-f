import "../../../../styles/index.css"
import { useState } from "react";
import { postCategory } from "../../../../services/ApiCategory";
function AddCateogry() {
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
        formData.append("categoryCode", categoryCode)
        formData.append("categoryName", categoryName)
        try {
            const response = await postCategory(formData);
            alert("Thêm dữ liệu thành công")
            setCategoryName("");
            setCategoryCode("");

        }
        catch (error) {
            alert("Thêm dữ liệu danh mục không thành công")
            console.error(" Lỗi thêm dữ liệu danh mục " + error);

        }
    };
    return (
        <>
            <div className='container-admin'>

                <div className="content-cateogry">
                    {/* {message && <p className="notification-success">Thêm thành công</p>}
                {errorMessage && <p className="notification-error">{errorMessage}</p>} */}
                    <div className="header-add">
                        <h1>Thêm Danh mục</h1>
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
                            <button className='button-add' onClick={handleSubmit}>Thêm Danh mục</button>
                            <p><b>Vui lòng kiểm tra chính xác thông tin trước khi gửi dữ liệu</b></p>

                        </div>
                    </div>

                </div>

            </div>
            {/* </div > */}
        </>
    )
}
export default AddCateogry;