import { useEffect, useState } from "react";
import { fetchApi } from "../utils/fetchApi";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchApi(url);
      setData(result);
    };
    getData();
  }, [url]);

  return [data];
};

export default useFetch;
