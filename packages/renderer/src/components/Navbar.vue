<template>
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Portofino Attic</a>
    </div>
  </nav>
  <div
    id="sidebar"
    flush
    class="list-group list-group-flush pt-3"
    :class="{ 'nav-visible': expanded }"
  >
    <router-link
      v-for="it in items"
      :key="it.name || it.label"
      :exact="it.exact"
      :to="it.to"
      class="list-group-item text-start rounded"
    >
      <!-- <fa-icon :icon="it.icon" /> -->
      {{ it.label }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteLocationRaw } from "vue-router";

export interface NavItemType {
  name?: string;
  label: string;
  to: RouteLocationRaw;
  exact?: boolean;
  icon: string;
}

export default defineComponent({
  name: "Navbar",
  props: {
    items: {
      type: Array as PropType<NavItemType[]>,
      required: true,
    },
  },
  data: () => ({
    expanded: false,
  }),
  computed: {},
});
</script>

<style scoped lang="scss">
@import "node_modules/bootstrap/scss/functions";
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins";

#sidebar {
  height: calc(100vh - var(--navbar-height));
  width: var(--sidebar-width);
  background-color: var(--color-primary);
  position: fixed;
  z-index: 1030;
  top: var(--navbar-height);
  left: 0;
  padding: 0 8px;

  .list-group-item {
    margin: 0.1rem 0;
    border: 0;
    padding: 0.5rem calc(1.25rem);
    color: white;
    background-color: transparent;

    &:hover,
    &:focus {
      background-color: rgba(0, 0, 0, 0.15);
    }

    &.router-link-active {
      background-color: var(--color-primary-dark);
      font-weight: bold;
    }

    svg {
      margin-right: 5px;
    }
  }
}

.backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
}

.hamburger {
  display: none;
  font-size: 27px;
  cursor: pointer;
}

.nav-visible {
  display: block !important;
  animation: fadeInLeft;
  animation-duration: 0.2s;
}

@include media-breakpoint-down(md) {
  .navbar {
    justify-content: space-between;

    .hamburger {
      display: block;
    }

    .title {
      display: none;
    }

    .navbar-collapse {
      flex-grow: 0;
    }
  }
  #sidebar {
    display: none;
  }
}
</style>
