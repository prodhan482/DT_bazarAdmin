import { useState, useEffect } from "react"

import Table from "../../../../../Components/table/Table"
import TableHeadingRow from "../../../../../Components/table/TableHeadingRow"
import TableHeading from "../../../../../Components/table/TableHeading"
import TextCell from "../../../../../Components/table/TextCell"
import TableRow from "../../../../../Components/table/TableRow"
import TableBody from "../../../../../Components/table/TableBody"
import TextEditorPageLayout from "../../../../../Components/common/TextEditorPageLayout"

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../../theme";
import Header from "../../../../../Components/common/Header";
import { useTheme } from "@mui/material";

import { getLeaderCustomerByPlasticPoints } from "../customerService"

function ViewLeaderCustomerByPlasticPoints() {
  const [leaderCustomerByPlasticPoints, setLeaderCustomerByPlasticPoints] = useState([])
  const [toggleState, setToggleState] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {

    async function fetchData () {

      try {

        const response = await getLeaderCustomerByPlasticPoints()
        setLeaderCustomerByPlasticPoints(response)
       
      } catch (error) {

        setErrorMessage("Error Leader Customer by Plastic Points. Please try again.")

      }

    }

    fetchData()

  }, [toggleState])

  return (
    <TextEditorPageLayout
    title = "Leader Customer by Plastic Points"
    itemCount = {leaderCustomerByPlasticPoints.length}
    onAddClick={() => setIsAddModalOpen(true)}
    >
   
   <Box
      m="40px 0 0 0"
      height="75vh"

      width="150vh"
      overflowX="scroll"
      sx={{
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
      >
        {/* <GridToolbar> */}
    <Table >

      <TableHeadingRow>
      
        <TableHeading text="Customer Name" />
        <TableHeading text="Customer Email" />
        <TableHeading text="Customer Phone" />
        <TableHeading text="Maximum Plastic Points" />
      </TableHeadingRow>

      <TableBody>
        {leaderCustomerByPlasticPoints.map(leaderCustomerByPlasticPoints => (
          <TableRow key={leaderCustomerByPlasticPoints._id} item={leaderCustomerByPlasticPoints}>
            <TextCell text={leaderCustomerByPlasticPoints.customerInfo ? `${leaderCustomerByPlasticPoints.customerInfo.firstName+ ' ' +leaderCustomerByPlasticPoints.customerInfo.lastName}` : 'N/A'} />
            <TextCell text={leaderCustomerByPlasticPoints.customerInfo ? `${leaderCustomerByPlasticPoints.customerInfo.email}` : 'N/A'} />
            <TextCell text={leaderCustomerByPlasticPoints.customerInfo ? `${leaderCustomerByPlasticPoints.customerInfo.mobile}` : 'N/A'} />
            <TextCell text={leaderCustomerByPlasticPoints.maxPlasticPoints} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
    {/* </GridToolbar> */}
    </Box>
</TextEditorPageLayout>
  )
}

export default ViewLeaderCustomerByPlasticPoints
