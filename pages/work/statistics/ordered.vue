<template>
	<view class="ordered">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">订单统计</view>
		</view>
		<view class="ordered-data">
			<view class="kpi-data">
				<view class="for" v-for="(item,index) in kpiData" :key="index">
					<view class="value-unit">
						<text class="value">{{item.value}}</text>
						<text class="unit">{{item.unit}}</text>
					</view>
					<view class="name">{{item.name}}订单额</view>
					<view class="num-name">
						<text class="nameNum">{{item.name}}订单数：</text>
						<text class="num">{{item.num}}</text>
					</view>
				</view>
			</view>
			<view class="time-btn">
				<view :class="['order-btn',timeBtnIndex==index?'order-btn-pitch':'']" v-for="(item,index) in ['日订单','周订单','月订单','年订单']"
				 :key="index" @click="tiemOrder(index)">
					{{item}}
				</view>
			</view>
			<view class="ordered-echarts">
				<view class="echarts-for" v-for="(item,index) in echartsData" :key="index">
					<view class="name-unit">
						<view class="name">
							<image class="info" src="../../../static/img/info.png" mode=""></image>
							<text>{{item.name}}</text>
						</view>
						<view class="unit">{{item.unit}}</view>
					</view>
					<echarts :id="item.echartsId" :option="index==0?quotaOption:quantityOption"></echarts>
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
				kpiData: [{
						name: '今日',
						value: '8.49',
						unit: '万',
						num: '1',
					},
					{
						name: '本月',
						value: '30.5',
						unit: '万',
						num: '12',
					},
					{
						name: '本年',
						value: '1000',
						unit: '万',
						num: '145',
					},
				],
				timeBtnIndex: 0,
				echartsData: [{
						name: '订单额',
						unit: '万元',
						echartsId: 'quotaEcharts'
					},
					{
						name: '订单数',
						unit: '个',
						echartsId: 'quantityEcharts'
					},
				],
				quotaOption: {
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
						type: 'bar',
						data: [2.2, 3.8, 6.3, 1.7, 3.2, 4.3],
						barWidth: '8px',
						itemStyle: {
							normal: {
								barBorderRadius: [30, 30, 30, 30]
							}
						},
						// 自定义变量，以数组形式传递渐变参数
						linearGradient: [0, 0, 0, 1,
							[{
									offset: 0,
									color: 'rgba(38, 147, 255, 0.4)'
								},
								{
									offset: 1,
									color: 'rgba(36, 120, 255, 1)'
								}
							]
						]
					}]
				},
				quantityOption: {
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
						type: 'bar',
						data: [2.2, 3.8, 6.3, 1.7, 3.2, 4.3],
						barWidth: '8px',
						itemStyle: {
							normal: {
								barBorderRadius: [30, 30, 30, 30]
							}
						},
						// 自定义变量，以数组形式传递渐变参数
						linearGradient: [0, 0, 0, 1,
							[{
									offset: 0,
									color: 'rgba(255, 129, 36, 0.4)'
								},
								{
									offset: 1,
									color: 'rgba(255, 129, 36, 1)'
								}
							]
						]
					}]
				},
			};
		},
		onLoad() {
			//页面初始化触发事件
			this.tiemOrder(0)
		},
		methods: {
			//自定义事件集合地
			// 返回上一页（哪来的哪去）
			navigateBack() {
				uni.navigateBack()
			},
			// 订单时间按钮
			tiemOrder(index) {
				let seriesData = []
				switch (index) {
					case 0:
						seriesData = [2.2]
						break;
					case 1:
					case 2:
					case 3:
						seriesData = [2.2, 3.8, 6.3, 1.7, 3.2, 4.3]
						break;
				}
				this.timeBtnIndex = index;
				const data = util.tiemOrder(index);
				[this.quotaOption, this.quantityOption].forEach(each => {
					each.xAxis[0].data = data;
					each.series[0].data = seriesData;
				})
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.redirectTo({
						url: '../statistics/ordered'
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
	.ordered {
		min-height: 100%;
		background: #F5F7FA;

		.ordered-data {
			position: relative;
			top: 100px;
			padding: 0px 12px;

			.kpi-data {
				background: linear-gradient(90deg, #206BF4 0%, #429BF2 100%);
				border-radius: 14px;
				display: flex;
				justify-content: space-between;
				text-align: center;
				color: #FFFFFF;
				font-size: 12px;
				padding: 30px 20px 20px 20px;
				box-shadow: 2px 20px 60px -15px #206BF4;

				.value-unit {
					.value {
						font-size: 20px;
						font-family: DIN;
						font-weight: bold;
					}

					.unit {
						opacity: 0.8;
						margin-left: 6px;
					}
				}

				.name {
					font-weight: 500;
					margin-top: 14px;
				}

				.num-name {
					margin-top: 32px;

					.nameNum {
						opacity: 0.6;
					}
				}
			}

			.time-btn {
				margin-top: 20px;
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

			.ordered-echarts {
				padding-top: 4px;

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

					#quotaEcharts,
					#quantityEcharts {
						height: 194px;
						margin-top: 11px;
					}
				}
			}
		}
	}
</style>
