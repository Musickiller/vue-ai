<template>
    <div class="message-bubble">
        <i>{{ responseId }}</i>
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
  name: 'MessageBubble',
  props: ['message', 'responseId'],
};
</script>
