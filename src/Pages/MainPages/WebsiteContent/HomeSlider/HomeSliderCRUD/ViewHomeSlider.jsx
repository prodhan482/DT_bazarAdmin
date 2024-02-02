import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import ViewDetailsField from "../../../../../Components/common/ViewDetailsField"
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout"

import { IMAGE_URL } from "../../../../../Utils/Api";

function ViewHomeSlider({ homeSlider, onClose, errorMessage }) {
  return (

    <ViewDetailsLayout label={"HomeSlider Details"} onClose={onClose}>

      <img src={`${IMAGE_URL}${homeSlider.image}`} className="w-full h-40 mb-2" />
      <ViewDetailsField fieldName={"Link"} data={homeSlider.link} />
      <ViewDetailsField
        fieldName={"Precedence"}
        data={homeSlider.precedence}
      />

      <ErrorMessage message={errorMessage} />

    </ViewDetailsLayout>

  )
}

export default ViewHomeSlider
