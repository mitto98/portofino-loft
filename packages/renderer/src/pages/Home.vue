<template></template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "HelloWorld",
  setup() {
    const count = ref(0);

    const rawString = ref("Hello World");
    const hashedString = computed(() =>
      window.nodeCrypto.sha256sum(rawString.value)
    );

    return { count, rawString, hashedString };
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
