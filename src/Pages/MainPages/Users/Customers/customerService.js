import axios from "axios";
import { CUSTOMERS_API } from "../../../../Utils/Api";
import { ADDRESS_API } from "../../../../Utils/Api";
import { ORDERS_API } from "../../../../Utils/Api";
import { ORDERS_STATUS_API } from "../../../../Utils/Api";
import { PRODUCTSGROUP_API } from "../../../../Utils/Api";
import { getToken } from "../../../../Utils/auth";

const token = getToken()
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  // 'Content-Type': 'multipart/form-data',
};

export async function getItems(page,limit) {
  const response = await axios.get(`${CUSTOMERS_API}/getAllCustomers/${page}/${limit}`, { headers });
  return response.data;
}

export async function getSingleItems(id) {
  const response = await axios.get(`${CUSTOMERS_API}/getSingleCustomer/${id}`, { headers });
  return response.data;
}

export async function getSingleCustomerOrders(id) {
  const response = await axios.get(`${ORDERS_API}/getSingleCustomerOrders/${id}`, { headers });
  return response.data;
}

export async function getOrderProductsFromOrder(id) {
  const response = await axios.get(`${ORDERS_API}/getOrderProductsFromOrder/${id}`, { headers });
  return response.data;
}

export async function getPlasticInfos(id) {
  const response = await axios.get(`${PRODUCTSGROUP_API}/plasticInfos/getSingleCustomerPlasticConsumeInfo/${id}`, { headers });
  return response.data;
}

export async function getPlasticPoints(id) {
  const response = await axios.get(`${PRODUCTSGROUP_API}/plasticInfos/singleCustomerPlasticPoints/${id}`, { headers });
  return response.data;
}

export async function editReceivePlastic(id, data) {
  const response = await axios.patch(`${PRODUCTSGROUP_API}/plasticInfos/receivePlasticByEmployee/${id}`, data,{ headers });
  return response.data;
}

export async function getLeaderCustomerByPlasticPoints() {
  const response = await axios.get(`${PRODUCTSGROUP_API}/plasticInfos/leaderCustomerByPlasticPoints`,{ headers });
  return response.data;
}

export async function getRewardInfos(id) {
  const response = await axios.get(`${PRODUCTSGROUP_API}/plasticInfos/singleCustomerRewardHistory/${id}`, { headers });
  return response.data;
}

export async function addItem(id, data) {
  const response = await axios.post(`${ORDERS_API}/createsOrderFromAdmin/${id}`,data,{ headers });
  return response.data;
}

export async function getSingleCustomerAddresses(id) {
  const response = await axios.get(`${ADDRESS_API}/addresses/getSingleCustomerAddresses/${id}`, { headers });
  return response.data;
}

export async function editCustomerProfile(id, data) {
  const response = await axios.patch(`${CUSTOMERS_API}/editCustomerProfileByAdmin/${id}`, data,{ headers });
  return response.data;
}


export async function applyPromoCode (promo,id){
  const response = await axios.get(`https://backend-test.bazar365.com/api/promo/promoCodes/getPromoCodeByPromoCodeForAdmin/${promo}/${id}`,{ headers });
  return response.data;
}

export async function addCustomer(data) {
  const response = await axios.post(`${CUSTOMERS_API}/registerCustomerByBazar`, data, {headers})
  return response.data
}

export async function editOrderStatusPendingToProcessing(id, data) {
  const response = await axios.patch(`${ORDERS_STATUS_API}/pendingToprocessing/${id}`, data,{ headers });
  return response.data;
}

export async function editOrderStatusProcessingToReadyForDelivery(id, data) {
  const response = await axios.patch(`${ORDERS_STATUS_API}/processingToReadyForDelivery/${id}`, data,{ headers });
  return response.data;
}

export async function editOrderStatusReadyForDeliveryToDelivered(id, data) {
  const response = await axios.patch(`${ORDERS_STATUS_API}/readyForDeliveryToDelivered/${id}`, data,{ headers });
  return response.data;
}

export async function editOrderStatusCanceled(id, data) {
  const response = await axios.patch(`${ORDERS_STATUS_API}/canceledOrder/${id}`, data,{ headers });
  return response.data;
}

export async function editCustomerGroup(id, data) {
  const response = await axios.patch(`${CUSTOMERS_API}/customerGroupChange/${id}`, data,{ headers });
  return response.data;
}