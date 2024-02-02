import { useState, useEffect } from "react"

import Table from "../../../../../Components/table/Table"
import TableHeadingRow from "../../../../../Components/table/TableHeadingRow"
import TableHeading from "../../../../../Components/table/TableHeading"
import TextCell from "../../../../../Components/table/TextCell"
import TableButtonCell from "../../../../../Components/table/TableButtonCell";
import TableRow from "../../../../../Components/table/TableRow"
import TableBody from "../../../../../Components/table/TableBody"
import { useNavigate, useParams } from "react-router-dom";
import TextEditorPageLayout from "../../../../../Components/common/TextEditorPageLayout"
import ViewDetailsButton from "../../../../../Components/common/ViewDetailsButton"

import { getRewardInfos } from "../customerService"

function ViewCustomerRewardHistory() {
    const { id } = useParams();
    const [customerReward, setCustomerReward] = useState([])
    const [consumedReward, setConsumedReward] = useState([])
    const [toggleState, setToggleState] = useState(false)

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("")

    const formatDate = (date) => {
        return date ? new Date(date).toISOString().split('T')[0] : '';
    };

    useEffect(() => {

        async function fetchData() {

            try {

                const response = await getRewardInfos(id)
                setCustomerReward(response.customerRewardHistory)
                setConsumedReward(response.consumedReward)

            } catch (error) {

                setErrorMessage("Error Customer Reward History. Please try again.")

            }

        }

        fetchData()

    }, [toggleState])
// console.log(customerReward[0])
    return (
        <TextEditorPageLayout
            title="Customer Reward History"
            itemCount={customerReward.length}
            onAddClick={() => setIsAddModalOpen(true)}
        >
            <div className="pt-3 pr-10 w-full mb-6">
                <div className="grid grid-cols-2 ">
                    <div className="ml-10">
                        <h2 className="text-xl mb-1.5">Total Remain Reward: {consumedReward?.totalRemainReward}</h2>
                        {/* <h2 className="text-xl mb-1.5">Consumed Reward: {consumedReward?.consumedReward}</h2> */}
                        <h2 className="text-xl mb-1.5">Total Redeem Reward: {consumedReward?.redeemReward}</h2>
                    </div>
                    <div className="">
                        <div className="float-right text-right mr-[50px]">
                            <h2 className="text-xl mb-1.5">Total Earned Reward: {consumedReward?.totalEarnedReward}</h2>
                            
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-full">
                <div className="overflow-x-scroll">
                    <Table>

                        <TableHeadingRow>

                            <TableHeading text="Order ID" />
                            <TableHeading text="Customer Name" />
                            <TableHeading text="Email" />
                            <TableHeading text="Mobile" />
                            {/* <TableHeading text="Group" />
                            <TableHeading text="Total Plastic Point" />
                            <TableHeading text="Order Sub Total" />
                            <TableHeading text="Order Total" />
                            <TableHeading text="Order Grand Total" />
                            <TableHeading text="Is Promo Code" /> */}
                            {/* <TableHeading text="Is Reward" /> */}
                            <TableHeading text="Reward Point" />
                        </TableHeadingRow>

                        <TableBody>
                            {customerReward.map(customerReward => (
                                <TableRow key={customerReward?._id} item={customerReward}>
                                    <TextCell text={customerReward?.orderID} />
                                    <TextCell text={customerReward?.customer?.firstName + ' ' + customerReward?.customer?.lastName} />
                                    <TextCell text={customerReward?.customer?.email} />
                                    <TextCell text={customerReward?.customer?.mobile} />
                                    {/* <TextCell text={customerReward?.customer?.group} />
                                    <TextCell text={customerReward?.orderTotalPlasticPoint} />
                                    <TextCell text={customerReward?.subtotal} />
                                    <TextCell text={customerReward?.total} />
                                    <TextCell text={customerReward?.grandTotal} />
                                    <TextCell text={customerReward?.isPromoCode} /> */}
                                    {/* <TextCell text={`${customerReward?.isReward}`} /> */}
                                    <TextCell text={customerReward?.rewardPoint} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </TextEditorPageLayout>
    )
}

export default ViewCustomerRewardHistory