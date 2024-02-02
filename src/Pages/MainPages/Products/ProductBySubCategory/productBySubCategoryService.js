import axios from 'axios';
import { PRODUCTSGROUP_API } from "../../../../Utils/Api";
import { getToken } from '../../../../Utils/auth';

const token = getToken()
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'multipart/form-data',

};

export async function getProductBySubCategory(id) {
    const response = await axios.get(`${PRODUCTSGROUP_API}/products/productsBySubcategory/${id}` , { headers })
    return response.data
}