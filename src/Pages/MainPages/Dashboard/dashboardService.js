import axios from "axios";

import { DASHBOARD_API } from "../../../Utils/Api";

import { getToken } from "../../../Utils/auth";

const token = getToken()
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  // 'Content-Type': 'multipart/form-data',
};

export async function getItems() {
  const response = await axios.get(`${DASHBOARD_API}`,{ headers });
  return response.data;
}

export async function getTodayesReport() {
  const response = await axios.get(`${DASHBOARD_API}/todaysReport`,{ headers });
  return response.data;
}

export async function getTodaysOrder() {
  const response = await axios.get(`${DASHBOARD_API}/todaysOrder`,{ headers });
  return response.data;
}

export async function getTrendingProducts() {
  const response = await axios.get(`${DASHBOARD_API}/getTrendingProductsForAdmin`,{ headers });
  return response.data;
}
