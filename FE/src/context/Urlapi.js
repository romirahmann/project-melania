/* eslint-disable no-unused-vars */
import { createContext } from "react";

const hostname = window.location.hostname;
let dynamicBaseAPI = "";
let dynamicBaseURL = "";

if (hostname.startsWith("192.168.9.")) {
  dynamicBaseAPI = "http://192.168.9.192:3003/api";
  dynamicBaseURL = "http://192.168.9.192:3003";
} else if (hostname.startsWith("192.168.10.")) {
  dynamicBaseAPI = "http://192.168.10.192:3003/api";
  dynamicBaseURL = "http://192.168.10.192:3003";
} else if (hostname === "localhost" || hostname === "127.0.0.1") {
  dynamicBaseAPI = "http://localhost:3003/api";
  dynamicBaseURL = "http://localhost:3003";
} else {
  dynamicBaseAPI = "http://192.168.10.192:3003/api";
}

export const ApiUrl = createContext(dynamicBaseAPI);

export const UrlBaseBackend = createContext(dynamicBaseURL);
export const api = dynamicBaseAPI;
export const baseUrl = dynamicBaseURL;
