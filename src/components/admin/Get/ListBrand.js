import "../indexAdmin.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { GoPencil } from "react-icons/go";
function ListBrand() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [brands, setBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    // const [idBrandFilter, setIdBrandFilter] = useState("");
    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/brand/search/all`);
                setBrands(response.data.data);
                // setFilteredBrands(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchBrand();
    }, []);
    // const handleFilter = async () => {
    //     if (idBrandFilter.trim() === "") {
    //         setFilteredBrands(brands);
    //         return;
    //     }

    //     try {

    //         const response = await axios.get(`http://localhost:8080/product/${idBrandFilter}`);
    //         if (response.data) {
    //             setFilteredBrands([response.data]);
    //         }
    //         else {
    //             setFilteredBrands([]);
    //         }

    //     } catch (error) {
    //         console.error("Error filtering:", error);
    //         setFilteredBrands([]);
    //         alert("Không tìm thấy sản phẩm với mã này.");
    //     }
    // };

    return (
        <>
            <div className="container-admin">
                <div className="content">
                    <h2>Nhãn hiệu</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập mã sản phẩm..."
                        // value={idBrandFilter}
                        // onChange={(e) => setIdBrandFilter(e.target.value)}
                        />
                        {/* <button className="btn btn-success" onClick={handleFilter}>Lọc</button> */}
                    </div>
                    <div className="box-containt-table list-brand">
                        <table class="table table-light table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên nhãn hàng</th>
                                    <th>Ảnh nhãn hàng</th>
                                    <th className="repair-table">Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody className="tb-list-brand">
                                {brands.map((brand, index) => (
                                    <tr key={brand.id || index}>
                                        <td>{brand.id}</td>
                                        <td>{brand.brandName}</td>
                                        <td><img src={brand.urlImageBrand} alt="Ảnh nhãn hiệu" /></td>
                                        <td>
                                            <Link to={`/admin/updateBrand/${brand.id}`}>
                                                <button className="btn btn-warning">
                                                    <GoPencil />
                                                </button>
                                            </Link>

                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>


        </>
    )
}
export default ListBrand;