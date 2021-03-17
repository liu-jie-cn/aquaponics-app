import Vue from 'vue'
import App from './App'
import message from '@/components/quick-message/quick-message.vue'

Vue.component('quick-message',message);
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.url = 'http://139.196.194.49:8081'
Vue.prototype.data = [{
		'1号系统': ['0001832010230002', '0001662010230003']
	},
	{
		'2号系统': ['0001902010230001', '0001832010230001', '0001832010230002', '0001842010230001', '0001662010230002']
	},
	{
		'3号系统': ['0001832010230006', '0001832010230005', '0001832010230007', '0001842010230002', '0001662010230004']
	},
]
const app = new Vue({
	...App
})

app.$mount()
