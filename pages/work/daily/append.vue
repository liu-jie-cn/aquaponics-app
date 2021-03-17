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
						<uni-datetime-picker class="time-input" type="date" v-model="appendTime"></uni-datetime-picker>
					</view>
					<view :class="item.name" v-else-if="index==2">
						<view class="title">{{item.title}}</view>
						<view class="append-select">
							<view class="select" v-for="(item,index) in selectData" :key="index">
								<picker @change="bindPickerChange($event,index)" :value="item.name" :range="item.data">
									<view class="uni-input">{{item.name}}</view>
								</picker>
								<image class="monitor-image" src="../../../static/svg/xia.svg" mode=""></image>
							</view>
							<view class="border"></view>
						</view>
					</view>
					<view :class="item.name" v-else>
						<view class="title">{{item.title}}<text v-if="item.title=='检测人员'">*</text></view>
						<input type="text" v-if="item.title=='检测人员'" :placeholder="'输入'+item.title" :name="item.name" value="" />
						<input type="number" v-else :placeholder="'输入'+item.title" :name="item.name" value="" />
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
					name: '',
					id: [],
					data: [],
				}, {
					name: '',
					id: [],
					data: [],
				}],
				pointData: [],
				pointDataId: [],
				formData: [{
						title: '检测时间',
						name: ''
					},
					{
						title: '检测人员',
						name: 'ycgsCheckDataUserName'
					},
					{
						title: '检测地点',
						name: 'place'
					},
					{
						title: 'PH',
						name: 'ycgsCheckDataPh'
					},
					{
						title: '氨氮',
						name: 'ycgsCheckDataNh3nh4'
					},
					{
						title: '硫化氢',
						name: 'ycgsCheckDataH2s'
					},
					{
						title: '亚硝酸',
						name: 'ycgsCheckDataHno3'
					},
					{
						title: '硝酸盐',
						name: 'ycgsCheckDataNo2'
					},
					{
						title: '盐度',
						name: 'ycgsCheckDataSalinity'
					},
				]
			};
		},
		onLoad() {
			//页面初始化触发事件
			// 检测点列表
			uni.getStorage({
				key: 'token',
				success: (e) => {
					if (e.data) {
						this.token = e.data
						// 检测点列表
						this.checkPointAll()
					}
				},
				fail: (e) => {
					uni.reLaunch({
						url: '../../login/login'
					});
				}
			})
		},
		methods: {
			//自定义事件集合地
			//返回上一页
			navigateBack() {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				if (prevPage) {
					prevPage.$vm.otherFun(); //修改上一页data里面的searchVal参数值为1211
					uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
						delta: 1
					});
				} else {
					uni.reLaunch({
						url: '../../login/login'
					});
				}
				// uni.navigateBack()
			},
			// 下拉框
			bindPickerChange(e, index) {
				let value = e.target.value;
				if (index == 0) {
					this.selectData[index].name = this.selectData[index].data[value];
					this.selectData[1].data = this.pointData[value];
					this.selectData[1].name = this.pointData[value][0];
					this.selectData[1].id = this.pointDataId[value];

				} else {
					this.selectData[1].name = this.selectData[1].data[value]
				}
			},
			// 检测点列表--检测地点内容
			checkPointAll() {
				uni.request({
					url: this.url + '/checkPoint/all/point',
					header: {
						'authorization': this.token
					},
					success: (data) => {
						if (data.data.code == 200) {
							this.pointData = [];
							this.pointDataId = [];
							this.selectData[0].data = (data.data.data).map((map, index) => {
								if (index == 0) {
									this.selectData[0].name = map.ycgsCheckSystemName
								};
								let name = map.ycgsCheckPoints.map(itme => {
									return itme.ycgsCheckPointName;
								});
								let id = map.ycgsCheckPoints.map(itme => {
									return itme.ycgsCheckPointId;
								});
								this.pointData.push(name);
								this.pointDataId.push(id);
								this.selectData[0].id.push(map.ycgsCheckSystemId)
								return map.ycgsCheckSystemName;
							});
							this.selectData[1].name = this.pointData[0][0];
							this.selectData[1].data = this.pointData[0];
							this.selectData[1].id = this.pointDataId[0];
						}
					}
				})
			},
			// form表单数据
			formSubmit(e) {
				let submitData = e.detail.value;
				this.selectData.forEach((each, index) => {
					if (index == 1) {
						let fillindex = (each.data).findIndex(fill => fill === each.name);
						submitData['ycgsCheckPointId'] = each.id[fillindex];
					}
				});
				submitData['ycgsCheckDataTime'] = this.appendTime;
				uni.request({
					url: this.url + '/checkPoint/checkData/',
					method: "POST",
					header: {
						'authorization': this.token
					},
					data: submitData,
					success: (data) => {
						if (data.data.code == 200) {
							this.navigateBack()
						}
					}
				})
			},
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
			top: 100px;
			margin: 0px 12px;


			.for {
				background: #FFFFFF;
				padding: 0px 12px 0px 12px;
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

			.append-select {
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

				.input-pint {
					width: 50%;

					.new-pint {
						border-width: 0px;
						margin-top: 0px;
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
