export interface FetchAPIOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  cors?: "no-cors" | "cors" | "same-origin";
  cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached";
  body?: string | FormData;
  headers?: { [key: string]: string };
}

export type FetchAPICallback = <T>(
  result?: T,
  loading?: boolean
) => void | unknown;

export interface FetchAPICallbacks {
  begin?: VoidFunction;
  complete?: FetchAPICallback;
  final?: FetchAPICallback;
  error?: (error: unknown) => void;
}
