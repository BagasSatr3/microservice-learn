import axios from "axios";

export const ProductMicroservice = axios.create({
    baseURL: 'http://localhost:3002/'
  });

export const OrderMicroservice = axios.create({
    baseURL: 'http://localhost:3001/'
  });
