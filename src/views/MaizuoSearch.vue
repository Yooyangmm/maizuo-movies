<template>
  <div>
    <van-search
    v-model="value"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    />
    <ul v-if="value">
      <li v-for="cinema in computedList" :key="cinema.cinemaId">
        <div class="left">
          <p class="cinema_name">{{cinema.name}}</p>
          <p class="cinema_text">{{cinema.address}}</p>
        </div>
        <div class="right cinema_name">
          <div style="color: #f60">￥{{cinema.lowPrice/100}}起</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    ...mapActions(['getCinemaData']),
    onSearch () {},
    onCancel () {
      this.$router.back()
    }
  },
  computed: {
    ...mapState(['cityId', 'cinemaList']),
    computedList () {
      return this.cinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },
  mounted () {
    if (this.cinemaList.length === 0) {
      this.getCinemaData(this.cityId)
    } else {
      console.log('缓存')
    }
  }
}
</script>

<style lang="scss" scoped>
  li {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    .left {
      width: 212px;
    }
    .right {
      width: 70px;
    }
    .cinema_name {
      font-size: 15px;
    }
    .cinema_text {
      color: #797d82;
      font-size: 12px;
      margin-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .box {
    position: relative; // 修正滚动条的位置
    // height: 600px;
    overflow: hidden;
  }
</style>
