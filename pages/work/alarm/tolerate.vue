<template>
	<view class="tolerate">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">报警详情</view>
		</view>
		<view class="tolerate-data">
			<view class="data">
				<view class="center-estate">
					<view class="center">{{alarmData.name}}</view>
					<!-- 				<view class="center">溶氧值异常：3mg/L</view> -->
					<view class="estate">一级报警</view>
				</view>
				<view class="name-system">
					<view class="name">报警地点</view>
					<view class="system">{{alarmData.system}}</view>
				</view>
				<view class="scope-value">
					<view class="scope">正常范围</view>
					<!-- <view class="value">10~30</view> -->
					<view class="value"></view>
				</view>
			</view>
			<view class="tolerate-timeline">
				<timelineItem>
					<view class="tripItem">
						<view class="title">溶氧报警</view>
						<view class="tips">2021-02-02 15:01:12</view>
					</view>
				</timelineItem>
				<timelineItem :color="relieve?'':'#14E39E'">
					<view class="tripItem">
						<view class="title" :style="{'color':relieve?'':'#14E39E'}">报警已处理</view>
						<view class="tips">2021-02-02 15:01:12</view>
						<view class="tolerate-centter">
							<view class="name">
								<text class="title">处理人员</text>
								<text class="value">艾克斯</text>
							</view>
							<view class="mode">
								<text class="title">处理方式</text>
								<text class="value">供氧设备正常，阀门开大</text>
							</view>
						</view>
					</view>
				</timelineItem>
				<timelineItem v-if="relieve" color="#2693FF">
					<view class="tripItem">
						<view class="title" style="color:#2693FF">溶氧报警</view>
						<view class="tips">2021-02-02 15:01:12</view>
					</view>
				</timelineItem>
			</view>
		</view>
	</view>
</template>
<script>
	import timeline from '../../../components/chenbin-timeline/timeLine.vue'
	import timelineItem from '../../../components/chenbin-timeline/timelineItem.vue'
	export default {
		name: '',
		props: {},
		components: {
			timeline,
			timelineItem
		},
		data() {
			return {
				//绑定的数据
				relieve: false,
				alarmData: [],
			};
		},
		onLoad(params) {
			//页面初始化触发事件
			this.relieve = params.relieve == 'false' ? false : true;
			this.alarmData = JSON.parse(params.data);
		},
		methods: {
			//自定义事件集合地
			//返回上一级
			navigateBack() {
				uni.navigateBack()
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: '../alarm/tolerate'
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
	.tolerate {
		height: 100%;
		background: #F5F7FA;
		.tolerate-data{
			position: relative;
			top: 82px;
		}
		.data {
			height: 84px;
			background: #FFFFFF;
			border-radius: 8px;
			margin: 0px 12px 8px 12px;
			padding: 20px 12px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.center-estate {
				display: flex;
				justify-content: space-between;

				.center {
					color: #111111;
					font-size: 17px;
					font-weight: 500;
				}

				.estate {
					width: 56px;
					height: 20px;
					line-height: 20px;
					text-align: center;
					color: #FFFFFF;
					background: #FF9C38;
					font-size: 12px;
					border-radius: 8px 0px 8px 0px;
				}
			}

			.scope-value,
			.name-system {
				display: flex;

				.scope,
				.name {
					color: #5F5F5F;
					font-size: 14px;
					margin-right: 12px;
				}

				.value,
				.system {
					color: #111111;
					font-size: 14px;
				}
			}
		}

		.tolerate-timeline {
			margin: 0px 12px;
			padding: 20px 12px 0px 12px;
			background: #FFFFFF;
			border-radius: 8px;
			height: calc(100% - 268px);

			.tripItem {
				.title {
					color: #111111;
					font-size: 14px;
				}

				.tips {
					color: #99999A;
					font-size: 12px;
					margin-top: 12px;
				}

				.tolerate-centter {
					background: #2693FF;
					box-shadow: 0px 8px 11px 0px rgba(38, 147, 255, 0.2);
					border-radius: 8px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 20px 12px;
					font-size: 14px;
					color: #FFFFFF;
					margin-top: 20px;

					.title {
						color: #FFFFFF;
						opacity: 0.6;
						margin-right: 12px;
					}

					.mode {
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>
