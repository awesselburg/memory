<template>
  <div class="game-container">
    <h3 v-if="timer">{{ toTime(this.timer) }}</h3>
    <h2>Gelößt {{ solved.length }} von {{ schuffled.length / 2 }}</h2>
    <div :style="getStyle()">
      <div v-bind:key="item" v-for="item in schuffled">
        <div class="image-container" @click="handleClick(item)">
          <img
            :class="['image', getImageClass(item)]"
            :src="'/img/' + item.src"
          />
        </div>
      </div>
    </div>
    <div style="margin-top: 50px; text-align: center">
      <button class="btn btn-primary" @click="schuffle()">Mischen</button>
    </div>
  </div>
</template>

<script>
import settings from "../config/settings.json";
import { stopwatch } from "../helper/tools.js";
export default {
  name: "Game",
  data() {
    return {
      settings,
      schuffled: [],
      hidden: true,
      solved: [],
      current_deck: [],
      paused: false,
      timer: 0,
      timerInstance: null,
      interval: null,
    };
  },
  methods: {
    handleClick(item) {
      if (this.paused || this.current_deck.includes(item.id)) {
        return;
      }
      this.current_deck.push(item.id);
    },
    getStyle() {
      return `display: grid; grid-template-columns: repeat(${Math.ceil(
        Math.sqrt(this.schuffled.length)
      )}, 150px); gap: 10px`;
    },
    getImageClass(item) {
      if (this.solved.includes(item.index)) {
        return "";
      }
      if (this.current_deck.includes(item.id)) {
        return "";
      }
      return this.hidden && !this.solved.includes(item.index) ? "hidden" : "";
    },
    toTime(seconds) {
      var date = new Date(null);
      date.setSeconds(seconds);
      return date.toISOString().substr(11, 8);
    },
    async schuffle() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.timerInstance = new stopwatch();
      this.timerInstance.start();
      this.interval = setInterval(() => {
        this.timer = this.timerInstance.getTime();
      }, 1000);

      let items = [];
      (this.watch = this.hidden = true),
        (this.solved = []),
        (this.current_deck = []),
        (this.paused = false),
        await Promise.all(
          this.settings.deck.map(async (item, index) => {
            items.push({ src: item[0], index, id: index });
            items.push({ src: item[1], index, id: index + "_x1" });
          })
        );
      this.schuffled = items.sort(() => Math.random() - 0.5);
    },
  },
  watch: {
    current_deck: {
      deep: true,
      async handler(value) {
        if (value.length == 2) {
          const index_1 = this.schuffled.find((item) => {
            return item.id == value[0];
          }).index;
          const index_2 = this.schuffled.find((item) => {
            return item.id == value[1];
          }).index;
          if (index_1 == index_2) {
            this.solved.push(index_1);
            if (this.solved.length == this.schuffled.length / 2) {
              this.timerInstance.stop();
            }
          } else {
            this.paused = true;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.paused = false;
          }

          this.current_deck = [];
        }
      },
    },
  },
  mounted() {
    this.schuffle();
  },
};
</script>

<style lang="scss">
.game-container {
  display: block !important;
}
.image {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
.image-container {
  border: solid 1px lightblue;
  overflow: hidden;
  cursor: pointer;
}
.hidden {
  visibility: hidden;
  //opacity: 0.1;
}
</style>
