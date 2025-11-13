import Chart from "./Chart/Chart";
import ListOrder from "./Get/ListOrder";
import "./indexAdmin.css"
function HomeAdmin() {
    return (
        <>
            <div className="container-home-admin">
                <div className="container-line-chart">
                    <Chart />
                </div>
                <div className="container-table-order">
                    <ListOrder />
                </div>
            </div>

        </>
    )
}
export default HomeAdmin;