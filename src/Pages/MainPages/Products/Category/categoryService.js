import axios from 'axios';
import { PRODUCTSGROUP_API } from "../../../../Utils/Api";
import { getToken } from '../../../../Utils/auth';

const token = getToken()
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'multipart/form-data',

};

export async function getItems() {
  const response = await axios.get(`${PRODUCTSGROUP_API}/categories/getAllCategoriesForAdmin` , { headers })
  return response.data
}

export async function addItem(formData) {
  const formDataObj = new FormData();
  formDataObj.append('image', formData.image);
  formDataObj.append('name', formData.name);
  formDataObj.append('precedence', formData.precedence);
  // formDataObj.append('sqlId', formData.sqlId);
  // formDataObj.append('productCount', formData.productCount);
  // formDataObj.append('level', formData.level);
  formDataObj.append('isActive', formData.isActive);
  formDataObj.append("isDiscount", formData.isDiscount);
  // formDataObj.append("discountType", formData.discountType);
  // formDataObj.append("discountAmount", formData.discountAmount);
  if (formData.isDiscount) {
    formDataObj.append("discountType", formData.discountType);
    formDataObj.append("discountAmount", formData.discountAmount);
  }
  const response = await axios.post(`${PRODUCTSGROUP_API}/categories`, formDataObj, { headers });
  return response.data;
}

export async function editItem(id, data) {
  const formDataObj = new FormData();

  if (data.image) {
    formDataObj.append('image', data.image);
  }

  formDataObj.append('name', data.name);
  formDataObj.append('precedence', data.precedence);
  // formDataObj.append('sqlId', data.sqlId);
  // formDataObj.append('productCount', data.productCount);
  // formDataObj.append('level', data.level);
  formDataObj.append('isActive', data.isActive);
  // formDataObj.append("isDiscount", data.isDiscount);
  // formDataObj.append("discountType", formData.discountType);
  // formDataObj.append("discountAmount", formData.discountAmount);
  if (data.isDiscount==true){
    formDataObj.append("isDiscount", data.isDiscount);
    if (formData.isDiscount) {
      formDataObj.append("discountType", data.discountType);
      formDataObj.append("discountAmount", data.discountAmount);
    }
    }

  const response = await axios.patch(`${PRODUCTSGROUP_API}/categories/${id}`, formDataObj, { headers });

  return response.data;
}
export async function deleteItem(id) {
  const response = await axios.delete(`${PRODUCTSGROUP_API}/categories/${id}`, { headers })
  return response.data
}

export async function getSubcategoriesFromCategory(id) {
  const response = await axios.get(`${PRODUCTSGROUP_API}/subcategories/getAllSubcategoriesFromCategory/${id}` , { headers })
  return response.data
}