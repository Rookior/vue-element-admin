<template>
  <div class="flex">
      <div class="w-left">
          <menu-item :routes=routes  @handleOpen="handleOpen" @handleClose="handleClose"></menu-item>
      </div>
      <div class="w-right">
         layout里面的内容（页面右侧主体）被缓存：（指定页面缓存）

        <keep-alive>
        <!-- 需要缓存的视图组件 --> 
        <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
          <!-- 不需要缓存的视图组件 -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        
        
      </div>
  </div>
 
</template>

<script>
import MenuItem from './MenuItem.vue'
export default {
  components: {
    MenuItem
  },
  data () {
    return {

    }
  },
  computed: {
    routes () {
      return this.$store.getters.routes
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
    .flex{
      display: flex;
      .w-left{
        width: 200px;
      }
      .w-right{
        width: calc(100% - 200px);
      }
    }
</style>
