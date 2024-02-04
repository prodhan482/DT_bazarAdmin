import { useEffect, useState } from "react";

import EmployeeView from "./EmployeeView";
import EditEmployeeGroup from "./EmployeeCRUD/EditEmployeeGroup";
import Modal from "../../../../Components/common/Modal"

import { getItems } from "./employeeService";
console.log("🚀 ~ getItems:", getItems)


export default function Employees() {
  const [items, setItems] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [toggleState, setToggleState] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItems();
        setItems(response);
      } catch (error) {}
    };

    fetchData();
  }, [toggleState]);

  function handleSuccess() {
    setToggleState((prevState) => !prevState)
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full px-12">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold">
          Employee List ({items.length})
          
        </h1>
      </div>
      <EmployeeView 
      items={items} 
      setIsEditModalOpen = {setIsEditModalOpen}
      setSelectedItem = {setSelectedItem}
      />
      {isEditModalOpen && (
        <Modal>
          <EditEmployeeGroup
            item = {selectedItem}
            onClose = {() => setIsEditModalOpen(false)}
            onEditSuccess = {handleSuccess}
          />
        </Modal>
      )}
    </div>
    
  );
}
