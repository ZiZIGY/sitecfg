import { FetchAPICallbacks, FetchAPIOptions } from "../types";
import { useEffect, useState } from "react";

// callback?: (result?: unknown, loading?: boolean) => void
export const useFetchAPI = <T>(
  path: string,
  options?: FetchAPIOptions,
  callbacks?: FetchAPICallbacks
) => {
  const [data, setData] = useState<unknown>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const request = async () => {
      callbacks?.begin?.();

      try {
        const response: Response = await fetch(path, options);
        const result: T = await response.json();

        setData(result);

        callbacks?.complete?.(result, loading);
      } catch (error: unknown) {
        callbacks?.error?.(error);
      } finally {
        callbacks?.final?.(loading);
        setLoading(false);
      }
    };

    request();
  }, []);

  return { data, loading };
};
