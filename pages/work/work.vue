<template>
	<view class="work">
		<view class="page-head">工作台</view>
		<view class="manage" v-for="(item,index) in manageData" :key="index">
			<view class="head">{{item.name}}</view>
			<view class="data">
				<view class="for" v-for="(data,index) in item.data" :key="index" @click="uniNavigateTo(data.url)">
					<image class="icon" :src="'../../static/img/'+data.icon+'.png'"></image>
					<view class="title">{{data.title}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: '',
		props: {},
		data() {
			return {
				//绑定的数据
				manageData: [{
					name: '设备管理',
					data: [{
							icon: 'real',
							title: '实时监测',
							url: './real/index'
						},
						{
							icon: 'video',
							title: '视频监控',
							url: ''
						},
						{
							icon: 'control',
							title: '控制设备',
							url: ''
						}, {
							icon: '',
							title: '',
							url: ''
						}
					]
				}, {
					name: '生产管理',
					data: [{
							icon: 'daily',
							title: '日常检测',
							url: './daily/index'
						},
						{
							icon: 'order',
							title: '订单数据',
							url: './order/index'
						},
						{
							icon: 'feed',
							title: '喂食管理',
							url: './feed/index'
						}, {
							icon: 'alarm',
							title: '报警管理',
							url: './alarm/index'
						}
					]
				}, {
					name: '统计图表',
					data: [{
							icon: 'monitoring',
							title: '监测数据',
							url: './statistics/monitoring'
						},
						{
							icon: 'alarmstat',
							title: '报警统计',
							url: ''
						},
						{
							icon: 'ordered',
							title: '订单统计',
							url: './statistics/ordered'
						}, {
							icon: 'feedings',
							title: '喂食统计',
							url: ''
						}
					]
				}]
			};
		},
		onLoad() {
			//页面初始化触发事件

		},
		methods: {
			//自定义事件集合地
			uniNavigateTo(url) {
				if (url) {
					uni.navigateTo({
						url: url
					});
				}
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.redirectTo({
						url: '../work/work'
					});
				}, 1000);
			},
		},
		beforeDestroy() {
			//组件销毁之前调用，取消订阅
		}
	};
</script>
<style lang="less">
	.work {
		.manage {
			padding: 0px 12px 5px 12px;

			.head {
				color: #111111;
				font-size: 18px;
				font-weight: bold;
				margin-top: 30px;
			}

			.data {
				margin-top: 16px;
				display: flex;
				justify-content: space-between;
				text-align: center;

				.for {
					padding-left: 10px;
				}

				.icon {
					height: 45px;
					width: 45px;
					margin: auto;
				}

				.title {
					color: #111111;
					margin-top: 8px;
					font-size: 14px;
					font-weight: 500;
					margin-top: 8px;
				}
			}
		}
	}
</style>
