export const baseUrl = window.location.origin
export const isDev = import.meta.env.MODE === "development"

type APIResponseSuccess<T> = {
  ok: true
  data: T
}

type APIResponseFail = {
  ok: false
  message: string
}

export type APIResponse<T> = Promise<APIResponseSuccess<T> | APIResponseFail>
