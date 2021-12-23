<template>
  <form class="px-3" @submit="createAction">
    <div class="mb-3">
      <label for="actionSegment" class="form-label">Segment</label>
      <div class="input-group mb-3">
        <span class="input-group-text"> {{ $route.params.action }} / </span>
        <input
          type="text"
          class="form-control"
          id="actionSegment"
          v-model.trim="form.segment"
        />
      </div>
    </div>

    <Field
      name="actionType"
      label="Type"
      v-model="form.type"
      :options="actionTypes"
    />

    <button class="btn btn-primary">Crea action</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { getActionUpstairUrl } from "/@/lib/utils";
import Field from "/@/components/Field.vue";

const ActionTypes = [
  {
    value: "com.manydesigns.portofino.resourceactions.crud.CrudAction",
    label: "Crud Action",
  },
  {
    value: "com.manydesigns.portofino.resourceactions.custom.CustomAction",
    label: "Custom Action",
  },
];

interface ActionForm {
  segment: string;
  type: string;
}

const DEFAULT_FORM: Partial<ActionForm> = {
  type: ActionTypes[0].value,
};

export default defineComponent({
  props: ["action"],
  components: { Field },
  data: () => ({
    form: DEFAULT_FORM,
  }),
  computed: {
    actionTypes: () => ActionTypes,
  },
  methods: {
    async createAction() {
      await axios.post(
        getActionUpstairUrl(this.$route.params.action, this.form.segment),
        this.form.type
      );
      this.form = { type: ActionTypes[0].value };
    },
  },
});
</script>
