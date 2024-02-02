import Table from "../../../../Components/table/Table"
import TableHeadingRow from "../../../../Components/table/TableHeadingRow"
import TableHeading from "../../../../Components/table/TableHeading"
import TextCell from "../../../../Components/table/TextCell"
import ViewTableButton from "../../../../Components/table/ViewTableButton"
import EditTableButton from "../../../../Components/table/EditTableButton"
import DeleteTableButton from "../../../../Components/table/DeleteTableButton"
import TableButtonCell from "../../../../Components/table/TableButtonCell"
import TableRow from "../../../../Components/table/TableRow"
import TableBody from "../../../../Components/table/TableBody"

import ImageCell from "../../../../Components/table/ImageCell"
import TableImage from "../../../../Components/table/TableImage"

function HomeSliderTable({

  homeSlider,
  setIsViewModalOpen, setIsEditModalOpen, setIsDeleteModalOpen,
  setSelectedHomeSlider,

}) {
  return (

    <Table>

      <TableHeadingRow>
        <TableHeading text="Image" />
        <TableHeading text="Link" />
        <TableHeading text="Precedence" />
        <TableHeading align={"text-right"} text="Action" />
      </TableHeadingRow>

      <TableBody>
        {homeSlider.map(homeSlider => (
          <TableRow key={homeSlider._id} item={homeSlider}>
            <ImageCell>
              <TableImage img={homeSlider.image} />
            </ImageCell>
            <TextCell text={homeSlider.link} />
            <TextCell text={homeSlider.precedence} />
            <TableButtonCell>
              <ViewTableButton
                onClick={() => {
                  setSelectedHomeSlider(homeSlider)
                  setIsViewModalOpen(true)
                }}
              />
              <EditTableButton
                onClick={() => {
                  setSelectedHomeSlider(homeSlider)
                  setIsEditModalOpen(true)
                }}
              />
              <DeleteTableButton
                onClick={() => {
                  setSelectedHomeSlider(homeSlider)
                  setIsDeleteModalOpen(true)
                }}
              />
            </TableButtonCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    
  )
}

export default HomeSliderTable
