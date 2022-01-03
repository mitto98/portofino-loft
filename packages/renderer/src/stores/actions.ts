import { defineStore } from "pinia";
import axios from "axios";
import { isArray } from "lodash";
import { ActionDescription } from "types/Action";

export const useActionStore = defineStore("actions", {
  state: () => ({
    actions: {} as Record<string, ActionDescription>,
    errors: {} as Record<string, any>,
  }),
  getters: {},
  actions: {
    async loadAction(name: string = "", force: boolean = false) {
      if (this.actions[name]) return;

      const url = `portofino-upstairs/actions/${name}/:description`.replace(
        "//",
        "/"
      );
      try {
        const { data } = await axios.get<ActionDescription>(url);
        if (isArray(data.children))
          data.children = data.children.sort((a, b) => a.localeCompare(b));

        this.actions = { ...this.actions, [name]: data };
        console.log("PINIA", this.actions);
      } catch (e: any) {
        e.response.data = e.response.data.replace(
          /<style type="text\/css">.+<\/style>/g,
          ""
        );
        this.errors[name] = e;
      }
    },
  },
});
