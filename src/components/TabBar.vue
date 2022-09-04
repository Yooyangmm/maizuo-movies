<template>
  <footer>
    <ul>
      <router-link to="/films" custom v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive?'yoyang-active':''" >
          <i class="iconfont icon-dianying"></i>
          <span>电影</span>
        </li>
      </router-link>
      <router-link to="/cinemas" custom v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive?'yoyang-active':''">
          <i class="iconfont icon-yingyuan"></i>
          <span>影院</span>
        </li>
      </router-link>
      <router-link to="/center" custom v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive?'yoyang-active':''">
          <i class="iconfont icon-31wode"></i>
          <span>我的</span>
        </li>
      </router-link>
    </ul>
  </footer>
</template>

<script>
import '../assets/font/iconfont.css'
export default {
}
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 49px;
  background-color: #fff;
  z-index: 200;
  ul {
    display: flex;
    height: 100%;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      text-align: center;
      i {
        font-size: 20px;
      }
      span {
        font-size: 16px;
      }
    }
  }
}
.yoyang-active {
  color: orange;
}
</style>
