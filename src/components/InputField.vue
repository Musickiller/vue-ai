<template>
  <label for="ai_prompt">
    <input
      id="ai_prompt"
      v-model="inputValue"
      @input="$emit('update:modelValue', inputValue)"
      type="text"
      v-bind="$attrs"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      placeholder="Say hi!"
    />
  </label>
</template>

<script>
export default {
  name: 'InputField',
  props: ['modelValue'],
  data() {
    return {
      inputValue: this.modelValue,
    };
  },

  watch: {
    modelValue(newValue) {
      this.inputValue = newValue;
    },
  },
};
</script>
