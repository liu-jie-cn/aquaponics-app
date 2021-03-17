<template>
	<view class="detection">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="iconfont icon-tongji" @click="statisticsRoutingHop()"></view>
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
				<datePicker :placeholderClass="true" timeType="month" @change="timeMmonth($event)" placeholder="检测时间" class="detection-date-picker"></datePicker>
			</view>
			<view class="split" style="left: 50%;"></view>
		</view>
		<view class="null-view"></view>
		<view class="detection-data">
			<view class="hint"></view>
			<view class="for-data">
				<uni-swipe-action style="width: 100%">
					<view v-for="(item,index) in detectionData" :key="index">
						<uni-swipe-action-item style="width: 100%;" :disabled="item.swipe" :right-options="options" @click="bindClick(item)">
							<view class="for" style="width: 100%;">
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
						</uni-swipe-action-item>
					</view>
				</uni-swipe-action>
			</view>
		</view>
		<view class="detection-add" @click="addDetectionData">
			<text class="iconfont  icon-icon-test"></text>
		</view>
		<l-modal ref="customModal" modalTitle="数据修改" @onClickConfirm="confirm">
			<template>
				<view class="input-data">
					<view class="title">{{modelData.system}}-{{modelData.point}}</view>
					<input class="point-value" type="number" :value="modelData.value" @input="search($event)" />
				</view>
			</template>
		</l-modal>
		<quick-message ref="message"></quick-message>
	</view>
</template>
<script>
	import datePicker from '../../../components/dy-Date/dy-Date.vue'
	import lModal from '@/components/l-modal/l-modal.vue'
	import util from "../../../static/js/util.js"
	export default {
		name: '',
		props: {},
		components: {
			datePicker,
			lModal
		},
		data() {
			return {
				//绑定的数据
				token: '',
				time: '',
				modelData: {},
				options: [{
					text: '修改',
					style: {
						position: "relative",
						top: "50%",
						transform: "translateY(-45%)",
						height: "80px",
						backgroundColor: '#007aff'
					}
				}],
				selectData: [{
					name: '检测地点',
					id: [],
					data: ['']
				}],
				detectionFild: [{
						name: '亚硝酸',
						fild: "ycgsCheckDataHno3",
						unit: 'mg/L'
					},
					{
						name: '硝酸盐',
						fild: "ycgsCheckDataNo2",
						unit: 'mg/L'
					},
					{
						name: '氨氮',
						fild: "ycgsCheckDataNh3nh4",
						unit: 'mg/L'
					},
					{
						name: '硫化氢',
						fild: "ycgsCheckDataH2s",
						unit: 'mg/L'
					},
					{
						name: '盐度',
						fild: "ycgsCheckDataSalinity",
						unit: 'mg/L'
					},
					{
						name: 'PH',
						fild: "ycgsCheckDataPh",
						unit: ''
					}
				],
				detectionData: [],
				pointValue: 0
			};
		},
		onLoad() {
			//页面初始化触发事件
			uni.getStorage({
				key: 'token',
				success: (e) => {
					if (e.data) {
						this.token = e.data
						// 检测点列表
						this.checkPointAll()
						// 全谱的检测数据
						this.checkPointCheckData()
					}
				},
				fail: (e) => {
					uni.reLaunch({
						url: '../../login/login'
					});
				}
			})

		},
		methods: {
			//自定义事件集合地
			// 获取对话框input值
			search(e) {
				// do sth
				this.pointValue = e.target.value;
			},
			// 对话框确认
			confirm() {
				let link = {
					ycgsCheckPointId: this.modelData.pointId,
					ycgsCheckDataId: this.modelData.id,
					ycgsCheckDataUserName: this.modelData.username,
					ycgsCheckDataTime: util.datastime('nyr'),
				}
				link[this.modelData.filed] = +this.pointValue;
				uni.request({
					url: this.url + '/checkPoint/checkData',
					method: "put",
					header: {
						'authorization': this.token
					},
					data: link,
					success: (data) => {
						if (data.data.code == 200) {
							this.$refs.message.show({
								msg: data.data.message,
							})
						} else {
							this.$refs.message.show({
								icon: "warn",
								iconSize: 18,
								iconColor: '#F6635F',
								msg: "已超时无法修改",
								customStyle: { //自定义样式
									color: '#FFFFFF', //字体图标色
									backgroundColor: 'rgba(0,0,0,.5)' //背景色
								},
							})
						}
						this.checkPointCheckData();
					}
				})
			},
			// 滑动按钮点击
			bindClick(data) {
				this.modelData = data;
				this.$refs['customModal'].showModal()
			},
			//返回上一页
			navigateBack() {
				uni.navigateBack()
			},
			// append 返回方法
			otherFun() {
				this.checkPointCheckData();
			},
			// 检测点列表--检测地点内容
			checkPointAll() {
				uni.request({
					url: this.url + '/checkPoint/all/point',
					header: {
						'authorization': this.token
					},
					success: (data) => {
						if (data.data.code == 200) {
							this.selectData[0].data = (data.data.data).map(map => {
								this.selectData[0].id.push(map.ycgsCheckSystemId)
								return map.ycgsCheckSystemName
							})
						}
					}
				})
			},
			// 全部的检测数据
			checkPointCheckData() {
				let data = {
					ycgsCheckSystemId: this.system,
					ycgsCheckDataTime: this.time
				};
				this.detectionData = [];
				uni.request({
					url: this.url + '/checkPoint/checkData',
					header: {
						'authorization': this.token
					},
					data: data,
					success: (data) => {
						if (data.data.code == 200) {
							(data.data.data).forEach(each => {
								const key = Object.keys(each);
								const val = Object.values(each);
								key.forEach((keys, index) => {
									const fill = this.detectionFild.filter(fill => fill.fild === keys)[0];
									if (fill && val[index]) {
										const msec = new Date().getTime() - new Date(each.ycgsCheckSubmitTime).getTime();
										this.detectionData.push({
											id: each.ycgsCheckDataId,
											name: fill.name,
											value: val[index],
											unit: fill.unit,
											swipe: msec >= 3e5 ? true : false,
											// swipe: true,
											filed: keys,
											username: each.ycgsCheckDataUserName,
											time: each.ycgsCheckDataTime,
											pointId: each.ycgsCheckPointId,
											point: each.ycgsCheckPointName,
											system: each.ycgsCheckSystemName
										});
									}
								})
							})
							this.detectionData.reverse();
						}
					}
				})
			},
			// 检测数据
			statisticsRoutingHop() {
				uni.navigateTo({
					url: '../statistics/monitoring'
				});
			},
			// 添加数据
			addDetectionData() {
				uni.navigateTo({
					url: './append'
				});
			},
			// 下拉框
			bindPickerChange(e, index) {
				let value = e.target.value;
				this.selectData[index].name = this.selectData[index].data[value];
				this.system = this.selectData[index].id[value]
				this.checkPointCheckData()
			},
			// 时间选择
			timeMmonth(e) {
				this.time = e;
				this.checkPointCheckData()
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
			top: 87px;
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

		.null-view {
			width: 100%;
			height: 147px;
		}

		.detection-data {
			position: relative;
			// margin-top: 147px;
			padding-bottom: 10px;
			// top: 147px;

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
			position: fixed;
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

		.input-data {
			.point-value {
				border: 1px solid #E8ECF0;
				border-radius: 4px;
				padding: 8px;
				margin-top: 10px;
				font-size: 14px;
			}
		}
	}
</style>
