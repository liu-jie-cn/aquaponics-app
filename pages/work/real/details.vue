<template>
	<view class="details">
		<view class="details-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">{{navigaTitle}}{{basicData.name}}</view>
		</view>
		<view class="details-data">
			<view class="details-alarm">
				<view class="btn-text">
					<text class="btn">报警</text>
					<text class="text">溶氧高于报警值，请立即处理！</text>
				</view>
				<view class="action">去处理></view>
			</view>
			<view class="sys-data">
				<view class="name-value">
					<view class="name">{{navigaTitle}}{{basicData.name}}</view>
					<view class="value">{{basicData.value}}</view>
				</view>
				<view class="icon-current">
					<view class="icon">
						<text class="iconfont icon-weizhi"></text>
						<text class="system">{{navigaTitle}}</text>
						<text v-if="basicData.their">|</text>
						<text class="their">{{basicData.their}}</text>
					</view>
					<view class="current">
						当前{{basicData.name}}
					</view>
				</view>
				<echarts id="sysEcharts" :option="option" style="height: 194px;"></echarts>
			</view>
			<view class="alarm-setup">
				<view class="title-submit">
					<view class="title">报警设置</view>
					<view class="submit">保存</view>
				</view>
				<view class="scope-value">
					<view class="title">报警阈值</view>
					<view class="input-value">
						<input class="uni-input" type="number" placeholder="报警下限值" />
						<view class="border"></view>
						<input class="uni-input" type="number" placeholder="报警上限值" />
					</view>
				</view>
				<view class="alarm-grade">
					<view class="title">报警等级</view>
					<picker @change="bindPickerChange" :value="index" :range="alarmData">
						<view class="uni-input">{{alarmData[index]}}</view>
					</picker>
				</view>
				<view class="inform">
					<view class="title">报警通知人员</view>
					<view class="inform-add">
						<view class="add-for">
							<view class="border"></view>
							<view class="name">艾克斯</view>
						</view>
						<view class="add-for">
							<view class="border">
								<view class="iconfont icon-icon-test"></view>
							</view>
							<view class="name">添加</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Echarts from '@/components/echarts/echarts.vue'
	import EchartsEl from '@/components/echarts/echarts-el.vue'
	export default {
		data() {
			return {
				index: 0,
				navigaTitle: "",
				basicData: {},
				option: {
					color: ['#2693FF'],
					grid: {
						top: 10,
						bottom: 25,
						left: 40,
						right: 4
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#2693FF'
							}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							color: '#5F5F5F'
						},
						data: []
					},
					yAxis: {
						type: 'value',
						max: 0,
						min: 0,
						axisLine: {
							show: false,
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							color: '#5F5F5F'
						},
						splitLine: {
							lineStyle: {
								color: '#F0F3F7'
							}
						}
					},
					series: [{
						data: [],
						name: "",
						type: 'line',
						smooth: true,
						lineStyle: {
							color: '#2693FF',
							width: 3
						},
					}]
				},
				alarmData: ['一级报警', '二级报警', '三级报警']
			};
		},
		components: {
			Echarts,
			EchartsEl
		},
		onLoad(params) {
			this.navigaTitle = params.navigaTitle
			this.basicData = JSON.parse(params.data);
			if (this.basicData.name == "电机") {
				this.ignalsData(params);
			} else {
				this.recordData(params);

			}
		},
		methods: {
			// 数据图表
			recordData(params) {
				const field = this.basicData.field;
				let room = ''
				switch (+params.index) {
					case 3:
						room = 'outdoor'
						break;
					case 4:
						room = 'indoor'
						break;
				}
				uni.request({
					url: this.url + '/ /' + this.basicData.id,
					header: {
						'authorization': params.token
					},
					success: (data) => {
						if (data.data.code == '200') {
							let seriesData = [];
							let xAxisData = [];
							(data.data.data).forEach(each => {
								if (each.recordTime) {
									xAxisData.push(each.recordTime.substr(11, 5))
								} else {
									xAxisData.push(each.testingTime.substr(11, 5))
								}
								seriesData.push(each[room + field])
							})
							this.option.xAxis.data = xAxisData.reverse();
							this.option.yAxis.max = Math.max(...seriesData);
							this.option.yAxis.min = Math.min(...seriesData);
							this.option.series[0].name = this.basicData.name;
							this.option.series[0].data = seriesData.reverse();
						}
					}
				})
			},
			// 电机图标
			ignalsData(params) {
				uni.request({
					url: this.url + '/record/di/' + this.basicData.id,
					header: {
						'authorization': params.token
					},
					success: (data) => {
						console.log(data)
					}
				})
			},
			// 实时数据-下拉框
			bindPickerChange(e) {
				this.index = e.target.value
			},
			/**
			 * 点击事件
			 * @param {Object} params
			 */
			echartsClick(params) {
				console.log('点击数据', params)
			},
			// 返回上一页（哪来的哪去）
			navigateBack() {
				uni.navigateBack()
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: '../index/index'
					});
				}, 1000);
			},
		}
	};
</script>

<style lang="less">
	.details {
		min-height: 100%;
		background: #F5F7FA;

		.details-tabBar {
			width: calc(100% - 24px);
			height: 44px;
			position: fixed;
			top: 0px;
			padding: 40px 12px 5px 12px;
			background: #FFFFFF;


			.icon-jiantou-left {
				width: 5%;
				position: absolute;
				font-weight: bolder;
				line-height: 44px;

			}

			.tabBar-title {
				line-height: 44px;
				color: #111111;
				font-size: 18px;
				font-weight: bolder;
				text-align: center;
			}
		}
		.details-data{
			position: relative;
			top: 89px;
		}
		.details-alarm {
			height: 28px;
			line-height: 28px;
			display: flex;
			justify-content: space-between;
			padding: 8px 12px;
			ma font-size: 12px;

			.btn {
				width: 35px;
				height: 18px;
				border-radius: 4px;
				color: #FFFFFF;
				padding: 3px 6px;
				background: #FF9C38;
				margin-right: 8px;
			}

			.action {
				color: #FF9C38
			}
		}

		.alarm-setup,
		.sys-data {
			margin: 0px 15px;
			padding: 20px 12px;
			border-radius: 8px;
			background: #FFFFFF;
		}

		.sys-data {
			.name-value {
				display: flex;
				justify-content: space-between;

				.name {
					font-size: 20px;
					font-weight: bold;
				}

				.value {
					font-size: 18px;
					font-weight: bold;
					font-family: DINBLOD;
				}
			}

			.icon-current {
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				margin-top: 16px;

				.icon {
					color: #5F5F5F;

					.icon-weizhi {
						color: #CCCCCC;
					}

					.system {
						margin: 0px 5px;
					}

					.their {
						margin-left: 5px;
					}
				}

				.current {
					color: #111111;
				}
			}

			#sysEcharts {
				margin-top: 20px;
			}
		}

		.alarm-setup {
			margin-top: 10px;

			.title-submit {
				display: flex;
				justify-content: space-between;

				.title {
					color: #111111;
					font-size: 18px;
					font-weight: bold;
				}

				.submit {
					line-height: 26px;
					color: #2693FF;
					font-size: 12px;
				}
			}

			.scope-value {
				margin-top: 20px;

				.title {
					color: #111111;
					font-size: 14px;
					font-weight: 500;
				}

				.input-value {
					display: flex;
					position: relative;
					height: 34px;
					margin-top: 17px;
					// justify-content: space-between;

					input {
						width: 145px;
						height: 34px;
						border: 1px solid #E8ECF0;
						border-radius: 4px;
						padding-left: 10px;
					}

					.border {
						width: 28px;
						height: 1px;
						position: relative;
						top: 50%;
						transform: translateY(-50%);
						margin: 0px 5px;
						border-bottom: 1px #E8ECF0 solid;
					}
				}
			}

			.alarm-grade {
				margin-top: 20px;

				.title {
					color: #111111;
					font-size: 14px;
					font-weight: 500;
				}

				.uni-input {
					line-height: 34px;
					margin-top: 17px;
					padding-left: 10px;
					border: 1px solid #E8ECF0;
					border-radius: 4px;
				}
			}

			.inform {
				margin-top: 20px;

				.title {
					color: #111111;
					font-size: 14px;
					font-weight: 500;
				}

				.title:after {
					content: '(仅限APP推送)'; //可插入文本
					color: #99999A
				}

				.inform-add {
					display: flex;
					margin-top: 15px;

					.add-for {
						text-align: center;

						.border {
							margin-bottom: 8px;
						}

						.name {
							color: #111111;
							font-size: 14px;
						}
					}

					.add-for:not(:last-child) {
						margin-right: 22px;
					}

					.add-for:first-child .border {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						background: #2693FF;
					}

					.add-for:last-child .border {
						width: 40px;
						height: 40px;
						line-height: 40px;
						color: #C2C7CC;
						border-radius: 20px;
						border: 1px #E8ECF0 solid;

						.iconfont {
							font-size: 30px;
						}
					}
				}
			}
		}
	}
</style>
