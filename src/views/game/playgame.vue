<template>
<div class="container">
    <div class="d-flex justify-content-around align-items-center">
        <b-icon icon="emoji-smile" font-scale="1.5" v-if="matchedCards" variant="success"></b-icon>
        <b-icon icon="emoji-frown" font-scale="1.5" v-else-if="anyRedCard" variant="danger"></b-icon>
        <b-icon icon="person" font-scale="1.5" v-else variant="primary"></b-icon>
        <h3>Play Game</h3>
        <StopWatch />
    </div>

    <div class="d-flex flex-wrap card-set">
        <template v-for="(card, index) in cardset1">
            <button class="btn card card-closed" :key="index" v-if="card.state === CardState.Closed" v-on:click="onclikcardset1(card)"></button>
            <div class="btn card card-green" :key="index" v-if="card.state === CardState.OpenGreen">{{card.point}}</div>
            <div class="btn card card-red" :key="index" v-if="card.state === CardState.OpenRed">{{card.point}}</div>
            <div class="btn card card-hidden" :key="index" v-if="card.state === CardState.Hidden"></div>
        </template>
    </div>

    <p />

    <div class="d-flex flex-wrap card-set">
        <template v-for="(card, index) in cardset2">
            <button class="btn card card-closed" :key="index" v-if="card.state === CardState.Closed" v-on:click="onclikcardset2(card)"></button>
            <div class="btn card card-green" :key="index" v-if="card.state === CardState.OpenGreen">{{card.point}}</div>
            <div class="btn card card-red" :key="index" v-if="card.state === CardState.OpenRed">{{card.point}}</div>
            <div class="btn card card-hidden" :key="index" v-if="card.state === CardState.Hidden"></div>
        </template>
    </div>
</div>    
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex';
import { CardState, Card } from '../../globaltypes'

import StopWatch from '@/components/StopWatch.vue'

const player = Vue.extend ({
    components: {
        StopWatch
    },
    computed: {
        ...mapState({ cardset1: 'cardset1', cardset2: 'cardset2' }),
        anyRedCard(): boolean { return this.$store.getters.anyRedCard; },
        matchedCards(): boolean { return this.$store.getters.matchedCards; },
        CardState(): typeof CardState { return CardState }
    },
    methods: {
        onclikcardset1(card: Card) {
            this.$store.dispatch('updateCardFromUno', card.point);
            this.checkAndStop();
        },

        onclikcardset2(card: Card) {
            this.$store.dispatch('updateCardFromDue', card.point);
            this.checkAndStop();
        },

        checkAndStop() {
            setTimeout (() => {
                if (this.$store.getters.remainCards === 0) {
                    const stopWatch = this.$children[0] as StopWatch;
                    if(stopWatch !== undefined) {
                        stopWatch.stop();
                        this.$store.dispatch('setTimeUsed', stopWatch.counter);
                    }
                    this.$router.push('/gameover');
                }
            }, 1000);
        }
    },
    mounted() {
        const stopWatch = this.$children[0] as StopWatch;
        stopWatch?.start();
    },
    beforeDestroy() {
        const stopWatch = this.$children[0] as StopWatch;
        stopWatch?.stop();
    }
});

export default player;
</script>

<style scoped>
@keyframes spin-to-green {
    from {
        color: black;
        background-color: white;
        transform: rotateY(180deg);
    }
    to {
      transform: rotateY(0deg);
      color: white;
      background-color: green;
    }
}

@keyframes spin-to-red {
    from {
      transform: rotateY(180deg);
    }
    to {
      transform: rotateY(0deg);
    }
}

@keyframes spin-to-hidden {
    from {
      background-color: green;
    }
    to {
      background-color: transparent;
      border: 0px white;
    }
}

.card {
    width: 50px;
    height: 50px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none !important;
    border: 0px solid;
}

.card:focus, .card:active {
    outline: none !important;
    border: 0px solid;
}

.card-closed {
    background-color: white;
}

.card-green {
    color: white;
    background-color: green;
    animation: spin-to-green 0.5s linear;
}

.card-red {
    color: white;
    background-color: red;
    animation: spin-to-red 0.5s linear;
}

.card-hidden {
    background-color: transparent;
    border: 0px white;
    animation: spin-to-hidden 0.5s ease-out;
}
</style>