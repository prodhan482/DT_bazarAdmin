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
import ViewDetailsText from "../../../../Components/common/ViewDetailsText";
import { useNavigate } from "react-router-dom";


function ProductByCategoryTable({ 

  category, 
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedCategory, 

}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const totalPages = Math.ceil(category.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const currentItems = category.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const navigate = useNavigate();
  
  return (
    <div className="w-full ">
      <div className="overflow-x-scroll">
    <Table>
      
      <TableHeadingRow>
        <TableHeading text="Image" />
        <TableHeading text="Name" />
        <TableHeading text="Precedence" />
        {/* <TableHeading text="SQL Id" />
        <TableHeading text="Product Count" />
        <TableHeading text="Level" /> */}
        <TableHeading text="Active" />
        <TableHeading text="Discount" />
        <TableHeading text="Discount Type" />
        <TableHeading text="Discount Amount" />
      </TableHeadingRow>
      <TableBody>
      {currentItems.map(category => (
          <TableRow key={category._id} item={category}>
            <ImageCell>
              <TableImage img={category.image} />
            </ImageCell>
            <ViewDetailsText
                label={category.name}
                onClick={() =>  navigate(`/ViewProductByCategory/${category._id}`)}
              />
            <TextCell text={category.precedence} />
            {/* <TextCell text={category.sqlId} />
            <TextCell text={category.productCount} />
            <TextCell text={category.level} /> */}
            <TextCell text={`${category.isActive}`} />
            <TextCell text={`${category.isDiscount}`} />
            <TextCell text={category.discountType} />
            <TextCell text={category.discountAmount} />
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

export default ProductByCategoryTable;
