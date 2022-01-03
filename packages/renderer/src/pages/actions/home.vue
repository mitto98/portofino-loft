<template>
  <form v-if="config" class="p-3 bg-white" @submit.prevent="updateConfig">
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
        label="Database*"
        class="col-6"
        type="select"
        v-model="config.database"
        :options="
          connections.map((con) => ({ value: con.name, label: con.name }))
        "
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

    <button type="submit" class="btn btn-primary">Salva le modifiche</button>
  </form>
  <div class="p-3 bg-white">
    <hr />
    <h3>Configuration</h3>
    <pre>{{ config }}</pre>
    <hr />
    <h3>Description</h3>
    <pre>{{ action }}</pre>
  </div>
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
    config: null as any,
    connections: [] as any[],
  }),
  async created() {
    const { data } = await axios.get("portofino-upstairs/database/connections");
    this.connections = data;
    await this.loadConfig();
  },
  watch: {
    action() {
      this.loadConfig();
    },
  },
  methods: {
    async loadConfig() {
      try {
        const { data } = await axios.get(
          getActionUpstairUrl(
            this.$route.params.action,
            "action/:configuration"
          )
        );
        this.config = data;
      } catch (e) {
        this.config = null;
      }
    },
    async updateConfig() {
      await axios.put(
        getActionUpstairUrl(this.$route.params.action, "action/:configuration"),
        this.config
      );
      await this.loadConfig();
    },
  },
});
</script>
