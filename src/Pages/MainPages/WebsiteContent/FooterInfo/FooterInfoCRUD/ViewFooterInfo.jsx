import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import ViewDetailsField from "../../../../../Components/common/ViewDetailsField"
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout"
import { IMAGE_URL } from "../../../../../Utils/Api";

function ViewFooterInfo({ footerInfo, onClose, errorMessage }) {
  return (

    <ViewDetailsLayout label={"Footer Information Details"} onClose={onClose}>

      <img src={`${IMAGE_URL}${footerInfo.logo}`}  className="w-full h-40 mb-2" />
      <ViewDetailsField fieldName={"Description"} data={footerInfo.description} />
      <ViewDetailsField fieldName={"Address"} data={footerInfo.address} />
      <ViewDetailsField fieldName={"Mobile"} data={footerInfo.mobile} />
      <ViewDetailsField fieldName={"Email"} data={footerInfo.email} />

      <ErrorMessage message={errorMessage} />

    </ViewDetailsLayout>   
  )
}

export default ViewFooterInfo