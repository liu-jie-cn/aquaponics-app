<template>
	<view class="timelineItem">
		<view class="timeItem">
			<view class="leftTime" v-show="leftTime">
				{{leftTime}}
			</view>
			<view class="line">
				<view class="out" :style="{background: color == '' ? '' : color}">
					<view class="inner" :style="{background: color == '' ? '' : color}"></view>
				</view>
			</view>
			<view class="rightContent">
				<slot></slot>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			leftTime: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped lang="less">
	.timelineItem {
		.timeItem {
			display: flex;

			.leftTime {
				width: 135rpx;
				padding: 0 10rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-right: 10rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.line {
				width: 1px;
				background: #111111;
				position: relative;
				left: 7px;

				.out {
					position: absolute;
					top: 0;
					left: 50%;
					transform: translateX(-50%);
					display: flex;
					justify-content: center;
					align-items: center;
					width: 16rpx;
					height: 16rpx;
					background: #111111;
					border-radius: 50%;
				}
			}

			.rightContent {
				flex: 1;
				padding: 0 10rpx 80rpx;
				margin-left: 34rpx;
				min-height: 50rpx;
			}
		}
	}

	.timelineItem:last-child {
		.line {
			width: 0px;
			background: rgba(204, 204, 204, 1);
			position: relative;
		}
	}
</style>
