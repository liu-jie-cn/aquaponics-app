<template>
	<view class="feed">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="iconfont icon-tongji"></view>
			<view class="tabBar-title">喂食管理</view>
		</view>
		<view class="feed-select">
			<view class="select" v-for="(item,index) in selectData" :key="index">
				<picker @change="bindPickerChange($event,index)" :value="item.name" :range="item.data">
					<view class="uni-input">{{item.name}}</view>
				</picker>
				<image class="monitor-image" src="../../../static/svg/xia.svg" mode=""></image>
			</view>
		</view>
		<view class="feed-data">
			<view class="hint">只展示近3天的数据</view>
			<view class="data-for">
				<view class="for" v-for="(item,index) in feedData" :key="index">
					<view class="title">{{item.title}}</view>
					<view class="value-person">
						<view class="value">
							<text class="key">喂食重量</text>
							<text class="value">{{item.value}}</text>
						</view>
						<view class="person">
							<text class="key">操作人员</text>
							<text class="value">{{item.person}}</text>
						</view>
					</view>
					<view class="time">
						<text class="key">喂食时间</text>
						<text class="value">{{item.time}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="feed-add" @click="addFeedData">
			<text class="iconfont  icon-icon-test"></text>
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
				selectData: [{
					name: '喂食地点',
					data: ['喂食地点1', '喂食地点2', '喂食地点3']
				}],
				feedData: [{
						title: '1号系统-3号桶',
						value: '5.3斤',
						person: '米克斯',
						time: '2021-02-01 11:58'
					},
					{
						title: '1号系统-2号桶',
						value: '5.3斤',
						person: '米克斯',
						time: '2021-02-01 11:58'
					},
					{
						title: '2号系统-1号桶',
						value: '5.3斤',
						person: '米克斯',
						time: '2021-02-01 11:58'
					}
				]
			};
		},
		onLoad() {
			//页面初始化触发事件
		},
		methods: {
			//自定义事件集合地
			// 下拉框
			bindPickerChange(e, index) {
				let value = e.target.value;
				this.selectData[index].name = this.selectData[index].data[value];
			},
			addFeedData() {
				uni.navigateTo({
					url: './make'
				});
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
						url: '../feed/index'
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
	.feed {
		min-height: 100%;
		background: #F5F7FA;
		position: relative;

		.feed-select {
			width: calc(100% - 54px);
			display: flex;
			justify-content: center;
			text-align: center;
			padding: 15px 27px;
			background: #FFFFFF;
			position: fixed;
			top: 70px;
			z-index: 999;

			.select {
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
		}
		.feed-data{
			position: relative;
			top: 130px;
		}
		.data-for {
			padding: 0px 12px;

			.for {
				background: #FFFFFF;
				border-radius: 8px;
				padding: 16px 13px 0px 13px;

				.title,
				.value-person,
				.time {
					padding-bottom: 20px;
					color: #111111;
					font-size: 14px;
					font-weight: 500;
				}

				.title {
					font-size: 17px;
				}

				.value-person {
					display: flex;
				}

				.value {
					width: 60%;
				}

				.key {
					color: #5F5F5F;
					margin-right: 10px;
				}
			}

			.for:not(:first-child) {
				margin-top: 8px;
			}
		}

		.feed-add {
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
