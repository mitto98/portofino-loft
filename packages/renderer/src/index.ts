import { createApp } from "vue";
import App from "~/App.vue";
import router from "/@/router";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/api/";

axios.defaults.headers.Authorization =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJwcmluY2lwYWwiOiJhZG1pbiIsInNlcmlhbGl6ZWQtcHJpbmNpcGFsIjoick8wQUJYUUFCV0ZrYldsdSIsImV4cCI6MTY0MDcxOTM3Nn0.HY0T3CZRJ1ZclsfBFMquXfVhTp6rGQCUMFsnX4zdbkFIZMl6rV12sS5wzEwLqYWo6Ro5uTUFQUCrQLPqQLVjWQ";

createApp(App).use(router).mount("#app");
