<template>
	<view class="order">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="iconfont icon-tongji"></view>
			<view class="tabBar-title">订单数据</view>
		</view>
		<view class="order-data">
			<view class="hint">只展示近30天订单</view>
			<view class="order-for">
				<view class="for" v-for="(item,index) in orderData" :key="index" @click="orderParticulars(item,index)">
					<view class="title">某客户采购订单</view>
					<view class="name-prices">
						<view class="name">
							<text class="key">客户姓名</text>
							<text class="value">{{item.name}}</text>
						</view>
						<view class="prices">
							<text class="key">订单总价</text>
							<text class="value-unit">
								<text class="value">{{item.prices}}</text>
								<text class="unit">{{item.unit}}</text>
							</text>
						</view>
					</view>
					<view class="variety">
						<text class="key">采购产品</text>
						<text class="value">{{item.variety}}</text>
					</view>
					<view class="time">
						<text class="key">采购时间</text>
						<text class="value">{{item.time}}</text>
					</view>
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
				orderData: [{
						name: '刘明明',
						variety: '加州鲈鱼、生菜、白菜、芹菜',
						prices: '8.94',
						unit: '万',
						time: '2021-02-01 10:36'
					},
					{
						name: 'AIKES',
						variety: '加州鲈鱼、生菜、白菜',
						prices: '5.20',
						unit: '万',
						time: '2021-02-01 10:36'
					},
					{
						name: '王志鹏',
						variety: '加州鲈鱼、生菜',
						prices: '9.00',
						unit: '万',
						time: '2021-02-01 10:36'
					},
				]
			};
		},
		onLoad() {
			//页面初始化触发事件
		},
		methods: {
			//自定义事件集合地
			// 返回上一页（哪来的哪去）
			navigateBack() {
				uni.navigateBack()
			},
			//订单详情页面跳转
			orderParticulars(item, index) {
				uni.navigateTo({
					url: './details'
				});
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: './oreal/index'
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
	.order {
		min-height: 100%;
		background: #F5F7FA;
		.order-data{
			position: relative;
			top: 70px;
		}
		.order-for {
			.for {
				background: #FFFFFF;
				border-radius: 8px;
				margin: 0px 12px;
				padding: 20px 12px;
				color: #111111;

				.name-prices {
					display: flex;
					justify-content: space-between;

					.prices {
						width: 45%;
					}
				}

				.name-prices,
				.variety,
				.time {
					margin-top: 20px;
				}

				.title {
					font-size: 17px;
				}

				.key {
					color: #5F5F5F;
				}

				.value {
					font-size: 14px;
					margin-left: 12px;
				}

				.value-unit {
					.value {
						color: #FF9C38;
						font-weight: bold;
						font-family: DIN;
					}
				}
			}

			.for:not(:first-child) {
				margin-top: 8px;
			}
		}
	}
</style>
