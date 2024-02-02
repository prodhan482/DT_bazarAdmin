import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import ViewDetailsField from "../../../../../Components/common/ViewDetailsField"
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout"

function ViewTimeSlot({ timeSlot, onClose, errorMessage }) {

  return (

    <ViewDetailsLayout label={"TimeSlot Details"} onClose={onClose}>

      <ViewDetailsField
        fieldName={"Start Time"}
        data={timeSlot.startTime}
      />
      <ViewDetailsField
        fieldName={"End Time"}
        data={timeSlot.endTime}
      />

      <ErrorMessage message={errorMessage} />

    </ViewDetailsLayout>
    
  )
}

export default ViewTimeSlot
