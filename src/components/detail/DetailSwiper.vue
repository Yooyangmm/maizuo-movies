<template>
  <div class="swiper-container" :class="name">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'

export default {
  props: {
    perview: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: 'yang'
    }
  },
  mounted () {
    new Swiper('.' + this.name, {
      slidesPerView: this.perview,
      spaceBetween: 20,
      freeMode: true
    })
  }
}
</script>
