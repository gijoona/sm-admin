<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-sheet>
            <svg id="loginChart"></svg>
          </v-sheet>
        </v-card>
      </v-col>
      <v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { mapGetters } from 'vuex'
// @ is an alias to /src
export default {
  name: 'Main',
  data: () => {
    return {}
  },
  computed: {
    ...mapGetters({
      logData: 'log/getLogData',
      loginData: 'log/getLoginData'
    })
  },
  methods: {
    drawLoginChart() {
      let marge = { top: 10, bottom: 60, left: 10, right: 60 }
      let dataset = this.loginData.values;
      let scaleLinear = d3
        .scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, 250])
      let svg = d3.select('svg')
      let g = svg.append('g').attr('transform', 'translate(' + marge.top + ',' + marge.left + ')')
      let rectHeight = 7
      g.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', 20)
        .attr('y', function (d, i) {
          return i * rectHeight
        })
        .attr('width', function (d) {
          return scaleLinear(d)
        })
        .attr('height', rectHeight - 5)
        .attr('fill', 'lightblue')
      let xScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, 250])
      let xAxis = d3.axisBottom(xScale).ticks(7)
      g.append('g')
        .attr('transform', 'translate(' + 20 + ',' + dataset.length * rectHeight + ')')
        .call(xAxis)
    }
  },
  mounted() {
    this.$store.dispatch('log/findChart');
    this.drawLoginChart();
  }
}
</script>