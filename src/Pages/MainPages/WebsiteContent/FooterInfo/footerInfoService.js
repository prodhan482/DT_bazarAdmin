import axios from 'axios';
import { GENERALSETTINGS_API } from "../../../../Utils/Api";
import { getToken } from '../../../../Utils/auth';

const token = getToken()
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'multipart/form-data',

};

export async function getItems() {
  const response = await axios.get(`${GENERALSETTINGS_API}/footerInfos`)
  return response.data
}

export async function addItem(formData) {
  const formDataObj = new FormData();
  formDataObj.append('logo', formData.logo);
  formDataObj.append('description', formData.description);
  formDataObj.append('address', formData.address);
  formDataObj.append('mobile', formData.mobile);
  formDataObj.append('email', formData.email);
  const response = await axios.post(`${GENERALSETTINGS_API}/footerInfos`, formDataObj, { headers })
  return response.data
}
export async function editItem(id, data) {
  const formDataObj = new FormData();

  if (data.logo) {
    formDataObj.append('logo', data.logo);
  }

  formDataObj.append('description', data.description);
  formDataObj.append('address', data.address);
  formDataObj.append('mobile', data.mobile);
  formDataObj.append('email', data.email);

  const response = await axios.patch(`${GENERALSETTINGS_API}/footerInfos/${id}`, formDataObj, { headers });

  return response.data;
}
export async function deleteItem(id) {
  const response = await axios.delete(`${GENERALSETTINGS_API}/footerInfos/${id}`, { headers })
  return response.data
}
