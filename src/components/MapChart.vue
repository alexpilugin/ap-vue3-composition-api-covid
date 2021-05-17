<template>
  <div class="map-chart">
    <!-- <div class="map-chart__title"></div>-->
    <div class="map-chart__content">
      <vue-highcharts
        v-if="isLoaded"
        type="mapChart"
        :options="chartOptions"
        :redrawOnUpdate="true"
        :oneToOneUpdate="false"
        :animateOnUpdate="true"
      />
    </div>
  </div>
</template>
<script>
import HighCharts from "highcharts";
import MapCharts from "highcharts/modules/map";

//import euMap from '@highcharts/map-collection/custom/european-union.geo.json';
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import VueHighcharts from "vue3-highcharts";
MapCharts(HighCharts);

import { useStore } from "vuex";
import { computed } from 'vue'

export default {
  name: "SimpleChart",
  components: {
    VueHighcharts,
  },
  setup() {
    const store = useStore();
    //console.log('map', computed(() =>store.getters["covid/getMapData"]))

    const isLoaded = computed( () => store.getters["covid/isLoaded"])

    const chartOptions = computed(() => ({
      chart: {
        map: worldMap,
      },
      title: {
        text: store.getters["covid/getMapData"].mapChartTitle,
      },
      legend: {
        enabled: true,
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: "spacingBox",
        },
      },
      scrollbar: {
        enabled: false
      },
      colorAxis: {
        min: 0,
      },
      series: [
        {
          name: store.getters["covid/getMapData"].mapChartTitle,
          states: {
            hover: {
              color: "#ff4286", /* #cf0e00 */
            },
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}",
          },
          allAreas: false, /* to show Greenland */
          data: store.getters["covid/getMapData"].mapDataList
        },
      ],
    }));

    return {
      chartOptions,
      isLoaded
    };
  },
};
</script>

<style scoped>
.map-chart {
  width: 90%;
  display: flex;
  justify-content: center; 
}
.map-chart .map-chart__content,
.map-chart .map-chart__content .vue-highcharts {
  width: 100%;
  height: 700px;
}
</style>