// import React from 'react';
// import "./Dashboard.css"
// function Dashboard() {
//     return (
//         <div className='content'>
//            <h1 className='text-3xl font-bold underline text-primary '> Hello this is Dashboard page!</h1>
//         </div>
//      );
// }

// export default Dashboard;

import { useEffect, useState } from "react";

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../../../src/data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../../Components/DashboardComponents/Header";
import LineChart from "../../../Components/DashboardComponents/LineChart";
import GeographyChart from "../../../Components/DashboardComponents/GeographyChart";
import BarChart from "../../../Components/DashboardComponents/BarChart";
import StatBox from "../../../Components/DashboardComponents/StatBox";
import ProgressCircle from "../../../Components/DashboardComponents/ProgressCircle";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import RecyclingIcon from "@mui/icons-material/Recycling";

import { getItems } from "./dashboardService";
import { getTodayesReport } from "./dashboardService";
import { getTodaysOrder } from "./dashboardService";
import { getTrendingProducts } from "./dashboardService";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [dashboardCards, setDashboardCards] = useState("");
  const [todaysReport, setTodaysReport] = useState("");
  const [todaysOrder, setTodaysOrder] = useState([]);
  const [treningProucts, setTreningProucts] = useState([]);
  const [toggleState, setToggleState] = useState(false);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const dashboardCardData = await getItems();
        const todaysReportData = await getTodayesReport();
        const todaysOrderData = await getTodaysOrder();
        const trendingProductsData = await getTrendingProducts();
        setDashboardCards(dashboardCardData);
        setTodaysReport(todaysReportData);
        setTodaysOrder(todaysOrderData);
        setTreningProucts(trendingProductsData);
      } catch (error) {
        setErrorMessage("Error Dashboard Cards. Please try again.");
      }
    }

    fetchData();
  }, [toggleState]);

  function handleSuccess() {
    setToggleState((prevState) => !prevState);
  }

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // console.log(todaysOrder[0].orderID)
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          {/* <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button> */}

          {/* <Typography variant="h5" gutterBottom>
        Today's Date and Time:
      </Typography> */}
          <Typography variant="h3">
            {currentDateTime.toLocaleString()}{" "}
            {/* Adjust formatting as needed */}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h4" gutterBottom>
        Today's Report:
      </Typography>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.blueAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`৳ ${todaysReport?.todaysTotalOrderValue}`}
            // subtitle="Lifetime Sales"
            subtitle="Total Order Amount"
            // progress="0.75"
            // increase="+14%"
            icon={
              <MonetizationOnIcon
                sx={{ color: colors.green, fontSize: "26px" }}
              />
            }
          />
          <StatBox
            title={todaysReport?.todayOrders?.length}
            // subtitle="Lifetime Sales"
            subtitle="Total Order Count"
            // progress="0.75"
            // increase="+14%"
            // icon={
            //   <RecyclingIcon
            //     sx={{ color: colors.green, fontSize: "26px" }}
            //   />
            // }
          />

          {/* <Box ml={2}>
        <Typography variant="body1" color="textSecondary">
          Additional Information
        </Typography>
      </Box> */}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.greenAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`৳ ${todaysReport?.todaysTotalDeliveredOrderValue}`}
            subtitle="Total Delivered Order Amount"
            // progress="0.50"
            // increase="+21%"
            icon={
              <NoCrashIcon sx={{ color: colors.green, fontSize: "26px" }} />
            }
          />
          <StatBox
            title={todaysReport?.todaysOrderDelivered?.length}
            // subtitle="Lifetime Sales"
            subtitle="Total Delivered Order Count"
            // progress="0.75"
            // increase="+14%"
            // icon={
            //   <RecyclingIcon
            //     sx={{ color: colors.green, fontSize: "26px" }}
            //   />
            // }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.blueAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`৳ ${todaysReport?.todaysTotalPendingOrderValue}`}
            // subtitle="Total Customers"
            subtitle="Total Pending Order Amount"
            // progress="0.30"
            // increase="+5%"
            icon={
              <PeopleOutlineIcon
                sx={{ color: colors.green, fontSize: "26px" }}
              />
            }
          />
          <StatBox
            title={todaysReport?.todaysOrderPending?.length}
            // subtitle="Total Customers"
            subtitle="Total Pending Order Count"
            // progress="0.30"
            // increase="+5%"
            // icon={
            //   <PeopleOutlineIcon
            //     sx={{ color: colors.green, fontSize: "26px" }}
            //   />
            // }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.greenAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`৳ ${todaysReport?.todaysTotalCanceledOrderValue}`}
            // subtitle="Total Consumed Plastic"
            subtitle="Total Canceled Order Amount"
            // progress="0.80"
            // increase="+43%"
            icon={
              <RecyclingIcon sx={{ color: colors.green, fontSize: "26px" }} />
            }
          />
          <StatBox
            title={`Count: ${todaysReport?.todaysOrderCanceled?.length}`}
            // subtitle="Total Customers"
            // subtitle="Total Pending Order Count"
            // progress="0.30"
            // increase="+5%"
            // icon={
            //   <PeopleOutlineIcon
            //     sx={{ color: colors.green, fontSize: "26px" }}
            //   />
            // }
          />
        </Box>

        {/* <Typography variant="h4" gutterBottom>
        Lifetime Sales Report:
      </Typography> */}

        <Box
          gridColumn="span 3"
          backgroundColor={colors.blueAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`৳ ${dashboardCards?.lifetimeSale?.totalSaleAmount}`}
            subtitle="Lifetime Sales"
            // subtitle="Total Order"
            // progress="0.75"
            // increase="+14%"
            icon={
              <MonetizationOnIcon
                sx={{ color: colors.green, fontSize: "26px" }}
              />
            }
          />
          <StatBox
            title={dashboardCards?.lifetimeSale?.lifetimeOrder}
            subtitle="Lifetime Order Count"
            // subtitle="Total Plastic"
            // progress="0.75"
            // increase="+14%"
            // icon={
            //   <RecyclingIcon
            //     sx={{ color: colors.green, fontSize: "26px" }}
            //   />
            // }
          />

          {/* <Box ml={2}>
        <Typography variant="body1" color="textSecondary">
          Additional Information
        </Typography>
      </Box> */}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.greenAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`৳ ${dashboardCards?.lifetimeSale?.totalDeliveredSaleAmount}`}
            subtitle="LifeTime Delivered Order"
            // progress="0.50"
            // increase="+21%"
            icon={
              <NoCrashIcon sx={{ color: colors.green, fontSize: "26px" }} />
            }
          />
          <StatBox
            title={dashboardCards?.lifetimeSale?.lifetimeDeliveredOrder}
            // subtitle="Lifetime Sales"
            subtitle="Lifetime Delivered Count"
            // progress="0.75"
            // increase="+14%"
            // icon={
            //   <MonetizationOnIcon
            //     sx={{ color: colors.green, fontSize: "26px" }}
            //   />
            // }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.blueAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardCards?.totalCustomer}
            subtitle="Total Customers"
            // subtitle="Total Pending Order Value"
            // progress="0.30"
            // increase="+5%"
            icon={
              <PeopleOutlineIcon
                sx={{ color: colors.green, fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.greenAccent[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardCards?.plasticConsumeCount}
            subtitle="Total Consumed Plastic"
            // subtitle="Total Canceled Order Value"
            // progress="0.80"
            // increase="+43%"
            icon={
              <RecyclingIcon sx={{ color: colors.green, fontSize: "26px" }} />
            }
          />
          <StatBox
            title={dashboardCards?.totalPlasticReturn}
            subtitle="Total Return Plastic"
            // subtitle="Total Canceled Order Value"
            // progress="0.80"
            // increase="+43%"
            icon={
              <RecyclingIcon sx={{ color: colors.green, fontSize: "26px" }} />
            }
          />
        </Box>

        {/* ROW 2 */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="10px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                ৳ 1234567
              </Typography>
            </Box>
            {/* <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box> */}
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Today's Orders ({todaysOrder.length})
            </Typography>
          </Box>
          {todaysOrder?.map((todaysOrder, i) => (
            <Box
              // key={`${todaysOrder._id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {todaysOrder?.orderID}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {todaysOrder?.customer?.firstName +
                    " " +
                    todaysOrder?.customer?.lastName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {todaysOrder?.orderStatus}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Delivery Date: {formatDate(todaysOrder?.deliveryDate)}
                </Typography>
              </Box>
              {/* <Box color={colors.grey[100]}>{todaysOrder.date}</Box> */}
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ৳ {todaysOrder?.total}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{ marginBottom: "15px" }}
        >
          Geography Based Traffic
        </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top Selling Products ({treningProucts.length})
            </Typography>
          </Box>
          {treningProucts?.map((treningProucts, i) => (
            <Box
              // key={`${todaysOrder._id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {treningProucts?.product?.name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  SKU: {treningProucts?.product?.sku}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Stock: {treningProucts?.product?.quantity}
                </Typography>
                <Typography color={colors.grey[100]}>
                  Sell: {treningProucts?.quantity}
                </Typography>
              </Box>
              {/* <Box color={colors.grey[100]}>{todaysOrder.date}</Box> */}
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ৳ {treningProucts?.product?.price}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
