<template>
  <ul class="list-group">
    <router-link
      v-for="name in actions"
      :to="{ name: 'actions-home', params: { action: name } }"
      activeClass="active"
      class="list-group-item d-flex justify-content-between align-items-start"
    >
      <div class="ms-2 me-auto">
        <div class="fw-bold">{{ name }}</div>
        {{
          descriptions[name] &&
          descriptions[name].superclass.split(".").reverse()[0]
        }}
      </div>
      <span v-if="errors[name]" class="badge bg-danger rounded-pill">
        {{ errors[name].response.status }}
      </span>
    </router-link>
  </ul>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { defineComponent, PropType } from "vue";
import { useActionStore } from "/@/stores/actions";

export default defineComponent({
  name: "ActionList",
  props: {
    actions: {
      required: true,
      type: Array as PropType<Array<string>>,
    },
  },
  computed: {
    ...mapState(useActionStore, {
      descriptions: "actions",
      errors: "errors",
    }),
  },
});
</script>
