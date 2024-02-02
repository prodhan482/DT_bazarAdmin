import { deleteItem } from "../categoryService";
import DeleteConfirm from "../../../../../Components/common/DeleteConfirm";
function DeleteCategory({ category, onClose, onDeleteSuccess }) {
  const handleDelete = async (id) => {
    try {
      await deleteItem(id);

      onDeleteSuccess();
      onClose();
    } catch (error) {}
  };
  return (
    <DeleteConfirm
      title={"Delete Category"}
      handleDelete={handleDelete}
      id={category._id}
      onClose={onClose}
    />
  );
}

export default DeleteCategory;
