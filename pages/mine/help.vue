<template>
	<view class="help">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">帮助中心</view>
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
			};
		},
		onLoad() {
			//页面初始化触发事件
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
</style>
