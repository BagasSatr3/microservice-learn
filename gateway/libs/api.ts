import axios from "axios";

export const ProductMicroservice = axios.create({
    baseURL: 'http://localhost:30022/'
  });

export const OrderMicroservice = axios.create({
    baseURL: 'http://localhost:30011/'
  });
