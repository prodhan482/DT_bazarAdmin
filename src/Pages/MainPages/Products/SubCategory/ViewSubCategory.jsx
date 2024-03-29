import ViewDetailsField from "../../../../Components/common/ViewDetailsField";
import ViewDetailsLayout from "../../../../Components/common/ViewDetailsLayout";
import { IMAGE_URL } from "../../../../Utils/Api";
function ViewSubCategory({ data, onClose }) {
  return (
    <ViewDetailsLayout label={"Sub-Category Details"} onClose={onClose}>
      <img src={`${IMAGE_URL}${data.image}`}  className="w-1/2 h-40 mb-2" />
      <ViewDetailsField fieldName={"Name"} data={data.name} />
      <ViewDetailsField fieldName={"Category"} data={data.category?.name} />
      <ViewDetailsField fieldName={"Precedence"} data={data.precedence} />
      {/* <ViewDetailsField fieldName={"SQL Id"} data={data.sqlId} />
      <ViewDetailsField fieldName={"Product Count"} data={data.productCount} />
      <ViewDetailsField fieldName={"Level"} data={data.level} /> */}
      <ViewDetailsField fieldName={"Active"} data={`${data.isActive}`} />
    </ViewDetailsLayout>
  );
}

export default ViewSubCategory;
