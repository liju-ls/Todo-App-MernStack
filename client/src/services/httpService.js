import axios from "axios";

const http = axios.create({
  baseURL: "https://todo-app-mern-stack-eight.vercel.app/",
});

export default http;
