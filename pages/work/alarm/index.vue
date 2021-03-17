<template>
	<view class="alarm">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="iconfont icon-tongji"></view>
			<view class="tabBar-title">报警管理</view>
		</view>
		<view class="alarm-select">
			<view class="select" v-for="(item,index) in selectData" :key="index">
				<picker @change="bindPickerChange($event,index)" :value="item.name" :range="item.data">
					<view class="uni-input">{{item.name}}</view>
				</picker>
				<image class="monitor-image" src="../../../static/svg/xia.svg" mode=""></image>
			</view>
			<view class="split" style="left: 33%;"></view>
			<view class="split" style="left: 66%;"></view>
		</view>
		<view class="alarm-data">
			<view class="hint">只展示近3天的数据</view>
			<view class="data">
				<view class="for" v-for="(item,index) in alarmData" :key="index" @click="alarmdispose(item)">
					<view class="name-system">
						<view class="name">{{item.name}}<text v-if="item.value">：{{item.value}}</text></view>
						<view class="system">
							<text class="iconfont icon-weizhi"></text>
							{{item.system}}
						</view>
					</view>
					<view class="type-time">
						<view class="type" :style="{'color':item.color}">{{item.type}}</view>
						<view class="time">{{item.time}}</view>
					</view>
					<view class="border" :style="{'background':item.color}"></view>
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
				selectData: [{
						name: '报警类型',
						data: ['类型1', '类型2', '类型3']
					},
					{
						name: '报警等级',
						data: ['等级1', '等级2', '等级3']
					},
					{
						name: '处理状态',
						data: ['状态1', '状态2', '状态3']
					},
				],
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
						url: '../../login/login'
					});
				}
			})
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
			// 告警列表
			alarmListData() {
				uni.request({
					url: this.url + '/index/alarm/3/1',
					header: {
						'authorization': this.token
					},
					success: (data) => {
						if (data.data.code == 200) {
							this.alarmData.length = 0;
							(data.data.data.data).forEach(each => {
								this.data.forEach(map => {
									if (Object.values(map)[0].indexOf(each.alarmDeviceId) > -1) {
										let motor = "";
										if (each.ycgsAlarmInfo.alarmInfoName == "电机") {
											motor = each.ycgsAlarmInfo.alarmInfoType
										}
										each['system'] = Object.keys(map)[0]
									}
								})
								const color = {
									'未处理': '#FF9C38',
									'已处理': '#14E39E',
									'已解除': '#2693FF'
								};
								this.alarmData.push({
									name: each.ycgsAlarmInfo.alarmInfoType,
									value: '',
									system: each.system,
									type: each.ycgsAlarmHandle.handleStatus,
									color: color[each.ycgsAlarmHandle.handleStatus],
									time: each.alarmTime
								})
							})
						}
					}
				})
			},
			//数据处理分类
			alarmdispose(data) {
				switch (data.type) {
					case '未处理':
						uni.navigateTo({
							url: './untreated?data=' + JSON.stringify(data) + ''
						});
						break;
					case '已处理':
						uni.navigateTo({
							url: './tolerate?relieve=false&data=' + JSON.stringify(data) + ''
						});
						break;
					case '已解除':
						uni.navigateTo({
							url: './tolerate?relieve=true&data=' + JSON.stringify(data) + ''
						});
						break;
				}
			}
		},
		// 下拉刷新页面
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
				uni.redirectTo({
					url: '../alarm/index'
				});
			}, 1000);
		},
		beforeDestroy() {
			//组件销毁之前调用，取消订阅
		}
	};
</script>
<style lang="less">
	.alarm {
		height: 100%;
		background: #F5F7FA;

		.alarm-select {
			width: calc(100% - 56px);
			position: fixed;
			top: 87px;
			display: flex;
			justify-content: space-between;
			padding: 15px 27px;
			background: #FFFFFF;
			z-index: 999;

			.select {
				line-height: 29px;
				display: flex;
				font-size: 14px;

				.monitor-image {
					width: 30px;
					height: 20px;
					margin-top: 5px;
					color: #99999A;
				}
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

		.alarm-data {
			position: relative;
			top: 147px;

			.data {
				padding: 0px 12px;

				.for {
					height: 50px;
					display: flex;
					justify-content: space-between;
					background: #FFFFFF;
					border-radius: 8px;
					overflow: auto;
					position: relative;
					padding: 16px 14px 16px 10px;

					.name-system {
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.name {
							color: #111111;
							font-size: 17px;
							font-weight: 500;
						}


						.system {
							font-size: 12px;
							color: #5F5F5F;

						}

						.icon-weizhi {
							font-size: 12px;
							color: #CCCCCC;
							margin-right: 4px;
						}
					}

					.type-time {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						text-align: right;

						.type {
							font-size: 14px;
						}

						.time {
							color: #5F5F5F;
							font-size: 12px;
						}
					}

					.border {
						height: 100%;
						width: 2px;
						position: absolute;
						left: 0px;
						top: 0px
					}
				}

				.for:not(:first-child) {
					margin-top: 8px;
				}
			}
		}
	}
</style>
