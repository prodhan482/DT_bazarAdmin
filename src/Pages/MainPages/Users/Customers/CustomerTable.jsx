import Table from "../../../../Components/table/Table";
import TableHeadingRow from "../../../../Components/table/TableHeadingRow";
import TableHeading from "../../../../Components/table/TableHeading";
import TextCell from "../../../../Components/table/TextCell";
import TableButtonCell from "../../../../Components/table/TableButtonCell";
import ViewTableButton from "../../../../Components/table/ViewTableButton";
import TableBody from "../../../../Components/table/TableBody";
import TableRow from "../../../../Components/table/TableRow";
import ViewDetailsButton from "../../../../Components/common/ViewDetailsButton";
import { useNavigate } from "react-router-dom";
import { useLevels } from "../../../../Utils/useLevels";
function CustomerTable({ customers, setIsEditModalOpen, setSelectedCustomer }) {
  const navigate = useNavigate();
  const { admin, cs, cx, executive, operationEmployee, marketing } = useLevels();

  return (
    <div className="w-full ">
      <div className="overflow-x-scroll">
        <Table>
          <TableHeadingRow>
            <TableHeading text="Name" />
            <TableHeading text="Email" />
            <TableHeading text="Phone Number" />
            <TableHeading text="Group" />
            <TableHeading text="Created By" />
            <TableHeading align={"text-right"} text="Action" />
          </TableHeadingRow>

          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer._id} item={customer}>
                <TextCell text={customer.firstName + " " + customer.lastName} />
                <TextCell text={customer.email} />
                <TextCell text={customer.mobile} />
                <TextCell text={customer.group} />
                <TextCell text={customer.employee?.name} />
                <TableButtonCell>
                  {(admin || cs || cx || executive || operationEmployee || marketing) && (
                    <ViewDetailsButton
                      label="View Orders"
                      onClick={() => navigate(`/ViewCustomerOrders/${customer._id}`)}
                    />
                  )}
                  {/* <ViewDetailsButton
                label="Customer Details"
                onClick={() => navigate(`/ViewCustomerDetails/${customer._id}`)}
              /> */}
                  {(admin || cs || cx || operationEmployee || marketing || executive) && (
                    <ViewDetailsButton
                      label="Plastic History"
                      onClick={() =>
                        navigate(`/ViewCustomerPlasticHistory/${customer._id}`)
                      }
                    />
                  )}
                  {(admin || cs || cx || operationEmployee || marketing || executive) && (
                    <ViewDetailsButton
                      label="Plastic Points"
                      onClick={() =>
                        navigate(`/ViewCustomerPlasticPoints/${customer._id}`)
                      }
                    />
                  )}
                  {(admin || cs || cx || operationEmployee || marketing || executive) && (
                    <ViewDetailsButton
                      label="Reward History"
                      onClick={() =>
                        navigate(`/ViewCustomerRewardHistory/${customer._id}`)
                      }
                    />
                  )}

                  {(admin || cs || cx || executive) && (
                    <ViewDetailsButton
                      label="Create Order"
                      onClick={() => navigate(`/CreateOrder1/${customer._id}`)}
                    />
                  )}
                  {(admin || cx) && (
                    <ViewDetailsButton
                      label="Edit Profile"
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setIsEditModalOpen(true);
                      }}
                    />
                  )}
                </TableButtonCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CustomerTable;
