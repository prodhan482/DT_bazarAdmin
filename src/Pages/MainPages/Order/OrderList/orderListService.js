import axios from "axios";
import { ORDERS_API } from "../../../../Utils/Api";
import { ORDERS_STATUS_API } from "../../../../Utils/Api";
import { getToken } from "../../../../Utils/auth";

const token = getToken()
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  export async function getItems() {
    const response = await axios.get( ORDERS_API , { headers } );
    return response.data;
  }

  export async function getSingleItems(id) {
    const response = await axios.get(`${ ORDERS_API }/getSingleOrder/${id}`, { headers });
    return response.data;
  }

  export async function getAllOrdersByStatus(status,page,limit) {
    const response = await axios.get(`${ ORDERS_API }/getAllOrdersByStatus/${status}/${page}/${limit}`, { headers });
    return response.data;
  }

  export async function getTimeRangeOrders(startDate, endDate, orderStatus) {
    const formattedStartDate = formatDate(startDate); 
    const formattedEndDate = formatDate(endDate);
    const response = await axios.get(`${ ORDERS_API }/getTimeRangeOrders/${formattedStartDate}/${formattedEndDate}/${orderStatus}`, { headers });
    return response.data;
    // try {
    //   const formattedStartDate = formatDate(startDate); // Format startDate
    //   const formattedEndDate = formatDate(endDate); // Format endDate
    //   const url = `${ ORDERS_API }/getTimeRangeOrders/${formattedStartDate}/${formattedEndDate}/${orderStatus}`;
      
    //   const response = await fetch(url, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${getToken()}`
    //     }
    //   });
  
    //   const data = await response.json();
    //   return data;
    // } catch (error) {
    //   throw error;
    // }
  }  

function formatDate(date) {
  // Format date to YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function searchOrder(search) {
  const response = await axios.get(`${ ORDERS_API }/searchOrder?search=${search}`,{ headers });
  return response.data;
}


export async function searchOrderByStatus(search,status) {
  const response = await axios.get(`${ ORDERS_STATUS_API }/searchOrderByStatus/${status}?search=${search}`,{ headers });
  return response.data;
}