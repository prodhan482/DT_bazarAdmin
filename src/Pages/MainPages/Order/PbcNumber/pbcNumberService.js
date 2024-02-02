import axios from 'axios';

import { PBCNUMBERS_API } from "../../../../Utils/Api";

import { getToken } from '../../../../Utils/auth';

const token = getToken()
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  // 'Content-Type': 'multipart/form-data',

};

export async function getItem() {
  const response = await axios.get(`${PBCNUMBERS_API}`, { headers })
  return response.data
}

export async function addItem(data) {
  const response = await axios.post(`${PBCNUMBERS_API}`,data, { headers })
  return response.data
}
export async function editItem(id, data) {
  const response = await axios.patch(`${PBCNUMBERS_API}/${id}`, data, { headers });
  return response.data;
}
export async function deleteItem(id) {
  const response = await axios.delete(`${PBCNUMBERS_API}/${id}`, { headers })
  return response.data
}
export async function getSingleItems(id) {
  const response = await axios.get(`${PBCNUMBERS_API}/getSinglePbcNumber/${id}`, { headers });
  return response.data;
}
