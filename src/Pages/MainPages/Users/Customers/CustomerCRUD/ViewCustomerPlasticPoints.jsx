import { useState, useEffect } from "react"

import Table from "../../../../../Components/table/Table"
import TableHeadingRow from "../../../../../Components/table/TableHeadingRow"
import TableHeading from "../../../../../Components/table/TableHeading"
import TextCell from "../../../../../Components/table/TextCell"
import TableRow from "../../../../../Components/table/TableRow"
import TableBody from "../../../../../Components/table/TableBody"
import { useNavigate, useParams } from "react-router-dom";
import CustomerPlasticPointsPageLayout from "../../../../../Components/common/CustomerPlasticPointsPageLayout"

import { getPlasticPoints } from "../customerService"
import { editReceivePlastic } from "../customerService"

function ViewCustomerPlasticPoints(data, onSuccess) {
    const { id } = useParams();
    const [customerPlasticPoints, setCustomerPlasticPoints] = useState([])
    const [returnPlastic, setReturnPlastic] = useState("")
    const [toggleState, setToggleState] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e) => {
        setReturnPlastic(e.target.value);
    };

    useEffect(() => {

        async function fetchData() {

            try {

                const response = await getPlasticPoints(id)
                setCustomerPlasticPoints(response)

            } catch (error) {

                setErrorMessage("Error Customer Plastic Points. Please try again.")

            }

        }

        fetchData()

    }, [toggleState, id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                returnPlastic,
            };

            await editReceivePlastic(id, formData);
            onSuccess();
        } catch (error) {
            setErrorMessage("Failed edit");
        }
    };

    return (

        <CustomerPlasticPointsPageLayout
            title="Customer Plastic Points History"
            itemCount={customerPlasticPoints.length}
            onChange={(value) => setReturnPlastic(value)}
            onSubmit={handleSubmit}
        >
            <Table>

                <TableHeadingRow>
                    <TableHeading text="Order ID" />
                    <TableHeading text="Total Plastic Point" />
                    <TableHeading text="Total Consumed Plastic" />
                    <TableHeading text="Return Plastic" />
                    <TableHeading text="Remaining Plastic" />
                    <TableHeading text="Received By" />
                </TableHeadingRow>

                <TableBody>
                    {customerPlasticPoints.map(customerPlasticPoints => (
                        <TableRow key={customerPlasticPoints._id} item={customerPlasticPoints}>
                            <TextCell text={customerPlasticPoints.orderID} />
                            <TextCell text={customerPlasticPoints.orderTotalPlasticPoint} />
                            <TextCell text={customerPlasticPoints.totalConsumedPlastic} />
                            <TextCell text={customerPlasticPoints.returnPlastic} />
                            <TextCell text={customerPlasticPoints.remainingPlastic} />
                            <TextCell text={customerPlasticPoints.employee?.name} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CustomerPlasticPointsPageLayout>
    )
}

export default ViewCustomerPlasticPoints
