// import axios from "axios";
// import { PRODUCTSGROUP_API } from "../../../../Utils/Api"
// import { getToken } from "../../../../Utils/auth";

// const token = getToken()
// const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'multipart/form-data',
//   };
  
// export async function getItems() {
//   const response = await axios.get(`${PRODUCTSGROUP_API}/products/getAllProductsForAdmin`);
//   return response.data;
// }

// export async function getPaginatedItems(page, limit) {
//   const response = await axios.get(`${PRODUCTSGROUP_API}/products/getAllProducts/${page}/${limit}`);
//   return response.data;
// }
  
// export async function addItem(formData) {
//   const formDataObj = new FormData();
//   formDataObj.append("image", formData.image);
//   formDataObj.append("name", formData.name);
//   formDataObj.append("sku", formData.sku);
//   formDataObj.append("price", formData.price);
//   formDataObj.append("quantity", formData.qty);
//   formDataObj.append("productWeight", formData.productWeight);
//   formDataObj.append("precedence", formData.precedence);
//   // formDataObj.append("brand", formData.brand);

//   // if (formData.precedence !== null && formData.precedence !== undefined) {
//   //   formDataObj.append("precedence", formData.precedence);
//   // }

//   if (formData.brand !== null) {
//     formDataObj.append("brand", formData.brand);
//   }

//   if (formData.subcategory !== null) {
//     formDataObj.append("subcategory", formData.subcategory);
//   }

//   // formDataObj.append("employee", formData.employee);
//   formDataObj.append("category", formData.category);
//   // formDataObj.append("subcategory", formData.subcategory);
//   // formDataObj.append("subsubcategory", formData.subsubcategory);
//   formDataObj.append("shortDescription", formData.shortDescription);
//   formDataObj.append("description", formData.description);
//   formDataObj.append("isVisible", formData.isVisible);
//   formDataObj.append("isBogo", formData.isBogo);
//   formDataObj.append("isPlastic", formData.isPlastic);
//   // formDataObj.append("plasticType", formData.plasticType);
//   // formDataObj.append("plasticWeight", formData.plasticWeight);

//   if (formData.isPlastic) {
//     formDataObj.append("plasticType", formData.plasticType);
//     formDataObj.append("weight", formData.weight);
//   }

//   // if (formData.isPlastic) {
//   //   formDataObj.append("plasticWeight", formData.plasticWeight);
//   // }
  
//   formDataObj.append("isDiscount", formData.isDiscount);
//   // formDataObj.append("discountType", formData.discountType);
//   // formDataObj.append("discountAmount", formData.discountAmount);
//   if (formData.isDiscount) {
//     formDataObj.append("discountType", formData.discountType);
//     formDataObj.append("discountAmount", formData.discountAmount);
//   }

  
//   const response = await axios.post(`${PRODUCTSGROUP_API}/products`, formDataObj, {
//     headers,
//   });

//   return response.data;
// }

// export async function editItem(id, formData) {
//   const formDataObj = new FormData();
//   if (formData.image) {
//     formDataObj.append('image', formData.image);
//   }
//   formDataObj.append("name", formData.name);
//   formDataObj.append("sku", formData.sku);
//   formDataObj.append("price", formData.price);
//   formDataObj.append("quantity", formData.qty);
//   formDataObj.append("productWeight", formData.productWeight);
//   formDataObj.append("precedence", formData.precedence);
//   // formDataObj.append("brand", formData.brand);

//   // if (formData.precedence !== null && formData.precedence !== undefined) {
//   //   formDataObj.append("precedence", formData.precedence);
//   // }

//   if (formData.brand !== null) {
//     formDataObj.append("brand", formData.brand);
//   }

//   if (formData.subcategory !== null) {
//     formDataObj.append("subcategory", formData.subcategory);
//   }

//   // formDataObj.append("employee", formData.employee);
//   formDataObj.append("category", formData.category);
//   // formDataObj.append("subcategory", formData.subcategory);
//   // formDataObj.append("subsubcategory", formData.subsubcategory);
//   formDataObj.append("shortDescription", formData.shortDescription);
//   formDataObj.append("description", formData.description);
//   formDataObj.append("isVisible", formData.isVisible);
//   formDataObj.append("isBogo", formData.isBogo);
//   formDataObj.append("isPlastic", formData.isPlastic);
//   // formDataObj.append("plasticType", formData.plasticType);
//   // formDataObj.append("plasticWeight", formData.plasticWeight);

//   if (formData.isPlastic == true) {
//     formDataObj.append("plasticType", formData.plasticType);
//     formDataObj.append("weight", formData.weight);
//   }

//   // if (formData.isPlastic) {
//   //   formDataObj.append("plasticWeight", formData.plasticWeight);
//   // }
  
//   formDataObj.append("isDiscount", formData.isDiscount);
//   // formDataObj.append("discountType", formData.discountType);
//   // formDataObj.append("discountAmount", formData.discountAmount);
//   if (formData.isDiscount  == true) {
//     formDataObj.append("discountType", formData.discountType);
//     formDataObj.append("discountAmount", formData.discountAmount);
//     formDataObj.append("discountedAmount", formData.discountedAmount);
//   }
//   const response = await axios.patch(`${PRODUCTSGROUP_API}/products/${id}`, formDataObj,{ headers });
//   return response.data;
// }

// export async function deleteItem(id) {
//   const response = await axios.delete(`${PRODUCTSGROUP_API}/products/${id}`,{ headers });
//   return response.data;
// }

// export async function getSingleItems(id) {
//   const response = await axios.get(`${PRODUCTSGROUP_API}/products/getSingleProduct/${id}`);
//   return response.data;
// }
// export async function getAllItems(page, limit) {
//   const response = await axios.get(`${PRODUCTSGROUP_API}/products/getAllProducts/${page}/${limit}`,{ headers });
//   return response.data;
// }



import axios from "axios";
import { PRODUCTSGROUP_API } from "../../../../Utils/Api"
import { getToken } from "../../../../Utils/auth";

const token = getToken()
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };
  
export async function getItems() {
  const response = await axios.get(`${PRODUCTSGROUP_API}/products/getAllProductsForAdmin`);
  return response.data;
}

export async function getPaginatedItems(page, limit) {
  const response = await axios.get(`${PRODUCTSGROUP_API}/products/getAllProductsWithPaginationForAdmin/${page}/${limit}`);
  return response.data;
}
  
export async function addItem(formData) {
  const formDataObj = new FormData();
  formDataObj.append("image", formData.image);
  formDataObj.append("name", formData.name);
  formDataObj.append("sku", formData.sku);
  formDataObj.append("price", formData.price);
  formDataObj.append("quantity", formData.qty);
  formDataObj.append("productWeight", formData.productWeight);
  formDataObj.append("precedence", formData.precedence);
  // formDataObj.append("brand", formData.brand);

  // if (formData.precedence !== null && formData.precedence !== undefined) {
  //   formDataObj.append("precedence", formData.precedence);
  // }

  if (formData.brand !== null) {
    formDataObj.append("brand", formData.brand);
  }

  if (formData.subcategory !== null) {
    formDataObj.append("subcategory", formData.subcategory);
  }

  // formDataObj.append("employee", formData.employee);
  formDataObj.append("category", formData.category);
  // formDataObj.append("subcategory", formData.subcategory);
  // formDataObj.append("subsubcategory", formData.subsubcategory);
  formDataObj.append("shortDescription", formData.shortDescription);
  formDataObj.append("description", formData.description);
  formDataObj.append("isVisible", formData.isVisible);
  formDataObj.append("isBogo", formData.isBogo);
  formDataObj.append("isPlastic", formData.isPlastic);
  // formDataObj.append("plasticType", formData.plasticType);
  // formDataObj.append("plasticWeight", formData.plasticWeight);

  if (formData.isPlastic) {
    formDataObj.append("plasticType", formData.plasticType);
    formDataObj.append("weight", formData.weight);
  }

  // if (formData.isPlastic) {
  //   formDataObj.append("plasticWeight", formData.plasticWeight);
  // }
  
  formDataObj.append("isDiscount", formData.isDiscount);
  // formDataObj.append("discountType", formData.discountType);
  // formDataObj.append("discountAmount", formData.discountAmount);
  if (formData.isDiscount) {
    formDataObj.append("discountType", formData.discountType);
    formDataObj.append("discountAmount", formData.discountAmount);
  }

  
  const response = await axios.post(`${PRODUCTSGROUP_API}/products`, formDataObj, {
    headers,
  });

  return response.data;
}

export async function editItem(id, formData) {
  const formDataObj = new FormData();
  if (formData.image) {
    formDataObj.append('image', formData.image);
  }
  formDataObj.append("name", formData.name);
  formDataObj.append("sku", formData.sku);
  formDataObj.append("price", formData.price);
  formDataObj.append("quantity", formData.qty);
  formDataObj.append("productWeight", formData.productWeight);
  formDataObj.append("precedence", formData.precedence);
  // formDataObj.append("brand", formData.brand);

  // if (formData.precedence !== null && formData.precedence !== undefined) {
  //   formDataObj.append("precedence", formData.precedence);
  // }

  if (formData.brand !== null) {
    formDataObj.append("brand", formData.brand);
  }

  if (formData.subcategory !== null) {
    formDataObj.append("subcategory", formData.subcategory);
  }

  // formDataObj.append("employee", formData.employee);
  formDataObj.append("category", formData.category);
  // formDataObj.append("subcategory", formData.subcategory);
  // formDataObj.append("subsubcategory", formData.subsubcategory);
  formDataObj.append("shortDescription", formData.shortDescription);
  formDataObj.append("description", formData.description);
  formDataObj.append("isVisible", formData.isVisible);
  formDataObj.append("isBogo", formData.isBogo);
  formDataObj.append("isPlastic", formData.isPlastic);
  // formDataObj.append("plasticType", formData.plasticType);
  // formDataObj.append("plasticWeight", formData.plasticWeight);

  if (formData.isPlastic == true) {
    formDataObj.append("plasticType", formData.plasticType);
    formDataObj.append("weight", formData.weight);
  }

  // if (formData.isPlastic) {
  //   formDataObj.append("plasticWeight", formData.plasticWeight);
  // }
  
  formDataObj.append("isDiscount", formData.isDiscount);
  // formDataObj.append("discountType", formData.discountType);
  // formDataObj.append("discountAmount", formData.discountAmount);
  if (formData.isDiscount  == true) {
    formDataObj.append("discountType", formData.discountType);
    formDataObj.append("discountAmount", formData.discountAmount);
  }
  const response = await axios.patch(`${PRODUCTSGROUP_API}/products/${id}`, formDataObj,{ headers });
  return response.data;
}

export async function deleteItem(id) {
  const response = await axios.delete(`${PRODUCTSGROUP_API}/products/${id}`,{ headers });
  return response.data;
}

export async function getSingleItems(id) {
  const response = await axios.get(`${PRODUCTSGROUP_API}/products/getSingleProduct/${id}`);
  return response.data;
}
export async function getAllItems(page, limit) {
  const response = await axios.get(`${PRODUCTSGROUP_API}/products/getAllProducts/${page}/${limit}`,{ headers });
  return response.data;
}

export async function searchProducts(search) {
  const response = await axios.get(`${PRODUCTSGROUP_API}/products/searchProduct?search=${search}`,{ headers });
  return response.data;
}
