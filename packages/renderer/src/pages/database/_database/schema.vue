<template>
  <div class="p-3 bg-white">
    <h1>Database</h1>
    <hr />

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Entity name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="col in tables" :key="col.name">
          <td>
            <router-link
              :to="{
                name: 'db-table',
                params: {
                  id: $route.params.id,
                  schema: $route.params.schema,
                  table: col.name,
                },
              }"
            >
              {{ col.name }}
            </router-link>
          </td>
          <td>{{ col.entityName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data: () => ({
    tables: [] as { name: string; entityName: string }[],
  }),
  async created() {
    const { id, schema } = this.$route.params;
    const { data } = await axios.get(
      `portofino-upstairs/database/tables/${id}/${schema}`
    );
    console.log(data);
    this.tables = data;
  },
});
</script>
