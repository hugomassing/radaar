import axios from "axios";
export const fetcher = url =>
  axios(url, {
    headers: {
      "content-type": "application/json"
    }
  }).then(r => r.json());
