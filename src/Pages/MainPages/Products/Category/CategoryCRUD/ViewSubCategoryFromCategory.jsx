import { useState, useEffect } from "react"

import Table from "../../../../../Components/table/Table"
import TableHeadingRow from "../../../../../Components/table/TableHeadingRow"
import TableHeading from "../../../../../Components/table/TableHeading"
import TextCell from "../../../../../Components/table/TextCell"
import TableButtonCell from "../../../../../Components/table/TableButtonCell";
import TableRow from "../../../../../Components/table/TableRow"
import TableBody from "../../../../../Components/table/TableBody"
import { useNavigate, useParams } from "react-router-dom";
import TextEditorPageLayout from "../../../../../Components/common/TextEditorPageLayout"
import ViewDetailsButton from "../../../../../Components/common/ViewDetailsButton"

import { getSubcategoriesFromCategory } from "../categoryService"

function ViewSubCategoryFromCategory() {
  const { id } = useParams();
  const [subCategoryFromCategory, setSubCategoryFromCategory] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")


  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getSubcategoriesFromCategory(id)
        setSubCategoryFromCategory(response)

      } catch (error) {

        setErrorMessage("Error SubCategory From Category. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  return (
    <TextEditorPageLayout
    title = "Sub-Categories"
    itemCount = {subCategoryFromCategory.length}
    onAddClick={() => setIsAddModalOpen(true)}
  >

    <Table>

      <TableHeadingRow>
      
        <TableHeading text="Name" />    
        <TableHeading text="Precedence" />
        <TableHeading text="Active Status" />
      
      </TableHeadingRow>

      <TableBody>
        {subCategoryFromCategory.map(subCategoryFromCategory => (
          <TableRow key={subCategoryFromCategory._id} item={subCategoryFromCategory}>           
            <TextCell text={subCategoryFromCategory.name} />
            <TextCell text={subCategoryFromCategory.precedence} />
            <TextCell text={`${subCategoryFromCategory.isActive}`} />          
          </TableRow>
        ))}
      </TableBody>
    </Table>
</TextEditorPageLayout>
  )
}

export default ViewSubCategoryFromCategory