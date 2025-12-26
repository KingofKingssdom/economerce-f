import "./indexAdmin.css"
import Chart from "./Chart/Chart";
import PieChar from "./Chart/PieChar";
function SummaryAnalytic() {
    return (
        <>
            <div className="container-summary-analytic">
                <div className="content-summary-analytic-left">
                    <Chart />
                </div>
                <div className="content-summary-analytic-right">
                    <PieChar />
                </div>
            </div>
        </>
    )
}

export default SummaryAnalytic;