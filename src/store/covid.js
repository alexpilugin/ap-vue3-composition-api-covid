import moment from 'moment'

// return a shallow copy of the ordered array
Array.prototype.sortBy = function(p, asc) {
  return this.slice(0).sort(function(a,b) {
    if(asc) return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    return (a[p] > b[p]) ? -1 : (a[p] < b[p]) ? 1 : 0;
  });
}

export const covid = {
  namespaced: true,

  state() {
    return {
      isLoaded: false,
      date: null,
      global: null,
      countries: [],
      selected: null,
      orderedList: [],
      categories: [
        'NewConfirmed',
        'NewDeaths',
        'NewRecovered',
        'TotalConfirmed',
        'TotalRecovered',
        'TotalDeaths'
      ]
    }
  },

  mutations: {
    updateValues(state, {Countries, Global, Date}) {
      state.countries = Countries
      state.orderedList = Countries
      state.global = Global
      state.date = Date
      state.isLoaded = true
    },
    selectCountry(state, country) {
      state.selected = country  
    },
    orderByType(state, orderType) {
      console.log('mutation orderByType', orderType)
      if(orderType === 'Alphabetically | Desc') {
        state.orderedList =  state.countries.sortBy('Country', true)
      }
      if(orderType === 'Alphabetically | Asc') {
        state.orderedList =  state.countries.sortBy('Country', false)
      }
      if(orderType === 'New Confirmed | Desc') {
        state.orderedList =  state.countries.sortBy('NewConfirmed', false)
      }
      if(orderType === 'New Confirmed | Asc') {
        state.orderedList =  state.countries.sortBy('NewConfirmed', true)
      }
      if(orderType === 'New Deaths | Desc') {
        state.orderedList =  state.countries.sortBy('NewDeaths', false)
      }
      if(orderType === 'New Deaths | Asc') {
        state.orderedList =  state.countries.sortBy('NewDeaths', true)
      }
      if(orderType === 'New Recovered | Desc') {
        state.orderedList =  state.countries.sortBy('NewRecovered', false)
      }
      if(orderType === 'New Recovered | Asc') {
        state.orderedList =  state.countries.sortBy('NewRecovered', true)
      }
      if(orderType === 'Total Confirmed | Desc') {
        state.orderedList =  state.countries.sortBy('TotalConfirmed', false)
      }
      if(orderType === 'Total Confirmed | Asc') {
        state.orderedList =  state.countries.sortBy('TotalConfirmed', true)
      }
      if(orderType === 'Total Deaths | Desc') {
        state.orderedList =  state.countries.sortBy('TotalDeaths', false)
      }
      if(orderType === 'Total Deaths | Asc') {
        state.orderedList =  state.countries.sortBy('TotalDeaths', true)
      }
      if(orderType === 'Total Recovered | Desc') {
        state.orderedList =  state.countries.sortBy('TotalRecovered', false)
      }
      if(orderType === 'Total Recovered | Asc') {
        state.orderedList =  state.countries.sortBy('TotalRecovered', true)
      }
    }
  },

  actions: {
    async fetchData(ctx) {
      if(!ctx.state.isLoaded) {
        const res = await fetch('https://api.covid19api.com/summary')
        const data = await res.json()
        console.log(data)
        ctx.commit('updateValues', data)
      }
    },
    applySelection(ctx, country) {
      console.log('applySelection', country)
      ctx.commit('selectCountry', country)  
    },
    applyOrder(ctx, orderType) {
      console.log('action applyOrder', orderType)
      ctx.commit('orderByType', orderType) 
    }
  },

  getters: {
    isLoaded: (state) => state.isLoaded,
    globalData: (state) => state.global,
    countryData: (state) => !state.selected ? state.orderedList : [state.selected],
    currentDate: (state) => moment(state.date).format('Do MMMM YYYY'),
    countryNames: (state) => state.orderedList.map(record => record.Country),
    getCategories: (state) => state.categories,
    globalChartData: (state) => {
      console.log('globalChartData getter.....')
      if(!state.global) return []

      //const categories = state.categories
      const entries = Object.entries(state.global).map(( [k, v] ) => ({ [k]: v }));
      console.log(entries)

      //const filtered = entries.filter(entry => categories.includes(Object.keys(entry)[0])); //first key name
      const filtered = entries.filter(entry => Object.keys(entry)[0] !== 'Date')
      console.log(filtered)

      let values = {
        categories: [],
        seriesData: []
      }
      for(var i=0;i<filtered.length;i++){
        const entry = filtered[i]
        values.categories.push(Object.keys(entry)[0]);
        values.seriesData.push(Object.values(entry)[0]);
      }
      console.log(values)
      return values //.map(record => Object.values(record)[0]) //array of values
    },
    getGlobalCategories: (state) => {
      console.log('getGlobalCategories getter.....')
      if(!state.global) return null
      
      const {Date, ...rest} = state.global;
      return Object.keys(rest)
    },
    getGlobalSeries: (state) => {
      console.log('getGlobalSeries getter.....')
      if(!state.global) return null
      
      const {Date, ...rest} = state.global;
      return Object.values(rest)
    },
    getNewCategories: (state) => {
      if(!state.global) return null
      return ['New Deaths', 'New Recovered','New Confirmed']
    },
    getGlobalNewSeries: (state) => {
      if(!state.global) return null
      return [
        state.global.NewDeaths,     // 'NewDeaths', 
        state.global.NewRecovered,  // 'NewRecovered',
        state.global.NewConfirmed   // 'NewConfirmed'
      ]
    },
    getTotalCategories: (state) => {
      if(!state.global) return null
      return ['Total Deaths', 'Total Recovered','Total Confirmed']
    },
    getGlobalTotalSeries: (state) => {
      if(!state.global) return null
      return [
        state.global.TotalDeaths,     // 'TotalDeaths', 
        state.global.TotalRecovered,  // 'TotalRecovered',
        state.global.TotalConfirmed   // 'TotalConfirmed'
      ]
    },
    getCoutryCategories: (state) => {
      if(!state.selected) return []  
      const {Country, CountryCode, Date, ID, Slug, Premium, ...rest} = state.selected;
      const categories = Object.keys(rest)
      console.log('getCoutryCategories', categories)
      return categories
    },
    getCountrySeries: (state) => {
      if(!state.selected) return [] 
      const {Country, CountryCode, Date, ID, Slug, Premium, ...rest} = state.selected;
      const series = Object.values(rest)
      console.log('getCountrySeries', series)
      return series
    },
    getCountryNewSeries: (state) => {
      if(!state.selected) return [] 
      console.log('getCountryNewSeries', state.selected)
      return [
        state.selected.NewDeaths,     // 'NewDeaths', 
        state.selected.NewRecovered,  // 'NewRecovered',
        state.selected.NewConfirmed   // 'NewConfirmed'
      ]
    },
    getCountryTotalSeries: (state) => {
      if(!state.selected) return [] 
      console.log('getCountryNewSeries', state.selected)
      return [
        state.selected.TotalDeaths,     // 'TotalDeaths', 
        state.selected.TotalRecovered,  // 'TotalRecovered',
        state.selected.TotalConfirmed   // 'TotalConfirmed'
      ]
    },
    getSelectedCountryName: (state) => {
      return state.selected ? state.selected.Country : ""
    },
    getCountryStatistics: (state) => {
      if(!state.global) return []
      if(!state.selected) return [] 

      const countryData = state.selected
      const globalData = state.global

      return {
        NewConfirmed:  (countryData.NewConfirmed / globalData.NewConfirmed * 100).toFixed(3) + "%",
        NewDeaths:  (countryData.NewDeaths / globalData.NewDeaths * 100).toFixed(3) + "%",
        NewRecovered:  (countryData.NewRecovered / globalData.NewRecovered * 100).toFixed(3) + "%",
        TotalConfirmed:  (countryData.TotalConfirmed / globalData.TotalConfirmed * 100).toFixed(3) + "%",
        TotalRecovered:  (countryData.TotalRecovered / globalData.TotalRecovered * 100).toFixed(3) + "%",
        TotalDeaths:  (countryData.TotalDeaths / globalData.TotalDeaths * 100).toFixed(3) + "%",
      }
    },
    getCountryNamesNewConfirmed: (state) => {
      if(!state.countries) return [] 
      const list = state.countries.sortBy('NewConfirmed', false).map(record => record.Country)
      return list.slice(0, 20) // first 20
    },
    getCountriesNewConfirmed: (state) => {
      if(!state.countries) return [] 
      const list = state.countries.sortBy('NewConfirmed', false).map(record => record.NewConfirmed)
      return list.slice(0, 20) // first 20
    },
    getCountryNamesTotalConfirmed: (state) => {
      if(!state.countries) return [] 
      const list = state.countries.sortBy('TotalConfirmed', false).map(record => record.Country)
      return list.slice(0, 20) // first 20
    },
    getCountriesTotalConfirmed: (state) => {
      if(!state.countries) return [] 
      const list = state.countries.sortBy('TotalConfirmed', false).map(record => record.TotalConfirmed)
      return list.slice(0, 20) // first 20
    }
  }
}