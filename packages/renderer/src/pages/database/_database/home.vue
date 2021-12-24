<template>
  <div class="px-3 py-2 bg-white">
    <h1>Database</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/database">Database</router-link>
        </li>
        <li class="breadcrumb-item active">
          {{ $route.params.id }}
        </li>
      </ol>
    </nav>
    <div v-if="connection" class="row">
      <div class="col-4">
        <dl style="word-break: break-word">
          <dt>Name</dt>
          <dd>{{ connection.databaseName.value }}</dd>
          <dt>Driver</dt>
          <dd>{{ connection.driver.value }}</dd>
          <dt>Connection URL</dt>
          <dd>{{ connection.url.value }}</dd>
          <dt>Username</dt>
          <dd>{{ connection.username.value }}</dd>
          <dt>Entity mode</dt>
          <dd>{{ connection.entityMode.value }}</dd>
        </dl>
      </div>
      <div class="col-8">
        <h2>Schemas</h2>
        <table class="table">
          <thead>
            <th scope="col"></th>
            <th scope="col">Schema</th>
            <th scope="col">Name</th>
          </thead>
          <tbody>
            <tr v-for="schema in connection.schemas" :key="schema.schema">
              <td style="width: 50px">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :checked="schema.selected"
                  @change="schema.selected = !schema.selected"
                />
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'db-schema',
                    params: { id: $route.params.id, schema: schema.schema },
                  }"
                >
                  {{ schema.schema }}
                </router-link>
              </td>
              <td>{{ schema.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" @click="updateConnection">
          Save changes
        </button>
        &nbsp;
        <button class="btn btn-danger" @click="deleteConnection">Delete</button>
        &nbsp;
        <button class="btn btn-secondary" @click="synchronize">Sync DB</button>
        &nbsp;
        <button class="btn btn-secondary" @click="testConnection">
          Test connection
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Field from "../../../components/Field.vue";
import { DbConnection } from "types/database/DbConnection";

export default defineComponent({
  name: "DatabaseDetail",
  components: { Field },
  data: () => ({
    connection: null as DbConnection | null,
  }),
  async created() {
    const { data } = await axios.get(
      `portofino-upstairs/database/connections/${this.$route.params.id}`
    );
    this.connection = data;
  },

  methods: {
    async testConnection() {
      const db = this.$route.params.id;
      const { data } = await axios.post(
        `portofino-upstairs/database/connections/${db}/:test`,
        {}
      );
      window.alert(`Database ${db} status: ${data[0] || ""} ${data[1] || ""}`);
    },
    async synchronize() {
      const db = this.$route.params.id;
      try {
        await axios.post(
          `portofino-upstairs/database/connections/${db}/:synchronize`,
          {}
        );
        window.alert(`Database ${db} synchronized`);
      } catch (e) {
        window.alert("Sync failed");
      }
    },
    async deleteConnection() {
      const db = this.$route.params.id;
      if (window.confirm(`Delete ${db} connection?`)) {
        await axios.delete(`portofino-upstairs/database/connections/${db}`);
        this.$router.push({ name: "database" });
      }
    },
    async updateConnection() {
      const db = this.$route.params.id;
      const { data } = await axios.put(
        `portofino-upstairs/database/connections/${db}`,
        this.connection
      );

      this.connection = data;
    },
  },
});
</script>
