import "../indexAdmin.css"
import axios from "axios";
import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";


const COLORS = {
    PENDING: "#facc15",
    CONFIRMED: "#733bf6ff",
    SHIPPING: "#0ea5e9",
    DELIVERED: "#22c55e",
    CANCELLED: "#ef4444",
};
function PieChar() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/order/search/countOrder`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.error("Lỗi lấy dữ liệu chart", err);
            });
    }, [API_BASE_URL]);

    return (
        <div className="chart" style={{ width: "100%", height: 320 }}>
            <h3 className="" style={{ textAlign: "center", fontSize: "25px" }}>
                Trạng thái đơn hàng
            </h3>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={0}
                    >
                        {data.map((entry) => (
                            <Cell
                                key={entry.status}
                                fill={COLORS[entry.status] || "#8884d8"}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
export default PieChar;