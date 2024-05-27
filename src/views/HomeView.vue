<template>
  <div class="home">
    <SubmitForm @submit="asyncGenerationRequest"/>
    <!-- todo: make message bubbles for each message in the list-->
    <div style="display: flex; justify-content: center;">
      <MessageBubble
        :message="message"
        :responseId="responseId"
    /></div>
  </div>
</template>

<script>
import { asyncGenerateAnswer, asyncWaitForAnswer } from '@/services/aiService';
import { ref } from 'vue';
import SubmitForm from '@/components/SubmitForm.vue';
import MessageBubble from '@/components/MessageBubble.vue';

export default {
  name: 'HomeView',
  components: {
    SubmitForm,
    MessageBubble,
  },
  setup() {
    const message = ref('');
    const responseId = ref('');

    // не очень хорошо выглядит. Надо придумать,
    // как сделать обновление данных очевидным.
    const waitForAnswerAndUpdateMessage = (id) => {
      console.log('waitForAnswerAndUpdateMessage', id);
      setTimeout(async () => {
        const response = await asyncWaitForAnswer(id);
        console.log(response);
        message.value = response.answer;

        if (response.status !== 'finished' && response.status !== 'error') {
          waitForAnswerAndUpdateMessage(id);
        }
      }, 1500);
    };

    const asyncGenerationRequest = async (submitEvent) => {
      const prompt = submitEvent.target[0].value;
      const response = await asyncGenerateAnswer(prompt);
      if (response) {
        console.log(response);
        responseId.value = response;
        waitForAnswerAndUpdateMessage(response);
      } else {
        message.value = 'Something went wrong. Please try again.';
      }
    };

    return {
      message,
      responseId,
      asyncGenerationRequest,
    };
  },
};
</script>
