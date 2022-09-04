<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- 1. 声明式导航
        <li v-for="data in datalist" :key="data">
        <router-link to="/detail">{{data}}</router-link>
        </li> -->
      <!-- 2. 编程式导航 -->
      <van-cell v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
        <img :src="data.poster">
        <div>
          <div class="title">{{data.name}}</div>
          <div class="content">
            <div :class="data.grade?'':'hidden'">
              观众评分
              <span style="color: red">{{data.grade}}</span>
            </div>
            <div class="actors">
              主演：{{data.actors | actorsFilter}}
            </div>
            <div>
              {{data.nation}} | {{data.runtime}}分钟
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import Vue from 'vue'
import http from '@/util/http'

Vue.filter('actorsFilter', (data) => {
  if (data === undefined) return '暂无主演'
  return data.map(item => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      curPage: 1,
      total: 0
    }
  },
  methods: {
    onLoad () {
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }

      console.log('到底了')

      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${++this.curPage}&pageSize=10&type=1&k=6709289`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // console.log(res.data.data.films)
        this.datalist = this.datalist.concat(res.data.data.films)
        this.loading = false
      })
    },
    handleChangePage (id) {
      // console.log(id)
      // 1. 编程式导航 --- BOM写法
      // location.href = '#/detail'

      // 2. Vue自带, 位置查找
      // this.$router.push(`/detail/${id}`)

      // 3. 通过命名路由查找
      this.$router.push({
        name: 'yoyangDetail',
        params: {
          id
        }
      })
    }
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=6709289`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data.data)
      this.total = res.data.data.total
      this.datalist = res.data.data.films
    })
  }
}
</script>

<style lang="scss" scoped>
  .van-list {
    .van-cell {
      overflow: hidden;
      padding: 15px;
      img {
        float: left;
        width: 3.3rem;
        margin-right: 20px;
      }
      .title {
        font-size: 16px;
      }
      .content {
        font-size: 13px;
        color: #797d82;
        .actors {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 10rem;
        }
      }
    }
  }
  .hiden {
    visibility: hidden;
  }

</style>
