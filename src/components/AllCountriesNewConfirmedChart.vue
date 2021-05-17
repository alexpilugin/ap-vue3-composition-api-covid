<template>
  <vue-highcharts
    type="chart"
    :options="chartOptions"
    :redrawOnUpdate="true"
    :oneToOneUpdate="false"
    :animateOnUpdate="true"
    @rendered="onRender"/>
</template>
<script>
  import { useStore } from "vuex";
  import { computed } from 'vue'
  import VueHighcharts from 'vue3-highcharts';

  /* Example with Vuex Store 
    https://codesandbox.io/s/highcharts-vue-demo-zrok6?file=/src/components/Chart.vue
  */

  export default {
    name: 'AllCountriewNewCasesChart',

    components: {
      VueHighcharts,
    },

    setup() {
      const store = useStore();
      const chartOptions = computed(() => ({
        chart: {
          type: 'column',
        },
        title: {
          text: 'New Confirmed Cases. 20 Countries'
        },
        xAxis: {
          categories: store.getters["covid/getCountryNamesNewConfirmed"] //categories,
        },
        yAxis: {
          title: {
            text: 'Cases',
          },
        },
        series: [{
          name: 'New',
          data: store.getters["covid/getCountriesNewConfirmed"] //seriesData,
        }],
      }));

      const onRender = () => {
        console.log('All Country New Cases rendered');
      };

      return {
        chartOptions,
        onRender
      };
    },
  };
</script>

<style scoped>
.vue-highcharts {
  width: 50%;
  float: left;
}
</style>