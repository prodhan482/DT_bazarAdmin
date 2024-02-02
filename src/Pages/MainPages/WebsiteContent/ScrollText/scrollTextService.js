import axios from 'axios';

import { GENERALSETTINGS_API } from "../../../../Utils/Api";

import { getToken } from '../../../../Utils/auth';

const token = getToken()
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  // 'Content-Type': 'multipart/form-data',

};

export async function getItem() {
  const response = await axios.get(`${GENERALSETTINGS_API}/scrollTexts`, { headers })
  return response.data
}

export async function addItem(data) {
  const response = await axios.post(`${GENERALSETTINGS_API}/scrollTexts`,data, { headers })
  return response.data
}
export async function editItem(id, data) {
  const response = await axios.patch(`${GENERALSETTINGS_API}/scrollTexts/${id}`, data, { headers });
  return response.data;
}
export async function deleteItem(id) {
  const response = await axios.delete(`${GENERALSETTINGS_API}/scrollTexts/${id}`, { headers })
  return response.data
}
export async function getSingleItems(id) {
  const response = await axios.get(`${GENERALSETTINGS_API}/scrollTexts/getSingleScrollText/${id}`, { headers });
  return response.data;
}

export async function getAlltems() {
    const response = await axios.get(`${GENERALSETTINGS_API}/scrollTexts/getAllScrollTextsForAdmin`, { headers });
    return response.data;
  }
