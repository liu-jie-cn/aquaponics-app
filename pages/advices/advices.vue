<template>
	<view class="advices">
		<view class="page-head">我的消息</view>
		<view class="alram-data">
			<view class="for-data" v-for="(item,index) in alarmData" :key="index">
				<view class="img-center">
					<image class="img" :src="'../../static/img/'+item.img+'.png'"></image>
					<view class="title-center">
						<view class="title">{{item.title}}</view>
						<view class="center">{{item.center}}</view>
					</view>
				</view>
				<view class="time-icon">
					<view class="time">{{item.time}}</view>
					<view class="icon"></view>
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
				token: '',
				alarmData: []
			};
		},
		onLoad() {
			//页面初始化触发事件
			uni.getStorage({
				key: 'token',
				success: (e) => {
					if (e.data) {
						this.token = e.data
						this.alarmListData()
					}
				},
				fail: (e) => {
					uni.reLaunch({
						url: '../login/login'
					});
				}
			})
		},
		methods: {
			//自定义事件集合地
			// 告警列表
			alarmListData() {
				uni.request({
					url: this.url + '/index/alarm/3/1',
					header: {
						'authorization': this.token
					},
					success: (data) => {
						if (data.data.code == 200) {
							this.alarmData.length == 0;
							(data.data.data.data).forEach(each => {
								this.data.forEach(map => {
									if (Object.values(map)[0].indexOf(each.alarmDeviceId) > -1) {
										let motor = "";
										if (each.ycgsAlarmInfo.alarmInfoName == "电机") {
											motor = each.ycgsAlarmInfo.alarmInfoType
										}
										each.ycgsAlarmInfo['alarmCenter'] = Object.keys(map)[0] + each.ycgsAlarmInfo.alarmInfoName + motor
									}
								})
								this.alarmData.push({
									img: each.ycgsAlarmInfo.alarmInfoType.indexOf('开关') > -1 ? 'inform' : 'alarm-info',
									title: each.ycgsAlarmInfo.alarmInfoType,
									center: each.ycgsAlarmInfo.alarmCenter,
									time: each.alarmTime
								});
							})
						}
					}
				})
			},
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.redirectTo({
						url: '../advices/advices'
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
	.advices {
		position: relative;

		.page-head {
			position: fixed;
			top: 0px;
			z-index: 999;
			background: #FFFFFF;
		}

		.alram-data {
			position: relative;
			top: 100px;
			padding: 0px 12px;

			.for-data {
				// height: 47px;
				display: flex;
				justify-content: space-between;
				margin-top: 26px;

				.img-center {
					display: flex;
				}

				.img {
					height: 47px;
					width: 47px;
					border-radius: 25px;
					margin-right: 10px;
				}

				.title-center {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-weight: 500;

					.title {
						color: #111111;
						font-size: 17px;
					}

					.center {
						color: #5F5F5F;
						font-size: 14px;
					}
				}

				.time-icon {
					position: relative;

					.time {
						margin-bottom: 10px;
						font-size: 12px;
						color: #5F5F5F;
						width: 120px;
					}

					.icon {
						position: absolute;
						height: 8px;
						width: 8px;
						background: #FF3F3F;
						border-radius: 4px;
						right: 0px;
					}
				}
			}

			.for-data:first-child {
				margin-top: 0px;
			}
		}
	}
</style>
