import ViewDetailsField from "../../../../../Components/common/ViewDetailsField";
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout";
import CustomerSideBar from "../../../../../Components/CustomerSidebar";
import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import ViewCustomerOrderDetails from "./ViewCustomerOrderDetails";

function ViewCustomerDetails({ customer, onClose, errorMessage }) {
  return (

    // <h1> hello </h1>
    <CustomerSideBar/>
   
    // <ViewDetailsLayout label={"Customer Details"} onClose={onClose}>

    //   <ViewDetailsField
    //     fieldName={"Name"}
    //     data={customer.firstName + ' ' + customer.lastName}
    //   />
    //   <ViewDetailsField
    //     fieldName={"Email"}
    //     data={customer.email}
    //   />
    //   <ViewDetailsField
    //     fieldName={"Phone Number"}
    //     data={customer.mobile}
    //   />

    //   <ErrorMessage message={errorMessage} />

    // </ViewDetailsLayout>

  );
}
export default ViewCustomerDetails;
