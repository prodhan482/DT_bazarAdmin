import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import ViewDetailsField from "../../../../../Components/common/ViewDetailsField"
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout"

function ViewPromoCode({ promoCode, onClose, errorMessage }) {

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };
  
  return (
    <ViewDetailsLayout label={"Package Details"} onClose={onClose}>
      <ViewDetailsField fieldName={"Promo"} data={promoCode.promo} />
      <ViewDetailsField fieldName={"Promo Type"} data={promoCode.promotype} />
      <ViewDetailsField fieldName={"Max Limit"} data={promoCode.maxlimit} />
      <ViewDetailsField
        fieldName={"discount Type"}
        data={promoCode.discountType}
      />
      <ViewDetailsField
        fieldName={"Discount Amount"}
        data={promoCode.discountAmount}
      />
      <ViewDetailsField
        fieldName={"Start Date"}
        data={formatDate(promoCode.validStartDate)}
      />
      <ViewDetailsField
        fieldName={"End Date"}
        data={formatDate(promoCode.validEndDate)}
      />

      <ErrorMessage message={errorMessage} />
    </ViewDetailsLayout>
  );
}

export default ViewPromoCode
