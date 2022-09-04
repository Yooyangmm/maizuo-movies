<template>
  <div>
    <van-index-bar :index-list="computedList" @select="handleChange">
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell v-for="item in data.list" :key="item.cityId" :title="item.name" @click="handleCity(item)" />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import http from '@/util/http'
import { Toast } from 'vant'
import { mapMutations } from 'vuex'
import obj from '@/util/mixinObj'

export default {
  // 混入一个公共对象
  mixins: [obj],
  data () {
    return {
      cityList: []
    }
  },
  methods: {
    ...mapMutations(['clearCinema', 'changeCityName', 'changeCityId']),
    handleCity (item) {
      // console.log(item.name, item.cityId)
      // 不允许直接修改，有风险
      // this.$store.state.cityName = item.name
      // this.$store.state.cityId = item.cityId
      // 必须通过Mutation修改
      this.clearCinema() // 每次点此切换城市之后，情况CinemaList
      this.changeCityName(item.name)
      this.changeCityId(item.cityId)
      this.$router.back()
    },
    handleChange (data) {
      // console.log(data)
      Toast(data)
    },
    renderCity (list) {
      const LetterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for (const letter of LetterList) {
        const newList = list.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
        newList.length && this.cityList.push({
          type: letter,
          list: newList
        })
      }
    }
  },
  computed: {
    computedList () {
      return this.cityList.map(item => item.type)
    }
  },
  destroyed () {
    // 每次组件销毁之后把isTabbarshow重新显示
    // this.$store.commit('show')
  },
  mounted () {
    // 每次mounted之后就把isTabbarshow设为隐藏
    // this.$store.commit('hide')
    http({
      url: 'https://m.maizuo.com/gateway?k=4755323',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data.data.cities)
      this.renderCity(res.data.data.cities)
    })
  }
}
</script>

<style lang="scss">
  .van-toast--html, .van-toast--text {
    min-width: 80px;
    min-height: 80px;
  }
</style>
