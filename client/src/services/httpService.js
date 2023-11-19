import axios from "axios";

const http = axios.create({
  baseURL: "https://todo-app-server-n5r2.onrender.com/",
});

export default http;
