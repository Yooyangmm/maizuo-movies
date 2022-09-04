import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import http from '@/util/http'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  // 公共状态
  state: {
    cityId: '310100',
    cityName: '上海',
    cinemaList: [],
    isTabbarShow: true
  },
  getters: {
  },
  // mutations中智能执行同步代码
  mutations: {
    changeCityName (state, cityName) {
      console.log(state, cityName)
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      console.log(state, cityId)
      state.cityId = cityId
    },
    changeCinemaData (state, data) {
      state.cinemaList = data
    },
    clearCinema (state) {
      state.cinemaList = []
    },
    show (state) {
      state.isTabbarShow = true
    },
    hide (state) {
      state.isTabbarShow = false
    }
  },
  // 支持异步和同步
  actions: {
    getCinemaData (store, cityId) {
      console.log('getCinemaData-action')
      return http({
        url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=2426478`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        console.log(res.data.data.cinemas)
        store.commit('changeCinemaData', res.data.data.cinemas)
        // store.commit('changeCinemaData', res.data.data.cinemas)
        // this.cinemaList = res.data.data.cinemas
        // this.$nextTick(() => {
        //   // 防止初始化过早
        //   // console.log(document.getElementsByTagName('li').length)
        //   new BetterScroll('.box', {
        //     scrollbar: {
        //       fade: false
        //     }
        //   })
        // })
      })
    }
  },
  modules: {
  }
})
