<template>
  <div class="ratings">{{ratings}}</div>
</template>

<script>
import { getRatings } from "@/api";
export default {
  data() {
    return {
      ratings: []
    };
  },
  async created() {
    let { data } = await getRatings();
    this.ratings = data;
  }
};
</script>

<style lang="less" scoped>
</style>