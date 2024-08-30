import { request } from 'graphql-request'

export const rest = (url: string) => fetch(url).then((res) => res.json())
export const graphql = ([url, query]: [url: string, query: string]) => request(url, query)
