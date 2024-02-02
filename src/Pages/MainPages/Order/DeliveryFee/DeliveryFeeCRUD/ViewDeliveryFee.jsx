import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import ViewDetailsField from "../../../../../Components/common/ViewDetailsField"
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout"

function ViewDeliveryFee({ deliveryFee, onClose, errorMessage }) {

  return (

    <ViewDetailsLayout label={"Delivery Fee Details"} onClose={onClose}>

      <ViewDetailsField fieldName={"Name"} data={deliveryFee.name} />
      <ViewDetailsField
        fieldName={"Minimum Amount"}
        data={deliveryFee.minAmount}
      />
      <ViewDetailsField
        fieldName={"Maximum Amount"}
        data={deliveryFee.maxAmount}
      />
      <ViewDetailsField
        fieldName={"Delivery Fee"}
        data={deliveryFee.fee}
      />
      <ViewDetailsField fieldName={"Is Applicable"} data={`${deliveryFee.isApplicable}`} />

      <ErrorMessage message={errorMessage} />

    </ViewDetailsLayout>
    
  )
}

export default ViewDeliveryFee
