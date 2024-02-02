import axios from "axios"
import { PRODUCTSGROUP_API } from "../../../../Utils/Api"
import { getToken } from '../../../../Utils/auth';

const token = getToken()
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'multipart/form-data',
};

export async function getItems() {
  const response = await axios.get(`${PRODUCTSGROUP_API}/quickAds`, { headers })
  return response.data
}
export async function addItem(data) {
  const response = await axios.post(`${PRODUCTSGROUP_API}/quickAds`, data, { headers })
  return response.data
}

export async function editItem(id, data) {
  const response = await axios.patch(`${PRODUCTSGROUP_API}/quickAds/${id}`, data, { headers })
  return response.data
}

export async function deleteItem(id) {
  const response = await axios.delete(`${PRODUCTSGROUP_API}/quickAds/${id}`, { headers })
  return response.data
}