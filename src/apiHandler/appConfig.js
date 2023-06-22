import axios from "axios";
import { API_HOST, API_KEY } from "./endPoints";

function GetApiHandler(url, method) {
  return axios({
    url: url,
    method: method,
    headers: { "X-RapidAPI-Key": API_KEY, "X-RapidAPI-Host": API_HOST },
  })
    .then(function (res) {
      return res;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export { GetApiHandler };
