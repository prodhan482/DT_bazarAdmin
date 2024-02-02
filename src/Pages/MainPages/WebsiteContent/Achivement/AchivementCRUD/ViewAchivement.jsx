import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import ViewDetailsField from "../../../../../Components/common/ViewDetailsField"
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout"
import { IMAGE_URL } from "../../../../../Utils/Api";

function ViewAchivement({ achivement, onClose, errorMessage }) {
  return (

    <ViewDetailsLayout label={"Achivement Details"} onClose={onClose}>

      <img src={`${IMAGE_URL}${achivement.image}`}  className="w-full h-40 mb-2" />
      <ViewDetailsField fieldName={"Title"} data={achivement.title} />
      <ViewDetailsField fieldName={"Description"} data={achivement.description} />

      <ErrorMessage message={errorMessage} />

    </ViewDetailsLayout>   
  )
}

export default ViewAchivement