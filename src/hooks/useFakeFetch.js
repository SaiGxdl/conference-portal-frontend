// src/hooks/useFakeFetch.js
import { useEffect, useState } from "react";

/**
 * useFakeFetch - fetches a path (string) and simulates network delay.
 * path should be an absolute path reachable by the browser, e.g. '/data/events.json'
 */
export default function useFakeFetch(path, delay = 600) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNow = async (signal) => {
    setLoading(true);
    try {
      const res = await fetch(path, { signal });
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      // artificial delay
      await new Promise((r) => setTimeout(r, delay));
      setData(json);
      setError(null);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchNow(controller.signal);
    return () => controller.abort();
  }, [path]);

  const refetch = () => {
    const controller = new AbortController();
    fetchNow(controller.signal);
  };

  return { data, loading, error, refetch };
}
