import "../indexAdmin.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function ListBrand() {
    const [brands, setBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [idBrandFilter, setIdBrandFilter] = useState("");
    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const response = await axios.get('http://localhost:8080/brand/getAll');
                setBrands(response.data);
                setFilteredBrands(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchBrand();
    }, []);
    const handleFilter = async () => {
        if (idBrandFilter.trim() === "") {
            setFilteredBrands(brands);
            return;
        }

        try {

            const response = await axios.get(`http://localhost:8080/product/${idBrandFilter}`);
            if (response.data) {
                setFilteredBrands([response.data]);
            }
            else {
                setFilteredBrands([]);
            }

        } catch (error) {
            console.error("Error filtering:", error);
            setFilteredBrands([]);
            alert("Không tìm thấy sản phẩm với mã này.");
        }
    };

    return (
        <>
            <div className="container-admin">
                <div className="content">
                    <h1>Danh sách các nhãn hàng</h1>
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập mã sản phẩm..."
                            value={idBrandFilter}
                            onChange={(e) => setIdBrandFilter(e.target.value)}
                        />
                        <button className="btn btn-success" onClick={handleFilter}>Lọc</button>
                    </div>
                    <div className="limited">
                        <table class="table table-light table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên nhãn hàng</th>
                                    <th>Ảnh nhãn hàng</th>
                                    <th className="repair-table">Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBrands.map((brand, index) => (
                                    <tr key={brand.id || index}>
                                        <td>{brand.id}</td>
                                        <td>{brand.brandName}</td>
                                        <td><img src={`data:image/webp;base64,${brand.imageBrand}`} alt="Ảnh nhãn hiệu" /></td>
                                        <td>
                                            <Link to={`/admin/updateBrand/${brand.id}`}>
                                                <button className="btn btn-warning">Cập nhập</button>
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