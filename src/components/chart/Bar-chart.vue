<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['labels', 'values'],
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: this.labels,
        datasets: [
          {
            label: 'Add Count',
            backgroundColor: 'white',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            //Data to be represented on y-axis
            data: this.values
          }
        ]
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
            display: true
          },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options)
  }
}
</script>