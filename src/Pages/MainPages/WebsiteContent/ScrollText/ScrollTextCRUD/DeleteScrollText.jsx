import { deleteItem } from "../scrollTextService";
import DeleteConfirm from "../../../../../Components/common/DeleteConfirm";
function DeleteScrollText({ scrollText, onClose, onDeleteSuccess }) {
  const handleDelete = async (id) => {
    try {
      await deleteItem(id);

      onDeleteSuccess();
      onClose();
    } catch (error) {

    }
  };
  return (
    <DeleteConfirm
      title={"Delete Text Scroll"}
      handleDelete={handleDelete}
      id={scrollText._id}
      onClose={onClose}
    />
  );
}

export default DeleteScrollText;
