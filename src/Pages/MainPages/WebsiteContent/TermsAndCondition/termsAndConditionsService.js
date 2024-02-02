import axios from "axios";
import { GENERALSETTINGS_API } from "../../../../Utils/Api"
import { getToken } from "../../../../Utils/auth";

const token = getToken()
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
};

export async function getItems() {
  const response = await axios.get(`${GENERALSETTINGS_API}/termsAndConditions`);
  return response.data;
}

export async function addItem(data) {
  const response = await axios.post(`${GENERALSETTINGS_API}/termsAndConditions`, data, { headers });
  return response.data;
}

export async function deleteItem(id) {
  const response = await axios.delete(`${GENERALSETTINGS_API}/termsAndConditions/${id}`, { headers });
  return response.data;
}

export async function editItem(id, data) {
  const response = await axios.patch(`${GENERALSETTINGS_API}/termsAndConditions/${id}`, data, { headers });
  return response.data;
}

export async function getSingleItems(id) {
  const response = await axios.get(`${GENERALSETTINGS_API}/termsAndConditions/getSingleTermsAndConditions/${id}`);
  return response.data;
}

