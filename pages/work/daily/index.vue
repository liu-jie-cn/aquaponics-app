<template>
	<view class="detection">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="iconfont icon-tongji"></view>
			<view class="tabBar-title">日常检测</view>
		</view>
		<view class="detection-select">
			<view class="select" v-for="(item,index) in selectData" :key="index">
				<picker @change="bindPickerChange($event,index)" :value="item.name" :range="item.data">
					<view class="uni-input">{{item.name}}</view>
				</picker>
				<image class="monitor-image" src="../../../static/svg/xia.svg" mode=""></image>
			</view>
			<view class="time">
				<datePicker :placeholderClass="true" timeType="month" placeholder="检测时间" class="detection-date-picker"></datePicker>
				<!-- <uni-datetime-picker></uni-datetime-picker> -->
			</view>
			<view class="split" style="left: 50%;"></view>
		</view>
		<view class="detection-data">
			<view class="hint">只展示近3天的数据</view>
			<view class="for-data">
				<view class="for" v-for="(item,index) in detectionData" :key="index">
					<view class="name-system">
						<view class="name">{{item.name}}</view>
						<view class="system"><text class="iconfont icon-weizhi"></text>{{item.system}}</view>
					</view>
					<view class="value-time">
						<view class="value-unit">
							<view class="value">{{item.value}}</view>
							<view class="unit">{{item.unit}}</view>
						</view>
						<view class="time">{{item.time}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="detection-add" @click="addDetectionData">
			<text class="iconfont  icon-icon-test"></text>
		</view>
	</view>
</template>
<script>
	import datePicker from '../../../components/dy-Date/dy-Date.vue'
	export default {
		name: '',
		props: {},
		components: {
			datePicker
		},
		data() {
			return {
				//绑定的数据
				selectData: [{
					name: '检测项目',
					data: ['检测项目1', '检测项目2', '检测项目3']
				}],
				detectionData: [{
					name: '氨氮',
					value: '13.20',
					unit: 'mg/L',
					time: '2021-01-29 15:46',
					system: '1号系统'
				}, {
					name: '亚硝酸',
					value: '13.20',
					unit: 'mg/L',
					time: '2021-01-29 15:46',
					system: '1号系统'
				}, {
					name: '硫化氢',
					value: '13.20',
					unit: 'mg/L',
					time: '2021-01-29 15:46',
					system: '1号系统'
				}, {
					name: '盐度',
					value: '13.20',
					unit: 'mg/L',
					time: '2021-01-29 15:46',
					system: '1号系统'
				}, {
					name: 'PH',
					value: '13.20',
					unit: 'mg/L',
					time: '2021-01-29 15:46',
					system: '2号系统'
				}]
			};
		},
		onLoad() {
			//页面初始化触发事件

		},
		methods: {
			//自定义事件集合地
			//返回上一页
			navigateBack() {
				uni.navigateBack()
			},
			addDetectionData() {
				uni.navigateTo({
					url: './append'
				});
			},
			// 下拉框
			bindPickerChange(e, index) {
				let value = e.target.value;
				this.selectData[index].name = this.selectData[index].data[value];
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: '../daily/index'
					});
				}, 1000);
			}
		},
		beforeDestroy() {
			//组件销毁之前调用，取消订阅
		}
	};
</script>
<style lang="less">
	.detection {
		min-height: 100%;
		background: #F5F7FA;
		position: relative;

		.detection-select {
			width: calc(100% - 54px);
			display: flex;
			padding: 15px 27px;
			background: #FFFFFF;
			position: fixed;
			top: 70px;

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

		.detection-data {
			position: relative;
			top: 130px;

			.for-data {
				.for {
					display: flex;
					justify-content: space-between;
					padding: 15px 12px;
					margin: 0px 12px;
					background: #FFFFFF;
					border-radius: 8px;

					.name-system {
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.name {
							font-size: 17px;
							font-weight: 500;
							color: #111111;
						}

						.system {
							color: #5F5F5F;
							font-size: 12px;

							text {
								color: #CCCCCC;
								font-size: 12px;
								margin-right: 8px;
							}
						}
					}

					.value-time {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						text-align: right;
						font-size: 12px;

						.value {
							font-size: 18px;
							font-weight: bold;
							color: #111111;
							font-family: DINBLOD;
						}

						.unit {
							color: #99999A;
							margin-bottom: 6px;
						}

						.time {
							color: #5F5F5F
						}
					}
				}

				.for:not(:first-child) {
					margin-top: 8px;
				}
			}
		}

		.detection-add {
			width: 52px;
			height: 52px;
			background: linear-gradient(0deg, #2693FF 0%, #52B4FF 100%);
			box-shadow: 0px 3px 5px 0px rgba(38, 147, 255, 0.45);
			opacity: 0.96;
			border-radius: 50%;
			position: absolute;
			bottom: 25px;
			right: 12px;
			opacity: 0.7;

			.icon-icon-test {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #FFFFFF;
				font-size: 30px;
			}
		}
	}
</style>
