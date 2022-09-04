<template>
  <ul>
    <router-link to="/films/nowplaying" custom v-slot="{navigate,isActive}">
        <li @click="navigate">
          <span :class="isActive?'yangactive':''">正在热映</span>
        </li>
      </router-link>

      <router-link to="/films/comingsoon" custom v-slot="{navigate,isActive}">
        <li @click="navigate">
          <span :class="isActive?'yangactive':''">即将上映</span>
        </li>
      </router-link>
  </ul>
</template>

<style lang="scss" scoped>
  ul {
    display: flex;
    height: 2.45rem;
    line-height: 2.45rem;
    li {
      flex: 1;
      text-align: center;
    }
  }

  .yangactive {
    color: red;
    border-bottom: 2px solid #f60;
  }
</style>
