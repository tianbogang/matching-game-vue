<template>
<div class="container">
    <div class="d-flex justify-content-center">
        <img class="mr-4" src="../../assets/images/logo.png" width="48" height="48" />
        <h1>Matching Game</h1>
    </div>

    <h5 class="center-text">Please select game difficulty</h5>

    <div class="d-flex justify-content-center">
        <button class="btn-lg mx-6" v-on:click="selectgame(3)">Easy</button>
        <button class="btn-lg btn-primary mx-6" v-on:click="selectgame(10)">Medium</button>
        <button class="btn-lg btn-danger mx-6" v-on:click="selectgame(25)">Hard</button>
    </div>
</div>    
</template>

<script>
export default {
    methods: {
        selectgame(difficulty) {
            this.$store.dispatch('createNewCards', difficulty).then(() => {
                this.$router.push('/playgame');
            });
        }
    }
}
</script>

<style scoped>

</style>