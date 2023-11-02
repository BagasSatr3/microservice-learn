import axios from "axios";

export const ProductMicroservice = axios.create({
    baseURL: 'https://cafe-product.vercel.app/'
  });

export const OrderMicroservice = axios.create({
    baseURL: 'https://cafe-order.vercel.app/'
  });
