<template>
    <span font-scale="1.5">{{ counterDisplay }}</span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Subscription, timer } from 'rxjs';

@Component
export default class StopWatch extends Vue {

    public counter: Date = new Date(0,0,0,0,0,0);
    public counterDisplay = "";
    private ticking = true;
    private tick: Subscription | null = null;

    public start() {
        this.ticking = true;
    }

    public stop() {
        this.ticking = false;
    }

    mounted() {
        this.ticking = false;
        this.tick = timer(0, 1000).subscribe(ellapsedCycles => {
            if (this.ticking) {
                this.counter = new Date(0, 0, 0, 0, 0, 0);
                this.counter.setSeconds(ellapsedCycles);
                this.counterDisplay =  this.counter.getHours() + ':' + this.counter.getMinutes() + ':' + this.counter.getSeconds();
            }
        });
    }

    destroyed() {
        this.tick?.unsubscribe();
    }
}

</script>

<style scoped>

</style>