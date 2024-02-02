import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import ViewDetailsField from "../../../../../Components/common/ViewDetailsField"
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout"
import { IMAGE_URL } from "../../../../../Utils/Api";

function ViewPromotionCard({ promotionCard, onClose, errorMessage }) {
  return (

    <ViewDetailsLayout label={"Promotion Card Details"} onClose={onClose}>

      <img src={`${IMAGE_URL}${promotionCard.image}`}  className="w-full h-40 mb-2" />
      <ViewDetailsField fieldName={"Ctegory"} data={promotionCard.category?.name} />
      <ViewDetailsField fieldName={"link"} data={promotionCard.link} />

      <ErrorMessage message={errorMessage} />

    </ViewDetailsLayout>   
  )
}

export default ViewPromotionCard
