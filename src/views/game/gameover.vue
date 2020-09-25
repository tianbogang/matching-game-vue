<template>
<div class="container">
    <h1 class="center-text">Game Over</h1>
    <h5 class="center-text">Time used: {{timeUsed}}</h5>
    <div class="d-flex justify-content-center">
        <button class="btn-lg" v-on:click="playagain()">Play Again</button>
    </div>
</div>
</template>

<script>
export default {
  computed: {
    timeUsed() { 
      return this.$store.getters.timeUsed;
    }
  },
  methods: {
    playagain() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>

</style>