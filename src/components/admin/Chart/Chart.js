import "../indexAdmin.css"
import axios from "axios";
import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
function Chart() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [dataOrderStatus, setDataOrderStatus] = useState([]);
    const [chartData, setChartData] = useState([]);


    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/order/search/orderStatus?orderStatus=DELIVERED`)
            .then((response) => {
                const orders = response.data.data;
                setDataOrderStatus(orders);
                // xử lý dữ liệu thành dạng biểu đồ
                const processed = processOrdersToChart(orders);
                setChartData(processed);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
            });
    }, []);

    // Hàm xử lý dữ liệu để đếm đơn theo tháng
    const processOrdersToChart = (orders) => {
        const months = Array.from({ length: 12 }, (_, i) => ({
            name: `Tháng ${i + 1}`,
            total: 0,
        }));

        orders.forEach((order) => {
            if (order.dayCreate) {
                const date = new Date(order.dayCreate);
                const month = date.getMonth(); // 0 - 11
                months[month].total += 1;
            }
        });

        return months;
    };

    return (
        <div className="chart" style={{ width: "100%", height: 400 }}>
            <h3 className="">
                Biểu đồ số đơn hàng hoàn thành trong năm
            </h3>

            <ResponsiveContainer>
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#4F46E5"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;