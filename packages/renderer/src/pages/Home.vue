<template>
  <div class="p-3 bg-white">
    <h1>Home</h1>
    <Field name="baseUrl" label="Base url" v-model="baseUrl" />
    <Field name="jwt" label="JWT" v-model="jwt" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import axios from "axios";
import Field from "../components/Field.vue";

export default defineComponent({
  name: "HelloWorld",
  components: { Field },
  setup() {
    // const count = ref(0);

    const baseUrl = ref(
      localStorage.getItem("baseUrl") || "http://localhost:8080/api/"
    );
    const jwt = ref(localStorage.getItem("jwt") || "");

    watchEffect(() => {
      axios.defaults.baseURL = baseUrl.value;
      localStorage.setItem("baseUrl", baseUrl.value);
    });

    watchEffect(() => {
      axios.defaults.headers.Authorization = jwt.value;
      localStorage.setItem("jwt", jwt.value);
    });
    // const hashedString = computed(() =>
    //   window.nodeCrypto.sha256sum(rawString.value)
    // );

    return { baseUrl, jwt };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}

fieldset {
  margin: 2rem;
  padding: 1rem;
}
</style>
