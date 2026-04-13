import React, { useEffect, useState } from "react";

export const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    if (!url) {
      setloading(false);
      return;
    }
    const fetchData = async () => {
      try {
        setloading(true);
        seterror(null);
        const res = await fetch(url);
        if (!res.ok) throw new error(`Error: ${res.status}`);

        const json = await res.json();
        setdata(json);
      } catch (error) {
        seterror(error.message);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, [url]);


  return (
    {data, loading, error}
  )
}