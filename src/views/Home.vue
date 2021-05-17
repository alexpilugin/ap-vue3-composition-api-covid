<template>
  <div class="home-page">

    <div class="header">
      <b>Date: </b>{{ timestamp }}, <b>Number of Countries: </b
      >{{ countries.length }}
      <Selector 
        :options="countries" 
        @onSelect="onSelectCountry"
        @selectAll="onSelectAllCountries"
      />
      <Selector 
        v-if="countries && countries.length > 1"
        header='New Confirmed | Desc'
        :hideAll="true"
        :options="orderProps" 
        @onSelect="onSelectOrder"
      />
    </div>

    <MapChart />

    <div class="charts">
      <Top20NewConfirmedChart />
      <Top20TotalConfirmedChart />
    </div>

    <div class="charts">
      <GlobalNewCasesChart />  
      <GlobalTotalChart />   
    </div>

    <div class="charts" v-if="countries && countries.length === 1">
      <CountryNewCasesChart />
      <CountryTotalChart />
    </div>
    
    <div class="charts" v-if="countries && countries.length === 1">
      <InfoBlock
        v-for="info in countries"
        :key="info.ID"
        :title="`${info.Country}`"
        :values="info"
        width="230px"
      />
      <InfoBlock
        :title="countryName"
        :values="countryInfo"
        width="230px"
      />
      <InfoBlock v-if="global" title="Global" :values="global" width="230px" />
    </div>
    
    <div class="covid-info" v-if="countries && countries.length > 1">
      <InfoBlock v-if="global" title="Global" :values="global" width="230px" />
      <InfoBlock
        v-for="(info, i) in countries"
        :key="info.ID"
        :title="`${i + 1}. ${info.Country}`"
        :values="info"
        width="230px"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import InfoBlock from "../components/InfoBlock.vue";
import Selector from "../components/Selector.vue";

import MapChart from "../components/MapChart.vue";

import GlobalNewCasesChart from "../components/GlobalNewCasesChart.vue";
import GlobalTotalChart from "../components/GlobalTotalChart.vue";
import CountryNewCasesChart from "../components/CountryNewCasesChart.vue";
import CountryTotalChart from "../components/CountryTotalChart.vue";

import Top20NewConfirmedChart from "../components/AllCountriesNewConfirmedChart.vue";
import Top20TotalConfirmedChart from "../components/AllCountriesTotalConfirmedChart.vue";

export default {
  components: {
    InfoBlock,
    Selector,
    GlobalNewCasesChart,
    GlobalTotalChart,
    CountryNewCasesChart,
    CountryTotalChart,
    Top20NewConfirmedChart,
    Top20TotalConfirmedChart,
    MapChart
  },

  //setup() is called only once
  setup() {
    const store = useStore();

    // trigger an asynchronous action
    const fetchData = () => store.dispatch("covid/fetchData");

    // create a hook
    onMounted(async () => fetchData());

    const global = computed(() => store.getters["covid/globalData"]);
    const countries = computed(() => store.getters["covid/countryData"]);
    const timestamp = computed(() => store.getters["covid/currentDate"]);
    const names = computed(() => store.getters["covid/countryNames"]);

    const onSelectCountry = (option) => {
      store.dispatch('covid/applySelection', option)
    }

    const onSelectAllCountries = () => {
      store.dispatch('covid/applySelection', null)
      store.dispatch('covid/applyOrder', 'Alphabetically | Desc')
    }

    const onSelectOrder = (option) => {
      store.dispatch('covid/applyOrder', option)  
    }

    const orderProps = [
      'Alphabetically | Desc',      
      'New Confirmed | Desc',      
      'New Deaths | Desc',      
      'New Recovered | Desc',      
      'Total Confirmed | Desc',      
      'Total Recovered | Desc',      
      'Total Deaths | Desc',

      'Alphabetically | Asc',
      'New Confirmed | Asc',
      'New Deaths | Asc',
      'New Recovered | Asc',
      'Total Confirmed | Asc',
      'Total Recovered | Asc',
      'Total Deaths | Asc'
    ]
    
    const countryInfo = computed( () => store.getters["covid/getCountryStatistics"])
    const countryName = computed( () => store.getters["covid/getSelectedCountryName"] + " / Global")

    return {
      global,
      countries,
      timestamp,
      names,
      onSelectCountry,
      onSelectAllCountries,
      orderProps,
      onSelectOrder,
      countryInfo,
      countryName
    };
  },
};
</script>

<style scoped>
.header {
  padding: 10px 20px;
}
.covid-info {
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  position: relative;
  float: left;
  clear: both;
}
.charts {
  position: relative;
  float: left;
  clear: both;
  width: 100%;
}
</style>