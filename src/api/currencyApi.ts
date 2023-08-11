import axios from "axios";
import { CurrencyListResponse, CurrencyRatioResponse } from "./apiModels";

const baseAddress = "https://api.getgeoapi.com/v2/currency"
const apiKey = process.env.REACT_APP_API_KEY ?? ""

console.log(process.env)

export const getCurrencyList = () =>
  axios.get<CurrencyListResponse>(`${baseAddress}/list`, { params: { api_key: apiKey } });

export const getCurrencyRatio = (from: string, to: string) =>
  axios.get<CurrencyRatioResponse>(`${baseAddress}/convert`, { params: { api_key: apiKey, from, to } });

export const getHistoricalCurrencyRatio = (from: string, to: string, date: Date) =>
  axios.get<CurrencyRatioResponse>(`${baseAddress}/historical/${date.toISOString().split('T')[0]}`, { params: { api_key: apiKey, from, to } });
