<template>
  <Navbar :items="pages" />
  <div id="content" class="pt-3">
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppNavigation from "~/components/AppNavigation.vue";
import Navbar, { NavItemType } from "/@/components/Navbar.vue";

const PAGES: NavItemType[] = [
  {
    label: "Dashboard",
    to: "/",
    icon: "calendar2-event",
    exact: true,
  },
  {
    label: "Database",
    to: "/database",
    icon: "calendar2-event",
  },
  {
    label: "Actions",
    to: "/actions",
    icon: "calendar2-event",
  },
];

export default defineComponent({
  name: "App",
  components: {
    AppNavigation,
    Navbar,
  },
  computed: {
    pages: () => PAGES,
  },
});
</script>

<style lang="scss">
$color-primary: #006dab;
$color-primary-light: #60c3e1;
$color-primary-dark: #005090;

:root {
  --navbar-height: 56px;
  --sidebar-width: 220px;

  /** Palette **/
  --background-color: #f8f8f8;

  --color-primary: #{$color-primary};
  --color-primary-contrast: #fff;
  --color-primary-light: #{$color-primary-light};
  --color-primary-dark: #{$color-primary-dark};
}
$primary: $color-primary;

// $border-radius: 0;
// $border-radius-lg: $border-radius;
// $border-radius-sm: $border-radius;

@import "node_modules/bootstrap/scss/bootstrap";

body {
  background-color: var(--background-color);
}

#content {
  margin-top: var(--navbar-height);
  padding-bottom: 54px;
  height: calc(100vh - var(--navbar-height));
  margin-left: var(--sidebar-width);
  overflow: auto;
}
</style>
