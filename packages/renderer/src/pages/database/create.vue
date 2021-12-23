<template>
  <form class="p-3 bg-white" @submit.prevent="createConnection">
    <h1>Database</h1>
    <div class="row">
      <Field
        name="name"
        label="Database name*"
        class="col-12"
        v-model="form.databaseName"
      />
      <Field
        name="driver"
        label="Driver*"
        type="select"
        :options="driverOptions"
        class="col-12"
        v-model="form.driver"
      />
      <Field
        name="url"
        label="Connection url*"
        class="col-12"
        v-model="form.url"
      />
      <Field
        name="username"
        label="Username*"
        class="col-6"
        v-model="form.username"
      />
      <Field
        name="passowrd"
        label="password*"
        class="col-6"
        v-model="form.password"
      />

      <div class="col-12">
        <button class="btn btn-primary">Crea connessione</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Field from "../../components/Field.vue";
import DbPlatform from "types/database/DbPlatform";
import DbConnectionCreate from "types/database/DbConnectionCreate";

const DEFAULT_DRIVER =
  "com.manydesigns.portofino.database.platforms.H2DatabasePlatform";

const DEFAULT_FORM: Partial<DbConnectionCreate> = {
  entityMode: "MAP",
};

export default defineComponent({
  components: { Field },
  data: () => ({
    platforms: {} as Record<string, DbPlatform>,
    form: DEFAULT_FORM,
  }),
  async created() {
    const { data } = await axios.get("portofino-upstairs/database/platforms");
    this.platforms = data;
    this.form.driver = DEFAULT_DRIVER;
    this.form.url = this.platforms[DEFAULT_DRIVER]?.connectionStringTemplate;
  },
  watch: {
    "form.driver": function (val) {
      this.form.url = this.platforms[val]?.connectionStringTemplate;
    },
  },
  computed: {
    driverOptions() {
      return Object.entries(this.platforms).map(([k, v]) => ({
        value: k,
        label: v.description + (k === DEFAULT_DRIVER ? " (Default)" : ""),
      }));
    },
  },
  methods: {
    async createConnection() {
      await axios.post("portofino-upstairs/database/connections", this.form);
      this.form = DEFAULT_FORM;
      this.$router.push({ name: "database" });
    },
  },
});
</script>
