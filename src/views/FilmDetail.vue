<template>
  <div v-if="filmInfo">
    <detail-header v-scroll="40" class="height0">
      {{filmInfo.name}}
    </detail-header>
    <div :style="{
      backgroundImage: 'url('+filmInfo.poster+')'
    }" class="poster"></div>
    <div class="content">
      <div>{{filmInfo.name}}</div>
      <div class="content-bottom">
        <div>{{filmInfo.category}}</div>
        <div>{{filmInfo.premiereAt | dateFilter}}上映</div>
        <div>{{filmInfo.nation}} | {{filmInfo.runtime}}分钟</div>
        <div class="synopsis" :class="isHidden?'hidden':''">{{filmInfo.synopsis}}</div>
        <div class="btn">
          <i class="iconfont" :class="isHidden?'icon-xiajiantou':'icon-xiangshangjiantou'" @click="isHidden=!isHidden"></i>
        </div>
      </div>
    </div>
    <div class="actors">
      <div>演职人员</div>
      <detail-swiper :perview="3.7" name="actors">
        <detail-swiper-item v-for="data in filmInfo.actors" :key="data.filmId">
          <div :style="{
            backgroundImage: 'url('+data.avatarAddress+')'
          }" class="avatar"></div>
          <div class="actors-name">{{data.name}}</div>
          <div class="actors-role">{{data.role}}</div>
        </detail-swiper-item>
      </detail-swiper>
    </div>
    <div class="photos">
      <div style="color: red">剧照</div>
      <detail-swiper :perview="2" name="photos">
        <detail-swiper-item v-for="(data,index) in filmInfo.photos" :key="index">
          <div :style="{backgroundImage: `url(${data})`}" class="avatar" @click="handlePreview(index)"></div>
        </detail-swiper-item>
      </detail-swiper>
    </div>
  </div>
</template>

<script>
import http from '@/util/http'
import obj from '@/util/mixinObj'
import moment from 'moment'
import Vue from 'vue'
import detailSwiper from '@/components/detail/DetailSwiper'
import detailSwiperItem from '@/components/detail/DetailSwiperItem'
import detailHeader from '@/components/detail/DetailHeader'
import ImagePreview from 'vant'

Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})

Vue.directive('scroll', {
  inserted (el, binding) {
    console.log(el, binding.value)

    window.onscroll = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > binding.value) {
        el.style.height = '44px'
      } else {
        el.style.height = '0px'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})

export default {
  mixins: [obj],
  data () {
    return {
      filmInfo: null,
      isHidden: true,
      duration: 0
    }
  },
  methods: {
    handlePreview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader
  },
  mounted () {
    // console.log('created', location.href)
    // console.log('create', this.$route.params.id)
    // 下一步是利用 id 发请求到详情接口，获取详细数据，布局页面
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=9282095`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  },
  // mounted () {
  //   window.onscroll = () => {
  //     if (document.documentElement.scrollTop > 50) {
  //       console.log('显示')
  //     } else {
  //       console.log('隐藏')
  //     }
  //   }
  // },
  destroyed () {
    this.onscroll = null
  }
}
</script>

<style lang="scss" scoped>
  .poster {
    width: 100%;
    height: 210px;
    background-position: center;
    background-size: cover;
  }
  .content {
    padding: 15px;
    .content-bottom {
      color: #797d82;
      font-size: 13px;
      .synopsis {
        line-height: 15px;
      }
      .btn {
        margin-top: 5px;
        text-align: center;
      }
    }
  }
  .actors {
    padding: 15px 0 15px 15px;
    .avatar {
      width: 100%;
      height: 85px;
      background-position: center;
      background-size: cover;
    }
    .actors-name {
      text-align: center;
      font-size: 13px;
      color: #191a1b;
    }
    .actors-role {
      text-align: center;
      font-size: 14px;
      color: #797d82;
    }
  }
  .photos {
    padding: 15px 0 15px 15px;
    .avatar {
      width: 100%;
      height: 85px;
    }
  }
  .hidden {
    overflow: hidden;
    height: 30px;
  }
  .height0 {
    height: 0px;
    overflow: hidden;
    transition: all 0.1s ease;
    z-index: 10;
  }
</style>
