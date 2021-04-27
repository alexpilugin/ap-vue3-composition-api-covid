<template>
  <div class="info-block" :style="{ width: width }">
    <h3>{{ title }}</h3>
    <div class="info">
      <!-- <span class="cell">Date</span>           <span class="cell">{{ timestamp }}</span> -->
      <span class="cell">New Confirmed</span>   <span class="cell right">{{ values.NewConfirmed }}</span>
      <span class="cell">New Deaths</span>      <span class="cell right">{{ values.NewDeaths }}</span>
      <span class="cell">New Recovered</span>   <span class="cell right">{{ values.NewRecovered }}</span>
      <span class="cell">Total Confirmed</span> <span class="cell right">{{ values.TotalConfirmed }}</span>
      <span class="cell">Total Recovered</span>    <span class="cell right">{{ values.TotalRecovered }}</span>
      <span class="cell">Total Deaths</span>    <span class="cell right">{{ values.TotalDeaths }}</span>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import moment from 'moment'

export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    values: {
      type: Object,
      required: false,
      default: null
    },
    width: {
      type: String,
      required: false,
      default: '100%'
    }
  },
  setup(props) {

    // console.log(props)

    const timestamp = computed(() => {
      return moment(props.values.Date).format('Do MMMM YYYY')
    })

    return {
      timestamp
    }
  }
}
</script>

<style scoped>
.info-block {
  font-size: 0.8rem;
  padding: 10px;
  float: left;
  /* border: solid 1px #ccc; */
}
.info {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 10px 0px;
  margin: 0px;
}

@media all and (-ms-high-contrast:none) {
  .info {
    display: -ms-grid;
    -ms-grid-columns: repeat(2, 1fr);
    -ms-grid-rows: repeat(6, 1fr);
    gap: 10px 0px;
  }
}
.cell {
  border-bottom: 1px solid #999;
}
.cell.right {
  text-align: right;
}
</style>