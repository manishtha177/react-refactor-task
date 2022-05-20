import { IFormData } from "../interfaces/form";
import { fetchApi } from "../utils/fetchApi";

export const addProduct = async (payload: IFormData) => {
  const result = await fetchApi("products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result;
};
