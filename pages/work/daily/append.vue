<template>
	<view class="append">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">新增日常数据</view>
		</view>
		<view class="append-form">
			<form @submit="formSubmit">
				<view class="for" v-for="(item,index) in formData" :key="index">
					<view :class="item.name" v-if="index==0">
						<view class="title">{{item.title}}<text>*</text></view>
						<uni-datetime-picker class="time-input" v-model="appendTime"></uni-datetime-picker>
					</view>
					<view :class="item.name" v-else-if="index==2">
						<view class="title">{{item.title}}<text>*</text></view>
					</view>
					<view :class="item.name" v-else>
						<view class="title">{{item.title}}<text>*</text></view>
						<input type="text" :placeholder="'输入'+item.title" :name="item.name" value="" />
					</view>
				</view>
				<button class="button-submit" form-type="submit">提交</button>
			</form>
		</view>
	</view>
</template>
<script>
	import util from '../../../static/js/util.js'
	export default {
		name: '',
		props: {},
		data() {
			return {
				//绑定的数据
				appendTime: util.datastime('yous'),
				formData: [{
						title: '检测时间',
						name: ''
					},
					{
						title: '检测人员',
						name: 'person'
					},
					{
						title: '检测地点',
						name: 'place'
					},
					{
						title: 'PH',
						name: 'ph'
					},
					{
						title: '氨氮',
						name: 'nhn'
					},
					{
						title: '硫化氢',
						name: 'hs'
					},
					{
						title: '亚硝酸',
						name: 'hno2'
					},
					{
						title: '盐度',
						name: 'salt'
					},
				]
			};
		},
		onLoad() {
			//页面初始化触发事件
		},
		methods: {
			//自定义事件集合地
			//返回上一页
			navigateBack() {
				uni.navigateBack()
			},
			// form表单数据
			formSubmit(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: '../daily/append'
					});
				}, 1000);
			}
		},
		beforeDestroy() {
			//组件销毁之前调用，取消订阅
		}
	};
</script>
<style lang="less">
	.append {
		min-height: 100%;
		background: #F5F7FA;
		padding-bottom: 74px;

		.append-form {
			position: relative;
			top: 80px;
			margin: 0px 12px;


			.for {
				background: #FFFFFF;
				padding: 0px 12px 0px 12px;
			}

			// .for:first-child {
			// 	padding-top: 5px;
			// }

			.for:nth-last-child(2) {
				padding-bottom: 28px;
			}

			.title {
				color: #111111;
				font-size: 14px;
				padding-top: 10px;

				text {
					color: #FF6344;
					position: relative;
					top: 3px;
					left: 4px;
				}
			}

			.time-input,
			input {
				border: 1px solid #E8ECF0;
				border-radius: 4px;
				padding: 8px;
				margin-top: 10px;
				font-size: 14px;
			}

			.button-submit {
				margin: 0px 12px;
				margin-top: 28px;
				background: #2693FF;
				border-radius: 22px;
				color: #FFFFFF;
			}
		}
	}
</style>
