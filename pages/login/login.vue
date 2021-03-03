<template>
	<view class="login">
		<view class="title">进入鱼阡陌</view>
		<view class="login-form">
			<form @submit="formSubmit" v-if="!enter">
				<view class="input-value">
					<input type="number" class="uni-input" name="username" placeholder="输入手机号" />
					<input type="number" class="uni-input" name="password" placeholder="输入验证码" />
					<view class="verify">获取验证码</view>
				</view>
				<view class="uni-btn-v">
					<button class="register" form-type="submit">登录</button>
				</view>
			</form>
			<form @submit="formSubmit" v-if="enter">
				<view class="input-value">
					<input type="text" class="uni-input" name="username" placeholder="输入用户名" />
					<input type="password" class="uni-input" name="password" placeholder="输入密码" />
				</view>
				<view class="uni-btn-v">
					<button class="register" form-type="submit">登录</button>
				</view>
			</form>
			<view class="register-manner" @click="enter=!enter">{{enter?"密码登录>>":"手机号登录>>"}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				heightApp: 0,
				enter: false
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'token',
				success: (e) => {
					if (e.data) {
						uni.reLaunch({
							url: '../index/index'
						});
					}
				}
			})
		},
		methods: {

			formSubmit(e) {
				if (this.enter) {
					this.username = e.detail.value.username;
					this.password = e.detail.value.password;
					this.register()
				}
			},
			formReset(e) {
				console.log('清空数据')
			},

			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: '../login/login'
					});
				}, 1000);
			},
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
	.login {
		.title {
			color: #111111;
			font-size: 36px;
			text-align: center;
			padding-top: 100px;
		}

		.login-form {
			padding-top: 50px;

			input {
				padding: 18px 0px;
				margin: 16px 35px 0px 35px;
				border-bottom: 1px #E7EBEF solid;
			}

			.uni-input-placeholder {
				color: #99999A;
				font-size: 14px;
			}

			.input-value {
				position: relative;
			}

			.verify {
				position: absolute;
				right: 35px;
				bottom: 20px;
			}

			.uni-btn-v {
				margin-top: 70px;

				.register {
					margin: 0px 35px;
					color: #FFFFFF;
					background: #2693FF;
					font-size: 14px;
					padding: 8px 0px;
					font-weight: 500;
					border-radius: 8px;
					box-shadow: 0px 10px 40px -5px rgba(38, 147, 255, 0.7);
				}
			}
		}

		.register-manner {
			color: #99999A;
			font-size: 14px;
			text-align: center;
			padding: 0px 35px;
			margin-top: 20px;
		}
	}
</style>
