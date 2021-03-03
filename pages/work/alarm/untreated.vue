<template>
	<view class="untreated">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">报警详情</view>
		</view>
		<view class="untreated-data">
			<view class="data">
				<view class="center-estate">
					<view class="center">溶氧值异常：3mg/L</view>
					<view class="estate">一级报警</view>
				</view>
				<view class="name-system">
					<view class="name">报警地点</view>
					<view class="system">1号系统</view>
				</view>
				<view class="scope-value">
					<view class="scope">正常范围</view>
					<view class="value">10~30</view>
				</view>
			</view>
			<view class="untreated-timeline">
				<timelineItem>
					<view class="tripItem">
						<view class="title">溶氧报警</view>
						<view class="tips">2021-02-02 15:01:12</view>
					</view>
				</timelineItem>
				<timelineItem color="#FF9C38">
					<view class="tripItem">
						<view class="title" style="color:#FF9C38">报警未处理</view>
					</view>
					<view class="lifter-btn" @click="lifterNavigateTo">
						去处理
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
			};
		},
		onLoad() {
			//页面初始化触发事件
		},
		methods: {
			//自定义事件集合地
			//返回上一级
			navigateBack() {
				uni.navigateBack()
			},
			// 处理单页面跳转
			lifterNavigateTo() {
				uni.navigateTo({
					url: './dispose'
				});
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: '../alarm/untreated'
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
	.untreated {
		height: 100%;
		background: #F5F7FA;

		.untreated-data {
			position: relative;
			top: 82px
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

		.untreated-timeline {
			margin: 0px 12px;
			padding: 20px 12px 0px 12px;
			background: #FFFFFF;
			border-radius: 8px;
			height: calc(100% - 268px);
		}

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
		}

		.lifter-btn {
			width: 94px;
			height: 36px;
			line-height: 36px;
			text-align: center;
			color: #FFFFFF;
			background: #FF9C38;
			box-shadow: 0px 3px 5px 0px rgba(255, 156, 56, 0.3);
			border-radius: 18px;
			margin-top: 12px;
		}
	}
</style>
