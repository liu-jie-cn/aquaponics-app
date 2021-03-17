<template>
	<view class="materials">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">个人资料</view>
		</view>
		<view class="materials-data">
			<view class="for" v-for="(item,index) in userInfo" :key="index">
				<view class="name">{{item.name}}</view>
				<view class="value-cion">
					<!-- <view class="value" v-if="index==0">{{item.value}}</view> -->
					<image :src="imgFiles" v-if="index==0" @tap="previewImage"></image>
					<view class="value" v-else>{{item.value}}</view>
					<view class="iconfont icon-jiantou-right"></view>
				</view>
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
				userData: {},
				imgFiles: '',
				userInfo: [{
						name: "头像",
						filed: 'userHeadPictureUrl',
						value: ''
					},
					{
						name: "昵称",
						filed: '',
						value: ''
					},
					{
						name: "性别",
						filed: 'userGender',
						value: ''
					},
					{
						name: "出生年月",
						filed: 'userBirthDate',
						value: ''
					},
					{
						name: "所属公司",
						filed: 'userCompany',
						value: ''
					},
					{
						name: "联系电话",
						filed: 'userPhone',
						value: ''
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
						this.userData = e.data;
						this.userInfo.forEach((each, index) => {
							if (each.filed) {
								each.value = e.data[each.filed];
							}
							if (index == 0) {
								this.imgFiles = each.value
							}
						})
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
			// 上传前预览
			previewImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['copressed'],
					success: (res) => {
						//因为有一张图片， 输出下标[0]， 直接输出地址
						this.imgFiles = res.tempFilePaths[0]

					}
				})
			},
			//上传图片
			uploadingImage() {
				// 做成一个上传对象
				let uper = uni.uploadFile({
					// 需要上传的地址
					url: 'http://139.196.194.49:9999/ycgs/default/',
					// filePath  需要上传的文件
					filePath: this.imgFiles,
					name: 'file',
					success(res1) {
						// 显示上传信息
						console.log(res1)
					}
				});
				// onProgressUpdate 上传对象更新的方法
				uper.onProgressUpdate((res) => {
					// 进度条等于 上传到的进度
					this.percent = res.progress
					console.log('上传进度' + res.progress)
					console.log('已经上传的数据长度' + res.totalBytesSent)
					console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend)
				})
			}
		},
		beforeDestroy() {
			//组件销毁之前调用，取消订阅
		}
	};
</script>
<style lang="less">
	.materials {
		height: 100%;
		background: #F5F7FA;

		.materials-data {
			position: relative;
			top: 87px;
			margin: 12px;
			background: #FFFFFF;

			.for {
				display: flex;
				justify-content: space-between;
				padding: 0px 12px;
				position: relative;

				.name {
					line-height: 55px;
					font-size: 14px;
				}

				image {
					width: 64px;
					height: 64px;
					border-radius: 32px;
				}

				.value-cion {
					display: flex;
					color: #99999A;
					font-size: 14px;
					padding: 18px 0px;


					.icon-jiantou-right {
						color: #CED3D9;
						font-size: 16px;
						margin-left: 12px;
					}
				}

				.border {
					width: 90%;
					position: absolute;
					left: 50%;
					bottom: 0px;
					transform: translateX(-50%);
					border-bottom: 1px #F5F7FA solid;
				}
			}

			.for:first-child {
				.name {
					line-height: 100px;
				}

				.icon-jiantou-right {
					position: relative;
					top: 50%;
					transform: translateY(-10%);
				}
			}
		}
	}
</style>
