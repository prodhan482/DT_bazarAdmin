import axios from "axios";
import { EMPLOYEE_API } from "../../../../Utils/Api";
import { getToken } from "../../../../Utils/auth";
const token = getToken()
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

export async function getItems() {
  const response = await axios.get(`${EMPLOYEE_API}/getAllEmployees`, { headers });
  return response.data;
}

export async function editEmployeeGroupChange(id, data) {
  const response = await axios.patch(`${EMPLOYEE_API}/employeeLevelChange/${id}`, data,{ headers });
  return response.data;
}