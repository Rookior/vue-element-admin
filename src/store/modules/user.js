import { login, getInfo, getPermission, testToken } from '@/api/user'

import { constantRoutes, componentRoute } from '@/router'

const user = {
  state: {
    token: '',
    roles: [],
    accessRoutes: [],  //动态路由
    routes: []          //全部路由
  },
  mutations: {
    SET_TOKEN (state, payload) {
      state.token = payload.token;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_accessRoutes: (state, accessRoutes) => {
      state.accessRoutes = accessRoutes  
        //过滤非菜单页面  
      const routes = constantRoutes.concat(accessRoutes).filter(ele => ele.hidden !== true)   
      state.routes = routes
    }
  },
  actions: {
    LoginByUsername ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          commit('SET_TOKEN', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        });
      });
    },
    getInfo ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getInfo(data).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          resolve(data)
        }).catch(error => {
          reject(error)
        });
      });
    },
    permission ({ state, commit }, roles) {
      return new Promise((resolve, reject) => {
        // 接口返回数据
        getPermission(roles).then(response => {
          // var data = [
          //   {
          //       path: '/user',
          //       name: 'user',

          //           title: '权限页面',

          //       component: 'User'
          //   }
          // ]
          const data = response.data.accessRoutes
          commit('SET_accessRoutes', data)

          //处理数据
          const accessRoutes = componentRoute(data)

          // 返回路由数据
          resolve(accessRoutes)

        }).catch(error => {
          reject(error)
        });
      });
    }
  }
};

export default user;