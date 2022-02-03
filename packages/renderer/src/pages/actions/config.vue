<template>
  <form v-if="config" class="p-3 bg-white" @submit.prevent="updateConfig">
    <h2>Configurazione</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Enabled</th>
          <th scope="col">Name</th>
          <th scope="col">Label</th>
          <th scope="col">In summary</th>
          <th scope="col">Insertable</th>
          <th scope="col">Updatable</th>
          <th scope="col">Searchable</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="property in config.properties">
          <td>
            <input
              class="form-check-input"
              type="checkbox"
              :checked="property.enabled"
              @change="property.enabled = !property.enabled"
            />
          </td>
          <td>{{ property.name }}</td>
          <td>
            <Field :name="`prop-${property.name}`" v-model="property.label" />
          </td>
          <td>
            <input
              class="form-check-input"
              type="checkbox"
              :checked="property.inSummary"
              @change="property.inSummary = !property.inSummary"
            />
          </td>
          <td>
            <input
              class="form-check-input"
              type="checkbox"
              :checked="property.insertable"
              @change="property.insertable = !property.insertable"
            />
          </td>
          <td>
            <input
              class="form-check-input"
              type="checkbox"
              :checked="property.updatable"
              @change="property.updatable = !property.updatable"
            />
          </td>
          <td>
            <input
              class="form-check-input"
              type="checkbox"
              :checked="property.searchable"
              @change="property.searchable = !property.searchable"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <button type="submit" class="btn btn-primary">Salva le modifiche</button>
  </form>

  <div class="p-3 bg-white">
    <hr />
    <h3>Missing props</h3>
    <pre>{{ missingProps }}</pre>
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
import { mapActions } from "pinia";
import { useActionStore } from "/@/stores/actions";
import { differenceBy } from "lodash";

export default defineComponent({
  components: { Field },
  props: ["action"],
  data: () => ({
    config: null as any,
    missingProps: [] as any[],
  }),
  async created() {
    await this.loadConfig();
  },
  watch: {
    action() {
      this.loadConfig();
    },
  },
  methods: {
    ...mapActions(useActionStore, ["updateActionConfig"]),
    async loadConfig() {
      try {
        const url = getActionUpstairUrl(this.$route.params.action, "action");
        const [{ data: config }, { data: classAccessor }] = await Promise.all([
          axios.get(`${url}/:configuration`),
          axios.get(`${url}/:classAccessor`),
        ]);
        config.properties = config.properties.map((p: any) => p.property);

        const missingProps = differenceBy<any>(
          classAccessor.properties,
          config.properties,
          "name"
        );
        console.log(missingProps);

        config.properties.push(...missingProps.map((p) => ({ name: p.name })));

        this.config = config;
        this.missingProps = missingProps;
      } catch (e) {
        this.config = null;
      }
    },
    async updateConfig() {
      const { action } = this.$route.params;
      await this.updateActionConfig(action, this.config);
      await this.loadConfig();
    },
  },
});
</script>
