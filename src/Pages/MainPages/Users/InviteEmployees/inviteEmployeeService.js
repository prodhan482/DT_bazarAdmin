import axios from "axios";
import { EMPLOYEE_API } from "../../../../Utils/Api";
import { getToken } from "../../../../Utils/auth";

const token = getToken()

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

export async function getItems() {
  const response = await axios.get(`${EMPLOYEE_API}/getAllInvites`, { headers });
  return response.data;
}
export async function sendInvite(data) {
  const response = await axios.post(`${EMPLOYEE_API}/employeeinvite`, data, { headers })
  return {response:response.data, status: response.status}
}
export async function deleteItem(id) {
  const response = await axios.delete(`${EMPLOYEE_API}/deleteInvite/${id}`, { headers })
  return response.data;
}
