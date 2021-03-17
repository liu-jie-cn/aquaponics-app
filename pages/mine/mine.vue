<template>
	<view class="mine">
		<view class="oneself">
			<image class="imgage" src="../../static/img/oneself.png" mode=""></image>
			<view class="name-company">
				<view class="name">艾克斯</view>
				<view class="company">上海绿椰农业专业种植合作社</view>
			</view>
		</view>
		<view class="classify">
			<view class="classify-for" v-for="(item,index) in classifyData" :key="index" @click="minelineClick(index,item.img)">
				<view class="image-name">
					<image class="image" :src="'../../static/img/'+item.img+'.png'" mode=""></image>
					<view class="name">{{item.name}}</view>
				</view>
				<view class="iconfont icon-jiantou-right"></view>
				<view v-if="index%2" class="even"></view>
			</view>
		</view>
		<l-modal ref="customModal" @onClickConfirm="confirm">
			<template>
				<view class="model-title">您确认退出当前账号?</view>
			</template>
		</l-modal>
	</view>
</template>
<script>
	import lModal from '@/components/l-modal/l-modal.vue'
	export default {
		name: '',
		props: {},
		components: {
			lModal
		},
		data() {
			return {
				//绑定的数据
				userData: {},
				classifyData: [{
						name: '个人资料',
						img: 'materials'
					},
					{
						name: '账号安全',
						img: 'safety'
					},
					{
						name: '关于我们',
						img: 'regard'
					},
					{
						name: '帮助中心',
						img: 'help'
					},
					{
						name: '退出当前账号',
						img: 'quit'
					},
				]
			};
		},
		onLoad() {
			//页面初始化触发事件
			// uni.getStorage({
			// 	key: 'userInfo',
			// 	success: (e) => {
			// 		if (e.data) {
			// 			this.userData = e.data;
			// 		}
			// 	},
			// 	fail: (e) => {
			// 		uni.reLaunch({
			// 			url: '../login/login'
			// 		});
			// 	}
			// })
		},
		methods: {
			//自定义事件集合地
			// 
			minelineClick(index, url) {
				switch (index) {
					case 0: //个人资料
					case 1: //账号安全
					case 2: //关于我们
					case 3: //帮助中心
						uni.navigateTo({
							url: './' + url
						});
						break;
					case 4: //退出当前账号
						this.$refs['customModal'].showModal();
						break;
				}
			},
			// 对话框确认
			confirm() {
				uni.removeStorage('token');
				uni.removeStorageSync('token');
				uni.reLaunch({
					url: '../login/login'
				});
			},
		},

		beforeDestroy() {
			//组件销毁之前调用，取消订阅
		}
	};
</script>
<style lang="less">
	.mine {
		min-height: 100%;
		background: #F5F7FA;

		.model-title {
			text-align: center;
		}

		.oneself {
			height: 206px;
			color: #FFFFFF;
			background: url(../../static/img/userback.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			padding-left: 24px;
			position: relative;
			z-index: 1;

			.imgage {
				width: 64px;
				height: 64px;
				margin-right: 16px;
				margin-top: 64px;
			}

			.name-company {
				margin-top: 64px;

				.name {
					font-size: 22px;
				}

				.company {
					font-size: 14px;
					margin-top: 12px;
				}
			}
		}

		.classify {
			position: relative;
			top: -50px;
			z-index: 2;
			background: #FFFFFF;
			border-radius: 16px 16px 0px 0px;
			padding-top: 12px;

			.classify-for {
				display: flex;
				justify-content: space-between;
				padding: 17px 24px;
				position: relative;

				.image-name {
					display: flex;

					.image {
						height: 24px;
						width: 24px;
					}

					.name {
						color: #111111;
						font-size: 14px;
						margin-left: 12px;
						margin-top: 2px;
					}
				}

				.icon-jiantou-right {
					color: #CED3D9;
				}

				.even {
					position: absolute;
					width: 100%;
					border-top: 1px #F5F7FA solid;
					bottom: 0px;
				}
			}

		}
	}
</style>
