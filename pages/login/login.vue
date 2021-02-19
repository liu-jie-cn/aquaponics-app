<template>
	<view class="content">
		<view class="register-form">
			<view class="logo-name">登录</view>
			<view class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<view class="title">用户名</view>：
					<input class="uni-input" v-model="username" type="text" placeholder="用户名" />
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">密码</view>：
					<input class="uni-input" v-model="password" password type="text" placeholder="密码" />
				</view>
			</view>
			<button class="btn-reg" type="default" @click="register">登录</button>
		</view>
	</view>
</template>

<script>
	import api from '@/api.server.js'
	export default {
		data() {
			return {
				username: '',
				password: '',
				heightApp: 0
			}
		},
		onLoad() {
			console.log()
		},
		methods: {
			register() {
				if (this.username != "" && this.password != "") {
					uni.request({
						url: this.url + "/auth/login", //仅为示例，并非真实接口地址。
						method: "POST",
						data: {
							userName: this.username,
							password: this.password,
						},
						success: (data) => {
							if (data.data.code == 200) {
								uni.setStorage({
									key: 'token',
									data: data.data.data.tokenType + data.data.data.accessToken
								})
								uni.showLoading({
									title: '登录成功',
									icon: 'none',
									position: "top"
								});
								uni.reLaunch({
									url: '../index/index'
								});
							} else {
								uni.showLoading({
									title: '用户名或密码错误',
									icon: 'none',
									position: "top"
								})
							}
						}
					})
				} else {
					uni.showLoading({
						title: '请填写用户名密码',
						icon: 'none',
						position: "top"
					});
				};
			}
		}
	}
</script>

<style lang="less">
	.content {
		height: 100%;
		width: 100%;
		position: relative;
		border: 1px red solid;

		.register-form {
			height: 200px;
			width: 100%;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}

		.logo-name {
			font-size: 24px;
			margin-bottom: 30px;
			text-align: center;
		}

		.uni-form-item {
			display: flex;
			justify-content: center;
			padding: 0px 20px;
			margin-bottom: 20px;

			input {
				border: 1px #000000 solid;
				border-radius: 20px;
				padding: 0px 20px;
			}

			.title {
				width: 60px;
				text-align-last: justify;
				text-align: justify;
				text-justify: distribute-all-lines; // 这行必加，兼容baiie浏览器
			}
		}

		.btn-reg {
			width: 50%;
			margin-top: 30px;
		}
	}
</style>
