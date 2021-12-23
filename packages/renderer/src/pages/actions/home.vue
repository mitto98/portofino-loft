<template>
  <router-link
    :to="{
      name: 'actions-create',
      params: { action: $route.params.action },
    }"
    class="btn btn-primary"
  >
    Crea child action
  </router-link>
  <h2>Crud configuration</h2>
  <div class="row">
    <Field name="name" label="Name" v-model="config.name" />
    <Field
      name="searchTitle"
      label="Search title"
      class="col-3"
      v-model="config.searchTitle"
    />
    <Field
      name="createTitle"
      label="Create title"
      class="col-3"
      v-model="config.createTitle"
    />
    <Field
      name="readTitle"
      label="Read title"
      class="col-3"
      v-model="config.readTitle"
    />
    <Field
      name="editTitle"
      label="Edit title"
      class="col-3"
      v-model="config.editTitle"
    />
  </div>

  <h2>Database</h2>
  <div class="row">
    <Field
      name="database"
      label="Database"
      class="col-6"
      v-model="config.database"
    />
    <Field
      name="variable"
      label="Variable"
      class="col-6"
      v-model="config.variable"
    />
    <Field
      name="query"
      label="Query"
      class="col-12"
      type="textarea"
      v-model="config.query"
    />
  </div>
  <hr />
  <pre>{{ config }}</pre>
  <hr />
  <pre>{{ action }}</pre>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { getActionUpstairUrl } from "/@/lib/utils";
import Field from "/@/components/Field.vue";

export default defineComponent({
  components: { Field },
  props: ["action"],
  data: () => ({
    config: {} as any,
  }),
  created() {
    this.loadConfig();
  },
  methods: {
    async loadConfig() {
      const { data } = await axios.get(
        getActionUpstairUrl(this.$route.params.action, "action/:configuration")
      );
      this.config = data;
    },
  },
});
</script>
