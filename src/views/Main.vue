<template>
  <div>
    <v-sparkline
      auto-draw
    ></v-sparkline>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// @ is an alias to /src
export default {
  name: 'Main',
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters({
      chartData: 'log/getChartData',
      loginData: 'log/getLoginData'
    })
  },
  mounted() {
    this.$store.dispatch('log/findChart');
    console.log(this.loginData);
  }
}
</script>
