<template>
	<view class="make">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">新建喂食</view>
		</view>
		<view class="make-form">
			<form @submit="formSubmit">
				<view class="for" v-for="(item,index) in formData" :key="index">
					<view :class="item.name" v-if="index==0">
						<view class="title">{{item.title}}<text>*</text></view>
						<view class="make-select">
							<view class="select" v-for="(item,index) in selectData" :key="index">
								<picker @change="bindPickerChange($event,index)" :value="item.name" :range="item.data">
									<view class="uni-input">{{item.name}}</view>
								</picker>
								<image class="monitor-image" src="../../../static/svg/xia.svg" mode=""></image>
							</view>
							<view class="border"></view>
						</view>
					</view>
					<view :class="item.name" v-else-if="(index+1)!=formData.length">
						<view class="title">{{item.title}}<text>*</text></view>
						<input type="text" :placeholder="'输入'+item.title" :name="item.name" value="" />
						<view class="unit" v-if="item.name=='weight'">斤</view>
					</view>
					<view :class="item.name" v-else>
						<view class="title">{{item.title}}<text>*</text></view>
						<uni-datetime-picker class="time-input" v-model="appendTime"></uni-datetime-picker>
						<!-- <input type="text" :placeholder="'输入'+item.title" :name="item.name" value="" /> -->
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
				selectData: [{
					name: '1号系统',
					data: ['1号系统', '2号系统', '3号系统']
				}, {
					name: '1号桶',
					data: ['1号桶', '2号桶', '3号桶']
				}],
				formData: [{
						title: '喂食地点',
						name: 'place'
					},
					{
						title: '喂食重量',
						name: 'weight'
					},
					{
						title: '操作人员',
						name: 'person'
					},
					{
						title: '喂食时间',
						name: 'time'
					}
				]
			};
		},
		onLoad() {
			//页面初始化触发事件
		},
		methods: {
			//自定义事件集合地
			// form表单数据
			formSubmit(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			},
			// 下拉框
			bindPickerChange(e, index) {
				let value = e.target.value;
				this.selectData[index].name = this.selectData[index].data[value];
			},
			// 返回上一页（哪来的哪去）
			navigateBack() {
				uni.navigateBack()
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.redirectTo({
						url: '../feed/make'
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
	.make {
		min-height: 100%;
		background: #F5F7FA;

		.make-form {
			position: relative;
			top: 82px;
			margin: 0px 12px 0px 12px;

			.for {
				background: #FFFFFF;
				padding: 0px 12px 0px 12px;
			}

			.for:first-child {
				padding-top: 5px;
			}

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

			.weight {
				position: relative;
			}

			.unit {
				position: absolute;
				bottom: 10px;
				right: 8px;
			}

			.make-select {
				display: flex;
				justify-content: center;
				text-align: center;
				background: #FFFFFF;
				position: relative;
				border: 1px solid #E8ECF0;
				border-radius: 4px;
				padding: 3px;
				margin-top: 10px;
				font-size: 14px;

				.select {
					width: 50%;
					line-height: 29px;
					display: flex;

					justify-content: center;
					text-align: center;
					font-size: 14px;

					.monitor-image {
						width: 30px;
						height: 20px;
						margin-top: 5px;
						color: #99999A;
					}
				}

				.border {
					width: 1px;
					height: 11px;
					background: #E8ECF0;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}

		}
	}
</style>
