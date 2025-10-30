
import "../indexAdmin.css"

import { useEffect, useState } from "react";
import axios from 'axios';

function ListUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:8080/user/getAll', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <div className="container-admin">
                <div className="content">
                    <h1>Danh sách các khách hàng</h1>
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập mã khác hàng..."

                        />
                        <button >Lọc</button>
                    </div>
                    <div className="limited">
                        <table class="table table-light table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Họ đệm</th>
                                    <th>Tên</th>
                                    <th>email</th>

                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id || index}>
                                        <td>{user.id}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.email}</td>

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
export default ListUser;