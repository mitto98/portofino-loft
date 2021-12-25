<template>
  <button
    :class="`btn btn-${variant || 'secondary'} mr-1`"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="visually-hidden">loading</span>
    <span
      v-if="loading"
      class="spinner-border spinner-border-sm mr-2"
      role="status"
      aria-hidden="true"
    />
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    label: { type: String, required: true },
    action: { type: Function },
    disabled: { type: Boolean },

    variant: { type: String, default: "secondary" },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    async handleClick() {
      if (this.action) {
        this.loading = true;
        try {
          await this.action();
        } finally {
          this.loading = false;
        }
      } else {
        this.$emit("click");
      }
    },
  },
});
</script>
