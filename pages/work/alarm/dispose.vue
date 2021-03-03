<template>
	<view class="dispose">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">报警处理</view>
		</view>
		<view class="dispose-data">
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
			<view class="dispose-form">
				<view class="name">
					<view class="title">处理人员<text>*</text></view>
					<input class="name-input" type="text" v-model="disposeName" />
				</view>
				<view class="time">
					<view class="title">处理时间<text>*</text></view>
					<uni-datetime-picker class="time-input" v-model="disposeTime"></uni-datetime-picker>
				</view>
				<view class="mode">
					<view class="title">处理方式<text>*</text></view>
					<textarea class="mode-input" v-model="disposeMode" /></textarea>
				</view>
			</view>
			<button class="submit" type="default" @click="submitData">提交</button>
		</view>
	</view>
</template>
<script>
	import util from '../../../static/js/util.js'
	export default {
		name: '',
		props: {},
		data() {
			return {
				//绑定的数据
				disposeName: '艾克斯',
				disposeTime: util.datastime('yous'),
				disposeMode: '供氧设备正常，阀门开大',

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
			//数据提交
			submitData() {
				console.log(this.disposeName)
				console.log(this.disposeTime)
				console.log(this.disposeMode)
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: '../alarm/dispose'
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
	.dispose {
		min-height: 100%;
		background: #F5F7FA;
		.dispose-data{
			position: relative;
			top: 80px;
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

		.dispose-form {
			margin: 0px 12px;
			padding: 20px 12px 60px 12px;
			background: #FFFFFF;
			border-radius: 8px;
			height: calc(100% - 350px);

			.title {
				font-size: 14px;
				font-weight: 500;
				color: #111111;
			}

			text {
				color: #FF6344;
				position: relative;
				top: 3px;
				left: 5px;
			}

			.name-input,
			.time-input,
			.mode-input {
				height: 34px;
				line-height: 34px;
				border: 1px solid #E8ECF0;
				border-radius: 4px;
				font-size: 14px;
				font-weight: 500;
				margin: 12px 0px 16px 0px;
				padding-left: 8px;
			}

			.mode-input {
				// width: 100%;
				width: calc(100% - 8px);
				height: 68px;
				margin: 0px;
				line-height: normal;
				padding-top: 10px;
				margin-top: 12px;
			}
		}

		.submit {
			height: 44px;
			background: #2693FF;
			color: #FFFFFF;
			font-size: 18px;
			margin: 0px 12px;
			border-radius: 22px;
			margin-top: 30px;
		}

		.submit:active {
			background: rgba(38, 147, 255, 0.5);
		}
	}
</style>
