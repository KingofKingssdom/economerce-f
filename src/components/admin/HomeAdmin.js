
import ListOrder from "./Get/ListOrder";
import Summary from "./Summary";
import SummaryAnalytic from "./SummaryAnalytic";
import "./indexAdmin.css"
function HomeAdmin() {
    return (
        <>
            <div className="container-home-admin">
                <Summary />
                <SummaryAnalytic />
                <div className="container-table-order">
                    <ListOrder />
                </div>
            </div>

        </>
    )
}
export default HomeAdmin;