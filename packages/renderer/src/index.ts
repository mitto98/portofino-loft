import { createApp } from "vue";
import App from "~/App.vue";
import router from "/@/router";
import axios from "axios";
import { createPinia } from "pinia";

axios.defaults.baseURL =
  localStorage.getItem("baseUrl") || "http://localhost:8080/api/";

const jwt = localStorage.getItem("jwt");
if (jwt) axios.defaults.headers.Authorization = jwt;

createApp(App).use(router).use(createPinia()).mount("#app");
