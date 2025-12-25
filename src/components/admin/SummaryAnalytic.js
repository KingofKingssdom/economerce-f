import "./indexAdmin.css"
import Chart from "./Chart/Chart";
function SummaryAnalytic() {
    return (
        <>
            <div className="container-summary-analytic">
                <div className="content-summary-analytic-left">
                    <Chart />
                </div>
                <div className="content-summary-analytic-right">
                    Biểu đồ tròn
                </div>
            </div>
        </>
    )
}

export default SummaryAnalytic;