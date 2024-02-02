import { useEffect, useState } from "react";

import Table from "../../../../Components/table/Table";
import TableHeadingRow from "../../../../Components/table/TableHeadingRow";
import TableHeading from "../../../../Components/table/TableHeading";
import TextCell from "../../../../Components/table/TextCell";
import TableButtonCell from "../../../../Components/table/TableButtonCell";
import ViewTableButton from "../../../../Components/table/ViewTableButton";
import EditTableButton from "../../../../Components/table/EditTableButton";
import DeleteTableButton from "../../../../Components/table/DeleteTableButton";
import TableImage from "../../../../Components/table/TableImage";
import ImageCell from "../../../../Components/table/ImageCell";
import TableBody from "../../../../Components/table/TableBody"
import TableRow from "../../../../Components/table/TableRow"
import { useNavigate } from "react-router-dom";
import ViewDetailsText from "../../../../Components/common/ViewDetailsText";


function ProductBySubCategoryTable({ 

  subCategory, 
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedSubCategory, 

}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const totalPages = Math.ceil(subCategory.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentItems = subCategory.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const navigate = useNavigate();
  
  return (
    <div className="w-full ">
      <div className="overflow-x-scroll">
    <Table>
      
      <TableHeadingRow>
        <TableHeading text="Name" />
        <TableHeading text="Precedence" />
        <TableHeading text="Active" />

      </TableHeadingRow>
      <TableBody>
      {currentItems.map(subCategory => (
          <TableRow key={subCategory._id} item={subCategory}>
            <ViewDetailsText
                label={subCategory.name}
                onClick={() =>  navigate(`/ViewProductBySubCategory/${subCategory._id}`)}
              />
            <TextCell text={subCategory.precedence} />
            <TextCell text={`${subCategory.isActive}`} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>

    <div className="flex justify-center items-center px-10 relative fixed">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          className={`${index + 1 === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            } py-2 px-4 rounded`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
       </div>
    </div>

  );
}

export default ProductBySubCategoryTable;
