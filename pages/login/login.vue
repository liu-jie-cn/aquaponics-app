<template>
	<view class="login">
		<view class="title">鱼阡陌</view>
		<view class="login-form">
			<form @submit="formSubmit">
				<!-- 登录 -->
				<view class="input-value">
					<input type="text" class="uni-input" name="username" v-show="!submit" placeholder="输入手机号" @blur="Listeningfocus($event)" />
					<input type="number" class="uni-input" v-show="submit" name="username" placeholder="输入手机号" />
					<input type="password" v-show="submit" class="uni-input" name="password" placeholder="输入密码" />
					<input type="number" v-show="!submit" class="uni-input" name="security" placeholder="输入验证码" />
					<view class="verify" v-show="!submit" @click="loginCountDown()">获取验证码</view>
					<view class="second" v-show="loginsecondShow && !submit">{{loginsecond}}</view>
				</view>
				<view class="uni-btn-v">
					<view class="phone-password" @click="submit=!submit">{{submit?"手机号登录>>":"密码登录>>"}}</view>
					<button class="register" form-type="submit">登录</button>
				</view>
			</form>

			<l-modal ref="customModal" modalTitle="用户注册">
				<template>
					<!-- 注册 -->
					<form @submit="formRegister">
						<view class="input-value input-value-register">
							<input type="number" class="uni-input" name="username" placeholder="输入手机号" @blur="Listeningfocus($event)" @input="changeInputValue($event)" />
							<input type="password" class="uni-input" name="password" placeholder="输入密码" />
							<input type="password" class="uni-input" name="repeatpassword" placeholder="重复密码" />
							<input type="number" class="uni-input" name="security" placeholder="输入验证码" />
							<view class="verify" @click="countDown()">获取验证码</view>
							<view class="second" v-show="secondShow">{{second}}</view>
						</view>
						<view class="uni-btn-v">
							<button class="register" form-type="submit">注册</button>
						</view>
					</form>
				</template>
			</l-modal>
			<view class="register-manner" @click="switchoverEnter">{{"注册"}}</view>
		</view>
		<quick-message ref="message"></quick-message>
	</view>
</template>

<script>
	import lModal from '@/components/l-modal/l-modal.vue'
	export default {
		components: {
			lModal
		},
		data() {
			return {
				username: '',
				password: '',
				heightApp: 0,
				second: 60,
				secondShow: false,
				loginsecond: 60,
				loginsecondShow: false,
				count: false,
				submit: false,
				interval: null,
				logininterval: null,
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
				this.username = e.detail.value.username || this.username;
				this.password = this.submit ? e.detail.value.password : e.detail.value.security;
				// console.log(this.username);
				this.register(this.submit)
			},
			// 注册提交
			formRegister(e) {
				let val = Object.values(e.detail.value);
				if (val.indexOf("") < 0) {
					uni.request({
						url: this.url + '/auth/register/',
						method: "POST",
						data: {
							userPhone: e.detail.value.username,
							password: e.detail.value.password,
							code: e.detail.value.security
						},
						success: (data) => {
							if (data.data.code == 200) {
								this.$refs.message.show({
									msg: '注册成功',
								})
								this.second = 60;
								this.secondShow = false;
								clearInterval(this.interval);
								this.$refs['customModal'].handleCancel();
							} else {
								this.$refs.message.show({
									icon: "warn",
									iconSize: 18,
									iconColor: '#F6635F',
									msg: data.data.message,
									customStyle: { //自定义样式
										color: '#FFFFFF', //字体图标色
										backgroundColor: 'rgba(0,0,0,.5)' //背景色
									},
								})
							}
						}
					})
				} else {
					let title = "请完善注册信息";
					if (val.indexOf("") == 0) {
						title = "请完善注册信息"
					} else if (val.indexOf("")[1] == "") {
						title = "请输入密码"
					} else if (val.indexOf("")[1] != val.indexOf("")[2]) {
						title = "两次密码不一致"
					} else if (val.indexOf("")[3] != "") {
						title = "请输入验证码"
					}
					this.$refs.message.show({
						icon: "warn",
						iconSize: 18,
						iconColor: '#F6635F',
						msg: title,
						customStyle: { //自定义样式
							color: '#FFFFFF', //字体图标色
							backgroundColor: 'rgba(0,0,0,.5)' //背景色
						},
					})
				}
			},
			formReset(e) {
				console.log('清空数据')
			},
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.redirectTo({
						url: '../login/login'
					});
				}, 1000);
			},
			// 注册登录的切换
			switchoverEnter() {
				this.$refs['customModal'].showModal();
				// this.second = 60;
				// this.secondShow = false;
				// clearInterval(this.interval);
			},
			// 注册手机号判定
			changeInputValue(e) {
				if (e.target.value.length == 11) {
					console.log("!11111");
					let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
					if (e.target.value && !myreg.test(e.target.value)) {
						this.$refs.message.show({
							icon: "warn",
							iconSize: 18,
							iconColor: '#F6635F',
							msg: '手机号格式不正确',
							customStyle: { //自定义样式
								color: '#FFFFFF', //字体图标色
								backgroundColor: 'rgba(0,0,0,.5)' //背景色
							},
						})
					} else {
						this.count = true;
					}
				} else {
					this.count = false;
				}
			},
			//注册手机号验证
			Listeningfocus(e) {
				let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (e.target.value && !myreg.test(e.target.value)) {
					this.$refs.message.show({
						icon: "warn",
						iconSize: 18,
						iconColor: '#F6635F',
						msg: '手机号格式不正确',
						customStyle: { //自定义样式
							color: '#FFFFFF', //字体图标色
							backgroundColor: 'rgba(0,0,0,.5)' //背景色
						},
					})
				} else {
					this.username = e.target.value;
					uni.request({
						url: this.url + '/auth/register/checkUserName/' + this.username,
						header: {
							'authorization': this.token
						},
						success: (data) => {
							if (data.data.data) {
								this.$refs.message.show({
									icon: "warn",
									iconSize: 18,
									iconColor: '#F6635F',
									msg: data.data.message,
									customStyle: { //自定义样式
										color: '#FFFFFF', //字体图标色
										backgroundColor: 'rgba(0,0,0,.5)' //背景色
									},
								})
							}
						}
					})
				}
			},
			//注册验证码60秒倒计时--验证码发送
			countDown() {
				if (this.count) {
					//验证码发送
					this.Listeningfocus({
						target: {
							value: this.username
						}
					})
					if (this.username != "") {
						uni.request({
							url: this.url + '/auth/register/sendCode/' + this.username,
							method: "GET",
							success: (data) => {
								if (data.data.code == 200) {
									this.$refs.message.show({
										msg: '验证码已发送',
									})
								} else {
									this.$refs.message.show({
										icon: "warn",
										iconSize: 18,
										iconColor: '#F6635F',
										msg: data.data.message,
										customStyle: { //自定义样式
											color: '#FFFFFF', //字体图标色
											backgroundColor: 'rgba(0,0,0,.5)' //背景色
										},
									})
								}
							}
						});
						//验证码60秒倒计时
						let num = 60;
						this.secondShow = true;
						this.interval = setInterval(() => {
							if (this.second == 0) {
								this.secondShow = false;
								this.second = 60;
								clearInterval(this.interval);
							} else {
								this.second = num--
							}
						}, 1000);
					} else {
						this.$refs.message.show({
							icon: "warn",
							iconSize: 18,
							iconColor: '#F6635F',
							msg: '手机号不能为空',
							customStyle: { //自定义样式
								color: '#FFFFFF', //字体图标色
								backgroundColor: 'rgba(0,0,0,.5)' //背景色
							},
						})
					}
				} else {
					this.$refs.message.show({
						icon: "warn",
						iconSize: 18,
						iconColor: '#F6635F',
						msg: '请确认手机号',
						customStyle: { //自定义样式
							color: '#FFFFFF', //字体图标色
							backgroundColor: 'rgba(0,0,0,.5)' //背景色
						},
					})
				}

			},
			//登录验证码发送
			loginCountDown() {
				if (this.username) {
					uni.request({
						url: this.url + '/auth/login/sendCode/' + this.username,
						success: (data) => {
							if (data.data.code == 200) {
								this.$refs.message.show({
									msg: '验证码已发送',
								})
							} else {
								this.$refs.message.show({
									icon: "warn",
									iconSize: 18,
									iconColor: '#F6635F',
									msg: data.data.message,
									customStyle: { //自定义样式
										color: '#FFFFFF', //字体图标色
										backgroundColor: 'rgba(0,0,0,.5)' //背景色
									},
								})
							}
						}
					})
					//验证码60秒倒计时
					let num = 60;
					this.loginsecond = 60;
					this.loginsecondShow = true;
					this.logininterval = setInterval(() => {
						if (this.second == 0) {
							this.loginsecondShow = false;
							clearInterval(this.interval);
						} else {
							this.loginsecond = num--
						}
					}, 1000);
				} else {
					this.$refs.message.show({
						icon: "warn",
						iconSize: 18,
						iconColor: '#F6635F',
						msg: '手机号不能为空',
						customStyle: { //自定义样式
							color: '#FFFFFF', //字体图标色
							backgroundColor: 'rgba(0,0,0,.5)' //背景色
						},
					})
				}
			},
			// 登录
			register(submit) {
				let urlFiled = "";
				let data = {}
				if (submit) {
					urlFiled = "username";
					data = {
						loginName: this.username,
						loginPassword: this.password,
					}
				} else {
					urlFiled = "phone";
					data = {
						loginPhone: this.username,
						loginCode: this.password,
					}
				}
				if (this.username != "" && this.password != "") {
					uni.request({
						url: this.url + "/auth/login/" + urlFiled, //仅为示例，并非真实接口地址。
						method: "POST",
						data: data,
						success: (data) => {
							if (data.data.code == 200) {
								uni.setStorage({
									key: 'token',
									data: data.data.data.tokenType + data.data.data.accessToken
								});
								uni.setStorage({
									key: 'userInfo',
									data: data.data.data.user
								});
								this.$refs.message.show({
									msg: '登录成功',
								});
								uni.reLaunch({
									url: '../index/index'
								});
							} else {
								this.$refs.message.show({
									icon: "warn",
									iconSize: 18,
									iconColor: '#F6635F',
									msg: data.data.message,
									customStyle: { //自定义样式
										color: '#FFFFFF', //字体图标色
										backgroundColor: 'rgba(0,0,0,.5)' //背景色
									},
								})
							}
						}
					})
				} else {
					this.$refs.message.show({
						icon: "warn",
						iconSize: 18,
						iconColor: '#F6635F',
						msg: '请填写用户名密码',
						customStyle: { //自定义样式
							color: '#FFFFFF', //字体图标色
							backgroundColor: 'rgba(0,0,0,.5)' //背景色
						},
					})
				};
			},

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
			position: relative;

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



			.input-value-register {
				.uni-input {
					margin: 0px 10px;
				}
			}

			.verify {
				width: 100px;
				height: 40px;
				line-height: 40px;
				position: absolute;
				right: 35px;
				bottom: 10px;
				text-align: center;
			}

			.second {
				width: 100px;
				height: 40px;
				line-height: 40px;
				position: absolute;
				right: 35px;
				// left: 40px;
				bottom: 10px;
				background: rgba(0, 0, 0, 0.5);
				color: #FFFFFF;
				text-align: center;
				border-radius: 8px;
			}

			.uni-btn-v {
				margin-top: 50px;

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
			width: 50px;
			color: #99999A;
			font-size: 14px;
			position: absolute;
			right: 35px;
			margin-top: 20px;
		}

		.phone-password {
			width: 100px;
			color: #99999A;
			font-size: 14px;
			text-align: center;
			margin: auto;
			margin-bottom: 20px;
		}
	}
</style>
