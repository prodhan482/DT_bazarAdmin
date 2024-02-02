import axios from "axios"
import { PACKAGEPRODUCT_API } from "../../../../Utils/Api"

import { getToken } from "../../../../Utils/auth";

const token = getToken()
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

export async function getItems() {
  const response = await axios.get(`${PACKAGEPRODUCT_API}`)
  return response.data
}
export async function addItem(data) {
  // const formDataObj = new FormData();
  // formDataObj.append('productSku', formData.productSku);
  // formDataObj.append('promoPackage', formData.promoPackage);

  const response = await axios.post(`${PACKAGEPRODUCT_API}`, data, { headers })
  return response.data

//     const { productSku, promoPackage } = data;
  
//     if (Array.isArray(productSku)) {
//       const promises = productSku.map((sku) => {
//         const itemData = {
//           productSku: sku,
//           promoPackage,
//         };
//         return axios.post(`${PACKAGEPRODUCT_API}`, itemData, { headers });
//       });
  
//       const response = await Promise.all(promises);
//       return response.map((response) => response.data);
// }

}
export async function editItem(id,data) {
    const response = await axios.patch(`${PACKAGEPRODUCT_API}/${id}`, data, { headers })
    return response.data
}
export async function deleteItem(id) {
    const response = await axios.delete(`${PACKAGEPRODUCT_API}/${id}`,{ headers });
    return response.data;
}
export async function getSingleItems(id) {
    const response = await axios.get(`${ PACKAGEPRODUCT_API}/getSinglePackageProduct/${id}`, { headers });
    return response.data;
}


// import axios from "axios";
// import { PACKAGEPRODUCT_API } from "../../../../Utils/Api";
// import { getToken } from "../../../../Utils/auth";

// const token = getToken();
// const headers = {
//   'Content-Type': 'application/json',
//   'Authorization': `Bearer ${token}`,
// };

// export async function getItems() {
//   try {
//     const response = await axios.get(PACKAGEPRODUCT_API, { headers });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     throw error;
//   }
// }

// export async function addItem(data) {
//   const { productSku, promoPackage } = data;

//   try {
//     console.log('Adding item with data:', data);

//     if (Array.isArray(productSku)) {
//       const nonEmptyProductSku = productSku.filter((sku) => Boolean(sku.trim()));
//       if (nonEmptyProductSku.length > 0) {
//         const promises = nonEmptyProductSku.map((sku) => {
//           const itemData = {
//             productSku: parseInt(sku), // Convert to number
//             promoPackage,
//           };
//           return axios.post(PACKAGEPRODUCT_API, itemData, { headers });
//         });

//         const responses = await Promise.all(promises);
//         return responses.map((response) => response.data);
//       } else {
//         throw new Error('Empty or invalid productSku values');
//       }
//     } else {
//       throw new Error('Invalid productSku values');
//     }
//   } catch (error) {
//     console.error('Error adding items:', error);
//     throw error;
//   }
// }



// export async function editItem(id, data) {
//   try {
//     const response = await axios.patch(`${PACKAGEPRODUCT_API}/${id}`, data, { headers });
//     return response.data;
//   } catch (error) {
//     console.error(`Error editing item with id ${id}:`, error);
//     throw error;
//   }
// }

// export async function deleteItem(id) {
//   try {
//     const response = await axios.delete(`${PACKAGEPRODUCT_API}/${id}`, { headers });
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting item with id ${id}:`, error);
//     throw error;
//   }
// }

// export async function getSingleItems(id) {
//   try {
//     const response = await axios.get(`${PACKAGEPRODUCT_API}/getSinglePackageProduct/${id}`, { headers });
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching single item with id ${id}:`, error);
//     throw error;
//   }
// }
