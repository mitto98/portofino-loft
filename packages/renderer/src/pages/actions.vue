<template>
  <div v-if="!isLoading" class="row">
    <div class="col-12">
      <h1>Actions</h1>
      <nav>
        <ol class="breadcrumb">
          <li
            class="breadcrumb-item"
            :class="{ active: selectedAction === '' }"
          >
            <router-link to="/actions">RootAction</router-link>
          </li>
          <li v-if="$route.params.action" class="breadcrumb-item active">
            <router-link :to="`/actions/${$route.params.action}`">
              {{ $route.params.action }}
            </router-link>
          </li>
        </ol>
      </nav>
    </div>
    <div class="col-sm-4 col-md-3">
      <ActionList :actions="action.children" />
    </div>
    <div class="col-sm-8 col-md-9">
      <ul class="nav nav-tabs nav-fill">
        <li class="nav-item">
          <router-link
            :to="{
              name: 'actions-home',
              params: { action: $route.params.action },
            }"
            class="nav-link"
            exact-active-class="active"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{
              name: 'actions-config',
              params: { action: $route.params.action },
            }"
            class="nav-link"
            active-class="active"
          >
            Configuration
          </router-link>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" href="#">Roles</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Childs</a>
        </li> -->
        <li class="nav-item">
          <router-link
            :to="{
              name: 'actions-create',
              params: { action: $route.params.action },
            }"
            class="nav-link"
            active-class="active"
          >
            Create child action
          </router-link>
        </li>
      </ul>

      <router-view
        v-if="!errors[selectedAction]"
        :action="actions[selectedAction]"
      />
      <div
        v-else
        v-html="errors[selectedAction].response.data"
        class="p-3 bg-white border-bottom"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { isArray } from "lodash";
import ActionList from "../components/actions/ActionList.vue";
import { useActionStore } from "../stores/actions";

export default defineComponent({
  name: "App",
  data: () => ({
    isLoading: true,
  }),
  components: { ActionList },
  async mounted() {
    await this.loadAction();
    await this.loadChilds();
    this.isLoading = false;
  },
  watch: {
    action: "loadChilds",
  },
  computed: {
    ...mapState(useActionStore, ["actions", "errors"]),
    selectedAction() {
      let { action } = this.$route.params;
      if (isArray(action)) action = action.join("/");
      return action || "";
    },
    action() {
      return this.actions[this.selectedAction];
    },
  },
  methods: {
    ...mapActions(useActionStore, ["loadAction"]),
    async loadChilds() {
      await Promise.all(
        this.actions[""].children.map((child: string) => this.loadAction(child))
        // this.action.children.map((child: string) => this.loadAction(child))
      );
    },
  },
});
</script>
