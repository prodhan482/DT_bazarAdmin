import ViewDetailsField from "../../../../../Components/common/ViewDetailsField";
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout";
import { IMAGE_URL } from "../../../../../Utils/Api";
function ViewCategory({ category, onClose }) {
  return (
    <ViewDetailsLayout label={"Category Details"} onClose={onClose}>
      <img src={`${IMAGE_URL}${category.image}`}  className="w-1/2 h-40 mb-2" />
      <ViewDetailsField fieldName={"Name"} data={category.name} />
      <ViewDetailsField fieldName={"Precedence"} data={category.precedence} />
      <ViewDetailsField fieldName={"SQL Id"} data={category.sqlId} />
      <ViewDetailsField fieldName={"Product Count"} data={category.productCount} />
      <ViewDetailsField fieldName={"Level"} data={category.level} />
      <ViewDetailsField fieldName={"Active"} data={`${category.isActive}`} />
    </ViewDetailsLayout>
  );
}

export default ViewCategory;
