import axios from "axios";

export const dotnetApi = axios.create({
  baseURL: "https://localhost:7117/api", 
});
 
export const expressApi = axios.create({
  baseURL: "http://localhost:5000",
});

export const getCategoriesWithProducts = () => dotnetApi.get("/categories");

export async function postOrder(payload) {
  const res = await expressApi.post("/api/orders", payload);
  return res;
}