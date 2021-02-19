<template>
	<view class="advices">
		<view class="page-head">我的消息</view>
		<view class="alram-data">
			<view class="for-data" v-for="(item,index) in alarmData" :key="index">
				<view class="img-center">
					<view class="img"></view>
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
				alarmData: [{
					img: '',
					title: '报警信息',
					center: '2号系统溶氧值低于3mg/L',
					time: '14:47'
				}, {
					img: '',
					title: '系统通知',
					center: '某设备开启/关闭',
					time: '14:47'
				}]
			};
		},
		onLoad() {
			//页面初始化触发事件
			uni.getStorage({
				key: 'token',
				success: (e) => {
					if (e.data) {
						console.log()
						this.token = e.data

					}
				},
				fail: (e) => {
					this.loginToken()
				}
			})
		},
		methods: {
			//自定义事件集合地
		},
		beforeDestroy() {
			//组件销毁之前调用，取消订阅
		}
	};
</script>
<style lang="less">
	.advices {
		.page-head {
			font-size: 20px;
			font-weight: bold;
			color: #111111;
			line-height: 20px;
			text-align: center;
			margin-top: 20px;
			padding: 14px 0px;
			border-bottom: 1px solid #E8ECF0;
		}

		.alram-data {
			padding: 0px 24px;

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
					background: #F57464;
					border-radius: 25px;
					margin-right: 20px;
				}

				.title-center {
					.title {
						margin-bottom: 10px;
					}
				}

				.time-icon {
					position: relative;

					.time {
						margin-bottom: 10px;
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
		}
	}
</style>
