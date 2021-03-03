<template>
	<view class="details">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBacks"></view>
			<view class="tabBar-title">订单详情</view>
		</view>
		<view class="details-data">
			<view class="details-for" v-for="(item,index) in orderData" :key="index" @click="orderParticulars(item,index)">
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
				<view class="inventory">
					<view class="key">采购清单</view>
					<view class="inventory-table">
						<view class="table-head">
							<view class="table-hd" v-for="(item,index) in tableHead" :key="index">{{item}}</view>
						</view>
						<view class="table-body">
							<view class="table-tr" v-for="(item,index) in tableData" :key="index">
								<view class="table-td" v-for="(data,num) in item" :key="num" :style="{'color':num==0||num==3?'#111111':'#5F5F5F'}">{{data}}</view>
							</view>
						</view>
					</view>
					<view class="aggregate">
						<text class="name">订单总计</text>
						<text class="sum">￥{{sum}}万</text>
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
				sum: 0,
				orderData: [{
					name: '刘明明',
					variety: '加州鲈鱼、生菜、白菜、芹菜',
					prices: '8.94',
					unit: '万',
					time: '2021-02-01 10:36'
				}],
				tableHead: ['产品种类', '单价', '重/数量', '总计'],
				tableData: [
					['加州鲈鱼', 40, '2000斤', '￥80,000'],
					['生菜', 200, '7茬', '￥1,400'],
					['白菜', 4, '1000斤', '￥4,000'],
					['芹菜', 4, '1000斤', '￥4,000'],
				]
			};
		},
		onLoad() {
			//页面初始化触发事件
			this.sum = this.tableData.map(map => {
				return +map[3].replace('￥', '').replace(',', '')
			}).reduce((total, num) => {
				return total + num;
			}, 0) / 10000
			console.log(this.sum)
		},
		methods: {
			//自定义事件集合地
			// 返回上一页（哪来的哪去）
			navigateBacks() {
				uni.navigateBack()
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: './oreal/details'
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
	.details {
		min-height: 100%;
		background: #F5F7FA;

		.details-data {
			position: relative;
			top: 78px;

			.details-for {
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
				.inventory,
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
		}

		.inventory-table {
			border-radius: 8px 8px 0px 0px;
			overflow: auto;
			margin-top: 16px;

			.table-tr,
			.table-head {
				display: flex;
				justify-content: space-between;
				text-align: center;
			}

			.table-head {
				background: #2693FF;
				color: #FFFFFF;
			}

			.table-hd:nth-child(1),
			.table-td:nth-child(1) {
				width: 30%;
			}

			.table-hd:nth-child(2),
			.table-td:nth-child(2) {
				width: 20%;
			}

			.table-hd:nth-child(3),
			.table-td:nth-child(3) {
				width: 25%;
			}

			.table-hd:nth-child(4),
			.table-td:nth-child(4) {
				width: 25%;
			}

			.table-hd,
			.table-td {
				width: 25%;
			}

			.table-hd {
				padding: 8px 0px;
				font-size: 12px;
			}

			.table-td {
				padding: 13px 0px;
				font-size: 14px;
			}

			.table-tr {
				border-bottom: 1px solid rgba(38, 147, 255, 0.08);
			}
		}

		.aggregate {
			font-size: 14px;
			text-align: right;
			margin: 20px 26px 17px 0px;

			.sum {
				color: #2693FF;
				margin-left: 20px;
			}
		}
	}
</style>
