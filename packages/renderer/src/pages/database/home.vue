<template>
  <div class="p-3 bg-white">
    <h1>Database</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item active">Database</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-6">
        <h2>Connections</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="con in connections" :key="con.name">
              <td>
                <router-link
                  :to="{ name: 'database-detail', params: { id: con.name } }"
                  >{{ con.name }}</router-link
                >
              </td>
              <td>{{ con.description }}</td>
              <td>{{ con.status }}</td>
            </tr>
          </tbody>
        </table>
        <router-link class="btn btn-primary" :to="{ name: 'database-create' }">
          New connection
        </router-link>
      </div>
      <div class="col-6">
        <h2>Platforms</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Driver Class</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(plat, name) in platforms" :key="name">
              <td>{{ plat.description }}</td>
              <td>{{ plat.standardDriverClassName }}</td>
              <td>{{ plat.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { DbConnectionSummary } from "../../../types/database/DbConnection";
import DbPlatform from "../../../types/database/DbPlatform";

export default defineComponent({
  data: () => ({
    connections: [] as DbConnectionSummary[],
    platforms: {} as Record<string, DbPlatform>,
  }),
  async created() {
    const [{ data: connections }, { data: platforms }] = await Promise.all([
      axios.get("portofino-upstairs/database/connections"),
      axios.get("portofino-upstairs/database/platforms"),
    ]);
    this.connections = connections;
    this.platforms = platforms;
  },
});
</script>
