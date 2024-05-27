<template>
    <div class="speech up">
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

<style scoped>
/* (A) SPEECH BOX */
.speech {
  /* constants */
  --speech-color: #42b983;
  --font-color: #fff;

  /* (A1) FONT & COLORS */
  font-size: 1.2em;
  color: var(--font-color);
  background: var(--speech-color);

  /* (A2) DIMENSIONS */
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
}

/* (B) USE ::AFTER TO CREATE THE "CALLOUT" */
.speech::after {
  display: block; width: 0; content: "";
  border: 15px solid transparent;
}

/* (C) "CALLOUT" DIRECTIONS */
.speech.up::after {
  border-bottom-color: var(--speech-color);
  border-top: 0;
}
.speech.down::after {
  border-top-color: var(--speech-color);
  border-bottom: 0;
}
.speech.left::after {
  border-right-color: var(--speech-color);
  border-left: 0;
}
.speech.right::after {
  border-left-color: var(--speech-color);
  border-right: 0;
}

/* (D) POSITION THE CALLOUT */
.speech {
  position: relative;
  margin: 30px;
}
.speech::after { position: absolute; }
.speech.up::after {
  top: -15px; left: calc(50% - 15px);
}
.speech.down::after {
  bottom: -15px; left: calc(50% - 15px);
}
.speech.left::after {
  left: -15px; top: calc(50% - 15px);
}
.speech.right::after {
  right: -15px; top: calc(50% - 15px);
}</style>
