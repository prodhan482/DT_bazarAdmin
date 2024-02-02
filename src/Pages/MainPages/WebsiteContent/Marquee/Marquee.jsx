import { useState, useEffect } from "react";

// import ViewAchivement from "./AchivementCRUD/ViewAchivement"
// import EditAchivement from "./AchivementCRUD/EditAchivement"
// import DeleteAchivement from "./AchivementCRUD/DeleteAchivement"
// import AddAchivement from "./AchivementCRUD/AddAchivement"
import PageLayout from "../../../../Components/common/PageLayout";
import Modal from "../../../../Components/common/Modal";

import { getItems } from "./marqueeService";
import MarqueeTable from "./MarqueeTable";
import AddMarquee from "./MarqueeCRUD/AddMarquee";
import DeleteMarquee from "./MarqueeCRUD/DeleteMarquee";

function Marquee() {
  const [marquee, setMarquee] = useState([]);
  const [toggleState, setToggleState] = useState(false);

  const [selectedMarquee, setSelectedMarquee] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getItems();
        setMarquee(response);
      } catch (error) {
        setErrorMessage("Error Marquee. Please try again.");
      }
    }

    fetchData();
  }, [toggleState]);

  function handleSuccess() {
    setToggleState((prevState) => !prevState);
  }

  return (
    <PageLayout
      title="All Marquee Text"
      itemCount={marquee.length}
      onAddClick={() => setIsAddModalOpen(true)}
    >
      <MarqueeTable
        marquee={marquee}
        setIsViewModalOpen={setIsViewModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setSelectedMarquee={setSelectedMarquee}
      />

      {isAddModalOpen && (
        <Modal>
          <AddMarquee
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={handleSuccess}
          />
        </Modal>
      )}
         {isDeleteModalOpen && (
        <Modal>
          <DeleteMarquee
            marquee = {selectedMarquee}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess = {handleSuccess}
          />
        </Modal>
      )}
      {/* {isViewModalOpen && (
        <Modal>
          <ViewAchivement
            achivement = {selectedAchivement}
            onClose={() => setIsViewModalOpen(false)}
            errorMessage = {errorMessage}
          />
        </Modal>
      )}

      {isEditModalOpen && (
        <Modal>
          <EditAchivement
            achivement = {selectedAchivement}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}

    */}
    </PageLayout>
  );
}

export default Marquee;
