<template>
    <form @submit.prevent="handleSubmit">
        <InputField v-model="inputValue" />
        <button type="submit">Submit</button>
    </form>
</template>

<script>
import InputField from './InputField.vue';

export default {
  name: 'SubmitForm',
  components: {
    InputField,
  },
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    handleSubmit() {
      console.log('submit', this.inputValue);
      //   this.$emit('submit', this.inputValue);
      this.inputValue = '';
    },
  },
};
</script>
