import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.url = 'http://139.196.194.49:8081'
const app = new Vue({
	...App
})
app.$mount()
