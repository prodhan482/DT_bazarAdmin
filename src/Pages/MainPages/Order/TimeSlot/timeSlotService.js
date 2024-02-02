import axios from "axios"
import { DELIVERYGROUP_API } from "../../../../Utils/Api"

import { getToken } from "../../../../Utils/auth";

const token = getToken()
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

export async function getItems() {
  const response = await axios.get(`${DELIVERYGROUP_API}/timeSlots`)
  return response.data
}
export async function addItem(data) {
  const response = await axios.post(`${DELIVERYGROUP_API}/timeSlots`, data, { headers })
  return response.data
}
export async function editItem(id,data) {
    const response = await axios.patch(`${DELIVERYGROUP_API}/timeSlots/${id}`, data, { headers })
    return response.data
}
export async function deleteItem(id) {
    const response = await axios.delete(`${DELIVERYGROUP_API}/timeSlots/${id}`,{ headers });
    return response.data;
}
export async function getSingleItems(id) {
    const response = await axios.get(`${ DELIVERYGROUP_API}/timeSlots/getSingleTimeSlot/${id}`, { headers });
    return response.data;
}
