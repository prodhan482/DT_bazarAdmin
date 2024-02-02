import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import ViewDetailsField from "../../../../../Components/common/ViewDetailsField"
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout"
import { IMAGE_URL } from "../../../../../Utils/Api";

function ViewBrand({ brand, onClose, errorMessage }) {
  return (

    <ViewDetailsLayout label={"Brand Details"} onClose={onClose}>

      <img src={`${IMAGE_URL}${brand.image}`}  className="w-full h-40 mb-2" />
      <ViewDetailsField fieldName={"Name"} data={brand.name} />
      {/* <ViewDetailsField fieldName={"Link"} data={brand.link} /> */}

      <ErrorMessage message={errorMessage} />

    </ViewDetailsLayout>   
  )
}

export default ViewBrand