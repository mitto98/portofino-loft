<template>
  <div class="row">
    <div class="col-12">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Field from "../components/Field.vue";
import Platform from "types/database/DbPlatform";

export default defineComponent({
  components: { Field },
  data: () => ({
    platforms: {} as Record<string, Platform>,
  }),
  async created() {
    const { data } = await axios.get("portofino-upstairs/database/platforms");
    this.platforms = data;
  },
});
</script>
