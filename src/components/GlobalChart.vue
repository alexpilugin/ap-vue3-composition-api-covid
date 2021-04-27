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
  import { ref, reactive, computed } from 'vue'
  import VueHighcharts from 'vue3-highcharts';

  /* Example with Vuex Store 
    https://codesandbox.io/s/highcharts-vue-demo-zrok6?file=/src/components/Chart.vue
  */

  export default {
    name: 'GlobalChart',

    components: {
      VueHighcharts,
    },

    setup() {
      const store = useStore();
      /*
      const categories = reactive(store.getters["covid/getGlobalCategories"]);
      const seriesData = reactive(store.getters["covid/getGlobalServies"]);
      */

      const chartOptions = computed(() => ({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Global Data',
        },
        xAxis: {
          categories: store.getters["covid/getGlobalCategories"] //categories,
        },
        yAxis: {
          title: {
            text: 'Values',
          },
        },
        series: [{
          name: 'Records',
          data: store.getters["covid/getGlobalSeries"] //seriesData,
        }],
      }));

      const onRender = () => {
        console.log('Chart rendered');
      };

      const onUpdate = () => {
        console.log('Chart updated');
      };
      const onDestroy = () => {
        console.log('Chart destroyed');
      };

      return {
        chartOptions,
        onRender,
        onUpdate,
        onDestroy
      };
    },
  };
</script>

<style>
.vue-highcharts {
  width: 30%;
  float: left;
}
</style>