<template>
  <div>
    <Game />
  </div>
</template>

<script>
import Game from "./components/Game.vue";

export default {
  name: "App",
  components: {
    Game,
  },
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: center;
}
</style>
