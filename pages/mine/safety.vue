<template>
	<view class="safety">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">账号安全</view>
		</view>
		<view class="safety-data">
			<view class="for" v-for="(item,index) in safetyData" :key="index">
				<view class="icon-value">
					<icon class="icon" type="success" size="14" />
					<view class="name-value">
						<view class="name">{{item.name}}</view>
						<view class="value">{{item.value}}</view>
					</view>
				</view>
				<view class="btn">{{item.btn}}</view>
				<view class="border"></view>
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
				safetyData: [{
						name: '账号密码',
						value: '已设置',
						btn: '修改密码'
					},
					{
						name: '绑定手机',
						value: "",
						btn: '更换手机'
					},
				]
			};
		},
		onLoad() {
			//页面初始化触发事件
			uni.getStorage({
				key: 'userInfo',
				success: (e) => {
					if (e.data) {
						let  tel = e.data.userPhone;
						const reg = /^(\d{3})\d{4}(\d{4})$/;
						tel = tel.replace(reg, "$1****$2");
						this.safetyData[1].value = tel;
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
			navigateBack() {
				uni.navigateBack()
			},
		},
		beforeDestroy() {
			//组件销毁之前调用，取消订阅
		}
	};
</script>
<style lang="less">
	.safety {
		height: 100%;
		background: #F5F7FA;

		.safety-data {
			position: relative;
			top: 100px;
			background: #FFFFFF;
			margin: 0px 12px;
			border-radius: 8px;

			.for {
				display: flex;
				justify-content: space-between;
				padding: 26px 12px;
				position: relative;

				.icon-value {
					display: flex;

					.name {
						color: #111111;
						font-size: 14px;
					}

					.value {
						color: #99999A;
						font-size: 12px;
						margin-top: 7px;
					}
				}

				.btn {
					height: 35px;
					color: #99999A;
					font-size: 12px;
					padding: 0px 12px;
					line-height: 35px;
					border: 1px solid #E9E9E9;
					border-radius: 8px;
				}

				.border {
					width: 90%;
					margin: auto;
					position: absolute;
					bottom: 0px;
					border-bottom: 1px #F5F7FA solid;
				}
			}
		}
	}
</style>
