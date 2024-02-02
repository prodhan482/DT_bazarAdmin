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
  const response = await axios.get(`${GENERALSETTINGS_API}/articles`)
  return response.data
}

export async function addItem(formData) {
  const formDataObj = new FormData();
  formDataObj.append('image', formData.image);
  formDataObj.append('title', formData.title);
  formDataObj.append('description', formData.description);
  const response = await axios.post(`${GENERALSETTINGS_API}/articles`, formDataObj, { headers })
  return response.data
}
export async function editItem(id, data) {
  const formDataObj = new FormData();

  if (data.image) {
    formDataObj.append('image', data.image);
  }

  formDataObj.append('title', data.title);
  formDataObj.append('description', data.description);

  const response = await axios.patch(`${GENERALSETTINGS_API}/articles/${id}`, formDataObj, { headers });

  return response.data;
}
export async function deleteItem(id) {
  const response = await axios.delete(`${GENERALSETTINGS_API}/articles/${id}`, { headers })
  return response.data
}
