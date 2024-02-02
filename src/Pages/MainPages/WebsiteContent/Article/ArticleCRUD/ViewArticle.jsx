import ErrorMessage from "../../../../../Components/common/ErrorMessage"
import ViewDetailsField from "../../../../../Components/common/ViewDetailsField"
import ViewDetailsLayout from "../../../../../Components/common/ViewDetailsLayout"
import ViewTextEditorField from "../../../../../Components/common/ViewTextEditorField";
import { IMAGE_URL } from "../../../../../Utils/Api";

function ViewArticle({ article, onClose, errorMessage }) {
  return (

    <ViewDetailsLayout label={"Article Details"} onClose={onClose}>

      <img src={`${IMAGE_URL}${article.image}`}  className="w-full h-40 mb-2" />
      <ViewDetailsField fieldName={"Title"} data={article.title} />
      <ViewTextEditorField fieldName={"Description"} data={{__html: article.description}} />

      <ErrorMessage message={errorMessage} />

    </ViewDetailsLayout>   
  )
}

export default ViewArticle