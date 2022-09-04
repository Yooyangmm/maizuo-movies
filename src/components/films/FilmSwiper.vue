<template>
  <div class="swiper-container yang">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'

export default {
  mounted () {
    new Swiper('.yang', {
      pagination: {
        el: '.swiper-pagination'
      },
      loop: {
        type: Boolean,
        default: true
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    })
  }
}
</script>
