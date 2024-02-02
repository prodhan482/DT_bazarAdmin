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
  const response = await axios.get(`${GENERALSETTINGS_API}/scrollTexts/getAllScrollTextsForAdmin`, { headers })
  return response.data
}
export async function addItem(data) {
    const response = await axios.post(`${GENERALSETTINGS_API}/scrollTexts`, {name:data}, { headers })
    return response.data
  }


  
export async function deleteItem(id) {
    const response = await axios.delete(`${GENERALSETTINGS_API}/scrollTexts/${id}`, { headers })
    return response.data
  }
  