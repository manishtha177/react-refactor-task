import { OptionType } from "../interfaces/fetch";
import { BASE_URL } from "./constants";

export const fetchApi = async (url: string, options?: OptionType) => {
  let result;
  try {
    const resp = await fetch(`${BASE_URL}/${url}`, options);
    const data = await resp?.json();
    result = data;
  } catch (error) {
    console.log("error : ", error);
    result = error;
  }
  return result;
};
