<template>
  <div>
    <film-swiper :key="datalist.length">
      <film-swiper-item v-for="data in datalist" :key="data.id" class="filmswiperitem">
        <img :src="data.imgUrl">
      </film-swiper-item>
    </film-swiper>
    <film-header class="sticky"></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import filmSwiper from '@/components/films/FilmSwiper'
import filmSwiperItem from '@/components/films/FilmSwiperItem'
import filmHeader from '@/components/films/FilmHeader'
// @ 别名 ---> src 的绝对路径
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    axios.get('/banner.json').then(res => {
      // console.log('resres', res.data.banner)
      this.datalist = res.data.banner
    })
  },
  components: {
    filmSwiper,
    filmSwiperItem,
    filmHeader
  }
}
</script>

<style lang="scss" scoped>
  .filmswiperitem {
    img {
      width: 100%;
    }
  }

  .sticky {
    position: sticky;
    top: 0;
    background-color: #fff;
    transform: translateZ(0);
    z-index: 100;
  }
</style>>
