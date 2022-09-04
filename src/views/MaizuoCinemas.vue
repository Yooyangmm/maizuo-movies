<template>
  <div>
    <van-nav-bar title="影院" class="fix-bar" fixed placeholder ref="navbar" @click-left="handleLeft" @click-right="handleRight">
      <template #left>
        {{cityName}}
        <van-icon name="arrow-down" color="black"/>
      </template>
      <template #right>
        <van-icon name="search" size="18" color="black"/>
      </template>
    </van-nav-bar>
    <div class="box" :style="{
      height: height
      }">
      <ul>
        <li v-for="cinema in cinemaList" :key="cinema.cinemaId">
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
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      height: '0px'
    }
  },
  methods: {
    ...mapActions(['getCinemaData']),
    handleLeft () {
      this.$router.push('/city')
    },
    handleRight () {
      this.$router.push('/cinemas/search')
    }
  },
  computed: {
    ...mapState(['cinemaList', 'cityId', 'cityName'])
  },
  mounted () {
    this.$nextTick(() => {
      this.height = document.documentElement.clientHeight - document.querySelector('footer').offsetHeight - this.$refs.navbar.$el.offsetHeight + 'px'
    })

    // if (this.$store.state.cinemaList.length === 0) {
    if (this.cinemaList.length === 0) {
      this.getCinemaData(this.cityId).then(
        res => {
          // console.log('数据完事')
          this.$nextTick(() => {
          // 防止初始化过早
          // console.log(document.getElementsByTagName('li').length)
            new BetterScroll('.box', {
              scrollbar: {
                fade: false
              }
            })
          })
        }
      )
    } else {
      this.$nextTick(() => {
        // 防止初始化过早
        // console.log(document.getElementsByTagName('li').length)
        new BetterScroll('.box', {
          scrollbar: {
            fade: false
          }
        })
      })
    }
    // http({
    //   url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=2426478`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    //   // console.log(res.data.data.cinemas)
    //   this.cinemaList = res.data.data.cinemas
    //   this.$nextTick(() => {
    //     // 防止初始化过早
    //     // console.log(document.getElementsByTagName('li').length)
    //     new BetterScroll('.box', {
    //       scrollbar: {
    //         fade: false
    //       }
    //     })
    //   })
    // })
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
