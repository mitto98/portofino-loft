<template>
  <div class="mb-3">
    <label v-if="label" :for="fieldId" class="form-label">{{ label }}</label>
    <select
      v-if="type === 'select'"
      :id="fieldId"
      class="form-select"
      v-model="value"
    >
      <option v-for="opt in options" :value="opt.value">{{ opt.label }}</option>
    </select>
    <textarea
      v-else-if="type === 'textarea'"
      :id="fieldId"
      class="form-control"
      rows="4"
      v-model="value"
    />
    <input
      v-else
      :id="fieldId"
      :type="type"
      class="form-control"
      v-model="value"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface OptionsType {
  value: string;
  label: string;
}

export default defineComponent({
  name: "Field",
  props: {
    name: { required: true, type: String },
    label: { type: String },
    type: { default: "text", type: String },
    modelValue: { type: [String, Number] },

    options: {
      type: Array as PropType<OptionsType[]>,
    },
    //required
    //description
  },
  computed: {
    fieldId() {
      return `field-${this.name}`;
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value: any) {
        this.$emit("update:modelValue", value);
      },
    },
  },
});
</script>
