<template>
	<view class="monitoring">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">监测数据</view>
		</view>
		<view class="monitoring-data">
			<view class="monitoring-select">
				<view class="select" v-for="(item,index) in selectData" :key="index">
					<picker @change="bindPickerChange($event,index)" :value="item.name" :range="item.data">
						<view class="uni-input">{{item.name}}</view>
					</picker>
					<image class="monitor-image" src="../../../static/svg/xia.svg" mode=""></image>
				</view>
				<view class="split" style="left: 50%;"></view>
			</view>
			<view class="time-btn">
				<view :class="['order-btn',timeBtnIndex==index?'order-btn-pitch':'']" v-for="(item,index) in ['近1小时','近24h','近7天','近一月']"
				 :key="index" @click="tiemOrder(index)">
					{{item}}
				</view>
			</view>
			<view class="monitoring-echarts">
				<view class="echarts-for" v-for="(item,index) in echartsData" :key="index">
					<view class="name-unit">
						<view class="name">
							<image class="info" src="../../../static/img/info.png" mode=""></image>
							<text>{{item.name}}</text>
						</view>
						<view class="unit">{{item.unit}}</view>
					</view>
					<echarts :id="item.echartsId" :option="item.option"></echarts>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import Echarts from '@/components/echarts/echarts.vue'
	import util from '@/static/js/util.js'
	export default {
		name: '',
		props: {},
		components: {
			Echarts
		},
		data() {
			return {
				//绑定的数据
				selectData: [{
					name: '1号系统',
					data: ['1号系统', '2号系统', '3号系统']
				}, {
					name: '全部检测项',
					data: ['检测项1', '检测项2', '检测项3']
				}],
				timeBtnIndex: 0,
				echartsData: [{
						name: '溶氧',
						unit: '',
						echartsId: 'oxygenEcharts',
						option: {}
					},
					{
						name: 'PH',
						unit: '',
						echartsId: 'phEcharts',
						option: {}
					}, {
						name: '水温',
						unit: '',
						echartsId: 'waterEcharts',
						option: {}
					},
				],
			};
		},
		onLoad() {
			//页面初始化触发事件
			this.echartsData[0].option = {
				tooltip: {
					trigger: 'axis',
					position: function(pos, params, dom, rect, size) {
						// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
						var obj = {
							top: 0
						};
						obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
						return obj;
					},
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					top: '15%',
					right: '3%',
					left: '12%',
					bottom: '13%'
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: ['1', '2', '3', '4', '5', '6'],
					axisLine: {
						lineStyle: {
							color: '#F0F3F7'
						}
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						margin: 10,
						color: '#5F5F5F',
						textStyle: {
							fontSize: 12
						},
					},
				}],
				yAxis: [{
					minInterval: 2,
					maxInterval: 5,
					axisLabel: {
						formatter: '{value}',
						color: '#5F5F5F',
					},
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false
					},
					splitLine: {
						// show: false,
						lineStyle: {
							type: 'solid',
							color: '#F0F3F7'
						}
					}
				}],
				series: [{
					type: 'line',
					smooth: true,
					data: [2.2, 3.8, 6.3, 1.7, 3.2, 4.3],
					barWidth: '8px',
					areaStyle: {},
					lineStyle: {
						width: 4
					},
					// 自定义变量，以数组形式传递渐变参数
					linearGradient: [0, 0, 0, 1,
						[{
								offset: 0,
								color: 'rgba(38, 147, 255, 1)'
							},
							{
								offset: 1,
								color: 'rgba(38, 147, 255, 0.3)'
							}
						]
					]
				}]
			}
			this.echartsData[1].option = {
				tooltip: {
					trigger: 'axis',
					position: function(pos, params, dom, rect, size) {
						// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
						var obj = {
							top: 0
						};
						obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
						return obj;
					},
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					top: '15%',
					right: '3%',
					left: '12%',
					bottom: '13%'
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: ['1', '2', '3', '4', '5', '6'],
					axisLine: {
						lineStyle: {
							color: '#F0F3F7'
						}
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						margin: 10,
						color: '#5F5F5F',
						textStyle: {
							fontSize: 12
						},
					},
				}],
				yAxis: [{
					minInterval: 2,
					maxInterval: 5,
					axisLabel: {
						formatter: '{value}',
						color: '#5F5F5F',
					},
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false
					},
					splitLine: {
						// show: false,
						lineStyle: {
							type: 'solid',
							color: '#F0F3F7'
						}
					}
				}],
				series: [{
					type: 'line',
					smooth: true,
					data: [2.2, 3.8, 6.3, 1.7, 3.2, 4.3],
					barWidth: '8px',
					areaStyle: {},
					lineStyle: {
						width: 4
					},
					// 自定义变量，以数组形式传递渐变参数
					linearGradient: [0, 0, 0, 1,
						[{
								offset: 0,
								color: 'rgba(38, 147, 255, 1)'
							},
							{
								offset: 1,
								color: 'rgba(38, 147, 255, 0.3)'
							}
						]
					]
				}]
			}
			this.echartsData[2].option = {
				tooltip: {
					trigger: 'axis',
					position: function(pos, params, dom, rect, size) {
						// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
						var obj = {
							top: 0
						};
						obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
						return obj;
					},
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					top: '15%',
					right: '3%',
					left: '12%',
					bottom: '13%'
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: ['1', '2', '3', '4', '5', '6'],
					axisLine: {
						lineStyle: {
							color: '#F0F3F7'
						}
					},
					axisTick: {
						show: false,
					},
					axisLabel: {
						margin: 10,
						color: '#5F5F5F',
						textStyle: {
							fontSize: 12
						},
					},
				}],
				yAxis: [{
					minInterval: 2,
					maxInterval: 5,
					axisLabel: {
						formatter: '{value}',
						color: '#5F5F5F',
					},
					axisTick: {
						show: false,
					},
					axisLine: {
						show: false
					},
					splitLine: {
						// show: false,
						lineStyle: {
							type: 'solid',
							color: '#F0F3F7'
						}
					}
				}],
				series: [{
					type: 'line',
					smooth: true,
					data: [2.2, 3.8, 6.3, 1.7, 3.2, 4.3],
					barWidth: '8px',
					areaStyle: {},
					lineStyle: {
						width: 4
					},
					// 自定义变量，以数组形式传递渐变参数
					linearGradient: [0, 0, 0, 1,
						[{
								offset: 0,
								color: 'rgba(38, 147, 255, 1)'
							},
							{
								offset: 1,
								color: 'rgba(38, 147, 255, 0.3)'
							}
						]
					]
				}]
			}
			this.tiemOrder(0)
		},
		methods: {
			//自定义事件集合地
			navigateBack() {
				uni.navigateBack()
			},
			// 下拉框
			bindPickerChange(e, index) {
				let value = e.target.value;
				this.selectData[index].name = this.selectData[index].data[value];
			},
			// 时间按钮
			tiemOrder(index) {
				this.timeBtnIndex = index;
				let seriesData =[2.2, 3.8, 6.3, 1.7, 3.2, 4.3];
				let data = [];
				switch (index) {
					case 0:
						let link = [];
						for (let i = 0; i < 6; i++) {
							let time = i
							if (i < 10) {
								time = "0" + i;
							}
							link.push(time)
						}
						data = link;
						break;
					case 1:
						let links = [];
						for (let i = 0; i < 24; i++) {
							let time = i
							if (i < 10) {
								time = "0" + i;
							}
							links.push(time)
						}
						data = links
						break;
					case 2:
						data = util.tiemOrder(1)
						break;
					case 3:
						data = util.tiemOrder(2)
						break;
				}
				this.timeBtnIndex = index;

				this.echartsData.forEach(each => {
					each.option.xAxis[0].data = data;
					each.option.series[0].data = seriesData;
				})
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: '../statistics/monitoring'
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
	.monitoring {
		min-height: 100%;
		background: #F5F7FA;

		.monitoring-data {
			position: relative;
			top: 140px;
		}

		.monitoring-select {
			width: calc(100% - 54px);
			display: flex;
			padding: 15px 27px;
			background: #FFFFFF;
			position: fixed;
			top: 70px;
			z-index: 999;


			.select {
				width: 50%;
				line-height: 29px;
				display: flex;
				justify-content: center;
				text-align: center;
				font-size: 14px;

				.monitor-image {
					width: 30px;
					height: 20px;
					margin-top: 5px;
					color: #99999A;
				}
			}

			.time {
				width: 50%;
				line-height: 29px;
				text-align: center;
			}

			.split {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 1px;
				height: 11px;
				background: #E8ECF0;
			}
		}

		.time-btn {
			padding: 0px 12px;
			display: flex;
			justify-content: space-between;

			.order-btn {
				color: #99999A;
				background: #FFFFFF;
				border: 1px solid #E9E9E9;
				border-radius: 30px;
				padding: 10px 20px;
				font-size: 14px;
			}

			.order-btn-pitch {
				color: #2693FF;
				background: #E9F1FA;
				border: 1px solid #2693FF;
			}
		}

		.monitoring-echarts {
			padding-top: 4px;
			padding: 0px 12px;
			border-radius: 8px;

			.echarts-for {
				background: #FFFFFF;
				margin-top: 8px;
				padding: 20px 12px;

				.name-unit {
					display: flex;
					justify-content: space-between;

					text {
						margin-left: 8px;
						font-size: 17px;
						color: #111111;
					}

					.info {
						height: 17px;
						width: 17px;
						position: relative;
						top: 3px;
					}

					.unit {
						color: #99999A;
						font-size: 12px;
						position: relative;
						top: 3px;
					}
				}

				#phEcharts,
				#oxygenEcharts,
				#waterEcharts {
					height: 194px;
					margin-top: 11px;
				}
			}
		}
	}
</style>
