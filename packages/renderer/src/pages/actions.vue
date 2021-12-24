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
      <ActionList
        :actions="rootAction.children"
        :descriptions="actions"
        :errors="errors"
      />
    </div>
    <div class="col-sm-8 col-md-9">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link
            :to="`/actions/${$route.params.action}`"
            class="nav-link"
            active-class="active"
          >
            Home
          </router-link>
        </li>
        <li>
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
        <li class="nav-item">
          <a class="nav-link" href="#">Roles</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Childs</a>
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
import axios from "axios";
import { isArray } from "lodash";
import { ActionDescription, ActionDescriptionRecord } from "../../types/Action";
import ActionList from "../components/actions/ActionList.vue";

export default defineComponent({
  name: "App",
  data: () => ({
    isLoading: true,
    actions: {} as ActionDescriptionRecord,
    errors: {} as Record<string, any>,
  }),
  components: { ActionList },
  async created() {
    const { data } = await axios.get<ActionDescription>(
      "portofino-upstairs/actions/:description"
    );
    data.children = data.children.sort((a, b) => a.localeCompare(b));
    this.actions[""] = data;

    await Promise.all(
      data.children.map((child: string) => this.loadActionDescription(child))
    );
    this.isLoading = false;
  },
  computed: {
    selectedAction() {
      let action = this.$route.params.action;
      if (isArray(action)) action = action.join("/");
      return action || "";
    },
    action() {
      return this.actions[this.selectedAction];
    },
    rootAction() {
      return this.actions[""];
    },
  },
  methods: {
    async loadActionDescription(action: string) {
      try {
        const { data } = await axios.get<ActionDescription>(
          `portofino-upstairs/actions/${action}/:description`
        );
        this.actions[action] = data;
      } catch (e: any) {
        e.response.data = e.response.data.replace(
          /<style type="text\/css">.+<\/style>/g,
          ""
        );
        this.errors[action] = e;
      }
    },
  },
});
</script>
