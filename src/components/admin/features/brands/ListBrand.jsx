import "../../../../styles/index.css"
import { getBrand, getBrandByBrandCode } from "../../../../services/ApiBrand";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoPencil } from "react-icons/go";
import { IoAddOutline } from "react-icons/io5";
import { CgSortAz } from "react-icons/cg";
import { MdFileDownload } from "react-icons/md";
import PageNavigation from "../../common/PageNavigation";
import UpdateBrand from "./UpdateBrand";
function ListBrand() {
    const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    const [brands, setBrands] = useState([]);
    const [filterData, setFilterData] = useState("");
    const [displayData, setDisplayData] = useState([]);
    const [showBoxUpdate, setShowBoxUpdate] = useState(false);
    const [idData, setIdData] = useState(0);
    const fetchBrand = async () => {
        try {
            await getBrand().then((response) => {
                setBrands(response.data)
            })
        } catch (error) {
            console.log("Lỗi gọi lấy toàn bộ danh sách sản phẩm " + error);
        }
    }
    const handleFilterData = (e) => {
        setFilterData(e.target.value);
    }
    const handleSearch = async () => {
        try {
            await getBrandByBrandCode(filterData).then((response) => {
                setBrands([response.data]);
            })
        }
        catch (error) {
            console.log("Lỗi lọc danh mục " + error)
        }
    }
    useEffect(() => {
        fetchBrand()
    }, [])
    const handleUpdate = (id) => {
        setShowBoxUpdate(true)
        setIdData(id)
    }
    return (
        <>
            <div className="container-admin">
                <div className="content-list">
                    <div className="container-content-list">
                        <div>
                            <h2>NHÃN HÀNG</h2>
                            <p>Danh sách cách nhãn hàng trong hệ thống</p>
                        </div>
                        <Link to="/admin/addBrand" className="btn-add-list">
                            <IoAddOutline /> THÊM NHÃN HÀNG
                        </Link>
                    </div>
                    <div className="table-content-list" style={{ height: '430px' }}>
                        <div className="content-top-list">
                            <div className="search-item-list">
                                Tìm kiếm theo mã nhãn hiệu
                                <div className="container-search-item-list">
                                    <input
                                        value={filterData}
                                        onChange={handleFilterData}
                                        placeholder="Nhập mã tìm kiếm ......."
                                    />
                                    <button
                                        onClick={handleSearch}
                                    >Tìm</button>
                                </div>

                            </div>
                            <div className="filter-item-list">
                                <div className="filter-sort">
                                    <CgSortAz />
                                </div>
                                <div className="filter-download">
                                    <MdFileDownload />
                                </div>
                            </div>
                        </div>
                        <table class="table-content-list-all">
                            <thead>
                                <tr>
                                    <th>Mã nhãn hàng</th>
                                    <th>Tên nhãn hàng</th>
                                    <th>Ảnh nhãn hàng</th>
                                    <th className="repair-table">Chỉnh sửa</th>
                                </tr>
                            </thead>

                            <tbody >
                                {displayData.map((brand, index) => (
                                    <tr key={brand.id || index}>
                                        <td>{brand.brandCode}</td>
                                        <td>{brand.brandName}</td>
                                        <td><img style={{ maxHeight: '35px' }} src={`${IMAGE_BASE_URL}${brand.urlImageBrand}`} alt="Ảnh nhãn hiệu" /></td>
                                        <td>

                                            <button className="btn-update"
                                                style={{
                                                    border: "none"
                                                }}
                                                onClick={() => handleUpdate(brand.id)}
                                            >
                                                <GoPencil />
                                            </button>


                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <div className="container-button-change-page"

                        >
                            <PageNavigation
                                resData={brands}
                                onPageChange={(items) => setDisplayData(items)}
                            />

                        </div>
                    </div>

                </div>
                <div className={`container-update-in-list ${showBoxUpdate ? 'active-box-update' : ''}`} >
                    <div className={`container-box-update-content ${showBoxUpdate ? 'active-box-update-down' : ''}`}>
                        <UpdateBrand
                            id={idData}
                            onSuccess={() => setShowBoxUpdate(false)}
                        />
                    </div>

                </div>
            </div >
        </>
    )
}
export default ListBrand;