<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script>
import { Line } from 'vue-chartjs'

import { 
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale
} from 'chart.js'

// ChartJS.register( )
ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

export default {
  name: 'LinearScale',
  components: { Line },
  props: {
    data: Array,
    timeStamps: Array,
    title: String,
    backgroundColor: String,
    labels: Array
  },
  data() {
    return {
      chartData: {
        labels: this.timeStamps,
        datasets: [
        {
          label: this.title,
          backgroundColor: this.backgroundColor,
          data: this.data
        }
      ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        animations: false,
        scales: {

        },
        plugins: {
            title: {
                display: true,
                text: this.title
            },
            legend: {
                display: false
            },
        }
      }
    }
  }
}
</script>