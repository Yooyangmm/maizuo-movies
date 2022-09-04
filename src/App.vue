<template>
  <div>
    <tabbar v-show="$store.state.isTabbarShow"></tabbar>
    <section>
      <!-- 路由容器 -->
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import tabbar from '@/components/TabBar'

Vue.use(Vant)
export default {
  data () {
    return {
    }
  },
  components: {
    tabbar
  },
  mounted () {
    // axios.get('/yang/ajax/api/mmdb/movie/v3/list/hot.json?ct=%E6%9D%AD%E5%B7%9E&ci=50&channelId=4')
    //   .then(res => {
    //     console.log(res.data)
    //   })
  }
}
</script>

<style lang="scss">
  $width:300px;
  * {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
    li {
      width: $width;
    }
  }

  .router-link-active {
    color: red;
  }
  section {
    margin-bottom: 2.45rem;
  }
</style>
