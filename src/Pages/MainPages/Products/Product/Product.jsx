// import { useEffect, useState } from "react";
// import { getItems, getPaginatedItems } from "./productService";
// import ProductView from "./ProductView";
// import DeleteProduct from "./DeleteProduct";
// import { useNavigate } from "react-router-dom";
// import { useLevels } from "../../../../Utils/useLevels";

// function Product() {
//   const [data, setData] = useState([]);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const { admin, cs, cx, executive, operationEmployee } = useLevels();

//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   const navigate = useNavigate()
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getPaginatedItems(page,limit);
//         setData(response);
//       } catch (error) {}
//     };

//     fetchData();
//     console.log(page)
//   }, [page,limit]);


//   const handleView = (item) => {
//     setSelectedItem(item);
//     setIsViewModalOpen(true);
//   };

//   const handleDelete = (deleteItem) => {
//     setSelectedItem(deleteItem);
//     setIsDeleteModalOpen(true);
//   };

//   const handleEdit = (items) => {
//     setSelectedItem(items);
//     setIsEditModalOpen(true);
//   };

//   const handleSuccess = async () => {
//     try {
//       const updatedItems = await getItems();
//       setData(updatedItems);
//       setIsAddModalOpen(false);
//     } catch (error) {}
//   };
//   return (
//     <div className="relative h-full w-full overflow-x-scroll">
//       <div className="px-10 w-full flex justify-between my-12 ">
//         <h1 className="text-xl font-bold text-[#313649]">
//           All Product ({data?.totalProducts})
//         </h1>
//         { admin  && (
//         <button
//           onClick={() => navigate("/AddProduct")}
//           className="  bg-[#10823A] hover:[#4DB63F] text-white font-bold py-2 px-4 rounded "
//         >
//           Add Product
//         </button>
//         )}
//       </div>
//       <div className=" flex justify-center items-center px-10">
//         <ProductView
//           data={data}
//           onView={handleView}
//           onDelete={handleDelete}
//           setPage={setPage}
//           page={page}
//           setLimit={setLimit}
//           limit={limit}
//           // onEdit={handleEdit}
//         />
//       </div>
//       {isDeleteModalOpen && (
//         <DeleteProduct
//           data={selectedItem}
//           onClose={() => setIsDeleteModalOpen(false)}
//           onDeleteSuccess={handleSuccess}
//         />
//       )}
//       {/* {isAddModalOpen && (
//         <AddProduct
//           onClose={() => setIsAddModalOpen(false)}
//           onSuccess={handleSuccess}
//         />
//       )} */}
//       {/* 
//       {isEditModalOpen && (
//         <EditPlasticType
//           data={selectedItem}
//           onClose={() => setIsEditModalOpen(false)}
//           onEditSuccess={handleSuccess}
//         />
//       )}
    
      

 
//          {isViewModalOpen && (
//         <ViewBrand
//           data={selectedItem}
//           onClose={() => setIsViewModalOpen(false)}
//         />
//       )}  */}
//     </div>
//   );
// }

// export default Product;


import { useEffect, useState } from "react";
import { getItems, getPaginatedItems, searchProducts } from "./productService";
import ProductView from "./ProductView";
import DeleteProduct from "./DeleteProduct";
import { useNavigate } from "react-router-dom";
import { useLevels } from "../../../../Utils/useLevels";

function Product() {
  const [data, setData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { admin, cs, cx, executive, operationEmployee } = useLevels();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPaginatedItems(page, limit);
        setData(response);
      } catch (error) {}
    };

    fetchData();
    console.log(page);
  }, [page, limit]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await searchProducts(searchTerm);
        setSearchResults(response);
      } catch (error) {}
    };

    if (searchTerm !== "") {
      fetchSearchResults();
    }
  }, [searchTerm]);

  const handleView = (item) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const handleDelete = (deleteItem) => {
    setSelectedItem(deleteItem);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (items) => {
    setSelectedItem(items);
    setIsEditModalOpen(true);
  };

  const handleSuccess = async () => {
    try {
      const updatedItems = await getItems();
      setData(updatedItems);
      setIsAddModalOpen(false);
    } catch (error) {}
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative h-full w-full overflow-x-scroll">
          <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded-md mr-4"
        />
      <div className="px-10 w-full flex justify-between my-12 ">
        <h1 className="text-xl font-bold text-[#313649]">
          All Product ({data?.totalProducts})
        </h1>
        {admin && (
          <button
            onClick={() => navigate("/AddProduct")}
            className="  bg-[#10823A] hover:[#4DB63F] text-white font-bold py-2 px-4 rounded "
          >
            Add Product
          </button>
        )}
      </div>
      <div className="flex justify-center items-center px-10">
    
        <ProductView
          data={searchTerm ? searchResults : data}
          onView={handleView}
          onDelete={handleDelete}
          setPage={setPage}
          page={page}
          setLimit={setLimit}
          limit={limit}
          // onEdit={handleEdit}
        />
      </div>
      {isDeleteModalOpen && (
        <DeleteProduct
          data={selectedItem}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteSuccess={handleSuccess}
        />
      )}
      {/* {isAddModalOpen && (
        <AddProduct
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )} */}
      {/* 
      {isEditModalOpen && (
        <EditPlasticType
          data={selectedItem}
          onClose={() => setIsEditModalOpen(false)}
          onEditSuccess={handleSuccess}
        />
      )}
    
      

 
         {isViewModalOpen && (
        <ViewBrand
          data={selectedItem}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}  */}
    </div>
  );
}

export default Product;

