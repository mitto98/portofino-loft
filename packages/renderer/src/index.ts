import { createApp } from "vue";
import App from "~/App.vue";
import router from "/@/router";
import axios from "axios";

axios.defaults.baseURL =
  localStorage.getItem("baseUrl") || "http://localhost:8080/api/";

axios.defaults.headers.Authorization = localStorage.getItem("jwt");

createApp(App).use(router).mount("#app");
