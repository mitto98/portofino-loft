<template>
  <div class="px-3 py-2 bg-white">
    <h1>Database</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/database">Database</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="`/database/${$route.params.id}`">
            {{ $route.params.id }}
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            :to="`/database/${$route.params.id}/${$route.params.schema}`"
          >
            {{ $route.params.schema }}
          </router-link>
        </li>
        <li class="breadcrumb-item active">
          {{ $route.params.table }}
        </li>
      </ol>
    </nav>

    <table v-if="tableModel" class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Property name</th>
          <th scope="col">Class</th>
          <th scope="col">Type</th>
          <th scope="col">Length</th>
          <th scope="col">Scale</th>
          <th scope="col">Nullable</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="col in tableModel.columns" :key="col.columnName">
          <td>{{ col.columnName }}</td>
          <td>{{ col.propertyName }}</td>
          <td>{{ col.javaType }}</td>
          <td>{{ col.jdbcType }}</td>
          <td>{{ col.length }}</td>
          <td>{{ col.scale }}</td>
          <td>{{ col.nullable }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { TableModel } from "types/database/model/TebleModel";

export default defineComponent({
  data: () => ({
    tableModel: null as TableModel | null,
  }),
  async created() {
    const { id, schema, table } = this.$route.params;
    const { data } = await axios.get(
      `portofino-upstairs/database/tables/${id}/${schema}/${table}`
    );
    console.log(data);
    this.tableModel = data.table;
  },
});
</script>
