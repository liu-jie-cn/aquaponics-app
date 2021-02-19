<template>
	<view class="monitor">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">实时监测</view>
		</view>
		<view class="monitor-naviga">
			<view :class="['naviga-for',navigaIndex==index?'navigaShow':'']" v-for="(item,index) in navigaData" :key="index"
			 @click="navigaPitch(item,index)">{{item}}
				<view v-show="navigaIndex==index" class="border"></view>
			</view>
		</view>

		<uni-transition :duration="500" :mode-class="['zoom-in','fade']" :styles="transfromClass" :show="transShow">
			<view class="monitor-data">
				<view class="monitor-for" @click="monitorDetails(item,index)" v-for="(item,index) in monitorData" :key="index"
				 v-show="item.value!=0">
					<view class="name-icon">
						<view class="name">{{item.name}}</view>
						<view class="icon">
							<text class="iconfont icon-weizhi"></text>
							<text class="system">{{navigaTitle}}</text>
							<text v-if="item.their">|</text>
							<text class="their">{{item.their}}</text>
						</view>
					</view>
					<view class="value-unit">
						<view class="value-type">
							<view class="type" :style="{'background':item.alarmType?'#14E39E':'#FF9C38'}">{{item.alarmType?'正常':'报警'}}</view>
						</view>
						<view class="value">{{item.value}}</view>
						<view class="unit">{{item.unit}}</view>
					</view>
				</view>
			</view>
		</uni-transition>
	</view>
</template>
<script>
	export default {
		name: '',
		props: {},
		data() {
			return {
				//绑定的数据
				token: '',
				navigaIndex: -1,
				navigaTitle: '',
				navigaData: ['1号系统', '2号系统', '3号系统', '棚外环境', '棚内环境'],
				transShow: false,
				transfromClass: {
					'position': 'relative',
					'bottom': 0,
					'top': 0,
					'left': 0,
					'right': 0,
					/* #ifndef APP-NVUE */
					'display': 'flex',
					/* #endif */
					'justify-content': 'center',
					'align-items': 'center'
				},
				monitorData: [],
				systemData: [{
					id: '',
					name: "溶氧",
					their: '水质',
					value: '0',
					unit: 'mg/L',
					field: 'dissolvedOxygen',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "水温",
					their: '水质',
					value: '0',
					unit: '℃',
					field: 'waterTemperature',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "PH",
					their: '水质',
					value: '0',
					unit: '',
					field: 'ph',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "电导率",
					value: '0',
					their: '水质',
					unit: 'S/m',
					field: 'conductivity',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "ORP",
					their: '水质',
					value: '0',
					unit: 'mg/L',
					field: 'orp',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "水位",
					their: '水位',
					value: '0',
					unit: 'm',
					field: 'level',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "水压1",
					their: '水压',
					value: '0',
					unit: 'kPa',
					field: 'pressure',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "水压2",
					their: '水压',
					value: '0',
					unit: 'kPa',
					field: 'pressure',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "氧气压力",
					their: "氧气压力",
					value: '0',
					unit: 'kPa',
					field: 'pressure',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "电机",
					their: "电机启动频率",
					value: '开',
					unit: '--',
					field: '',
					type: true,
					alarmType: true
				}],
				contextData: [{
					id: '',
					name: "温度",
					their: "",
					value: '0',
					unit: '℃',
					field: 'Temperature',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "湿度",
					their: "",
					value: '0',
					unit: 'rh',
					field: 'Humidity',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "CO2",
					their: "",
					value: '0',
					unit: '',
					field: 'Co2',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "风速",
					their: "",
					value: '0',
					unit: 'm/s',
					field: 'WindSpeed',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "风力",
					their: "",
					value: '0',
					unit: '',
					field: 'WindPower',
					type: true,
					alarmType: true
				}, {
					id: '',
					name: "光照强度",
					their: "",
					value: '0',
					unit: '0',
					field: 'Illumination',
					type: true,
					alarmType: true
				}]
			};
		},
		onLoad() {
			//页面初始化触发事件
			uni.getStorage({
				key: 'token',
				success: (e) => {
					if (e.data) {
						this.token = e.data
						this.navigaPitch('1号系统', 0)
					}
				},
				fail: (e) => {
					console.log(e)
				}
			})
		},
		methods: {
			//自定义事件集合地
			// 返回上一页（哪来的哪去）
			navigateBack() {
				uni.navigateBack()
			},
			// 自定义导航选中
			navigaPitch(name, index) {
				if (index != this.navigaIndex) {
					this.transShow = false;
					this.navigaTitle = name;
					this.navigaIndex = index;
					if (index < 3) {
						this.monitorData = this.systemData;
						this.systemDataInquire(index);
					} else {
						this.monitorData = this.contextData;
						this.environmentDataInquire(index)
					}
				}
			},
			// 系统实时数据查询
			systemDataInquire(index) {
				let url, fieladData
				switch (index) {
					case 0:
						url = 'systemOne'
						fieladData = [{
							field: 'ycgsSupplyOxygen',
							type: [
								['pressure', '氧气压力', '', '0001832010230002']
							]
						}]
						break;
					case 1:
						url = 'systemTwo'
						fieladData = [{
							field: 'YcgsWaterQuality',
							type: [
								['dissolvedOxygen', '溶氧', '', '0001902010230001'],
								['waterTemperature', '水温', '', '0001902010230001'],
								['ph', 'PH', '', '0001902010230001'],
								['orp', 'ORP', '', '0001902010230001'],
								['conductivity', '电导率', '', '0001902010230001'],
							]
						}, {
							field: 'YcgsWaterSupply',
							type: [
								['pressure', '水压1', '', '0001832010230001']
							]
						}, {
							field: 'YcgsSupplyOxygen',
							type: [
								['pressure', '氧气压力', '', '0001832010230002']
							]
						}, {
							field: 'YcgsReturnTank',
							type: [
								['level', '水位', '', '0001842010230001']
							]
						}]
						break;
					case 2:
						url = 'systemThree'
						fieladData = [{
							field: 'YcgsWaterSupplyThreeLeft',
							type: [
								['pressure', '水压1', '', '0001832010230006']
							]
						}, {
							field: 'YcgsWaterSupplyThreeRight',
							type: [
								['pressure', '水压2', '', '0001832010230005']
							]
						}, {
							field: 'YcgsSupplyOxygenThree',
							type: [
								['pressure', '氧气压力', '', '0001832010230007']
							]
						}, {
							field: 'YcgsReturnTankThree',
							type: [
								['level', '水位', '', '0001842010230002']
							]
						}]
						break;
				}
				uni.request({
					url: this.url + "/index/" + url,
					header: {
						'authorization': this.token
					},
					success: (data) => {
						if (data.data.code == 200) {
							this.systeDataSettle(fieladData, data.data.data);
						}
					}
				})
			},
			// 环境实时数据查询
			environmentDataInquire(index) {
				let room = index == 3 ? 'outdoor' : 'indoor'
				uni.request({
					url: this.url + '/index/monitoring',
					header: {
						'authorization': this.token
					},
					success: (data) => {
						if (data.data.code == 200) {
							let fieladData = [{
								field: 'YcgsMeteorological',
								type: [
									[room + 'Temperature', '温度', '', '0002912011020001'],
									[room + 'Humidity', '湿度', '', '0002912011020001'],
									[room + 'Co2', 'CO2', '', '0002912011020001'],
									[room + 'WindPower', '风速', '', '0002912011020001'],
									[room + 'WindSpeed', '风力', '', '0002912011020001'],
								]
							}, {
								field: 'YcgsEnvironmentalScience',
								type: [
									[room + 'Illumination', '光照强度', '', '0001892010230001']
								]
							}]
							this.systeDataSettle(fieladData, data.data.data);
						}
					}
				})

			},
			// 实时数据-系统数据梳理
			systeDataSettle(fieladData, data) {
				// 自定义赋值数据
				let link = []
				fieladData.forEach(each => {
					each.type.forEach(type => {
						type[2] = data[each.field][type[0]].toFixed(1)
						link.push([type[1], type[2], type[3]])
					})
				})
				this.monitorData.forEach(each => {
					if (each.name != "电机") each.value = "0"
				})
				link.forEach(each => {
					let fill = this.monitorData.filter(fill => fill.name === each[0])[0];
					fill.value = each[1]
					fill.id = each[2]
				})
				setTimeout(() => {
					this.transShow = true;
				}, 500);
			},
			//实时监测详情数据
			monitorDetails(item, index) {
				if (item.id) {
					uni.navigateTo({
						url: './details?token=' + this.token + '&data=' + JSON.stringify(item) + '&navigaTitle=' + this.navigaTitle +
							'&index=' + this.navigaIndex + ''
					});
				}
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: '../work/monitor'
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
	.monitor {
		min-height: 100%;
		background: #F5F7FA;

		.monitor-tabBar {
			height: 44px;
			position: relative;
			padding: 0px 12px;
			padding-top: 40px;
			background: #FFFFFF;


			.icon-jiantou-left {
				width: 5%;
				position: absolute;
				font-weight: bolder;
				line-height: 44px;

			}

			.tabBar-title {
				line-height: 44px;
				color: #111111;
				font-size: 18px;
				font-weight: bolder;
				text-align: center;
			}
		}

		.monitor-naviga {
			height: 44px;
			line-height: 44px;
			display: flex;
			justify-content: space-between;
			padding: 0px 12px;
			color: #99999A;
			background: #FFFFFF;

			.navigaShow {
				color: #111111;
				font-weight: bold;
			}

			.border {
				margin: auto;
				position: relative;
				bottom: 4px;
				width: 28px;
				border: 2px #2693FF solid;
				border-radius: 2px;
			}
		}

		.monitor-data {
			width: 100%;
			padding: 0px 12px 10px 12px;

			.monitor-for {
				// width: 350px;
				// height: 100px;
				margin: auto;
				background: #FFFFFF;
				border-radius: 8px;
				margin-top: 8px;
				display: flex;
				justify-content: space-between;


				.name-icon,
				.value-unit {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 15px 13px;

					.name {
						font-size: 18px;
						font-weight: bold;
					}

					.type {
						line-height: 18px;
						height: 18px;
						width: 35px;
						text-align: center;
						padding: 3px 6px;
						color: #FFFFFF;
						border-radius: 4px;
					}

					.icon {
						color: #5F5F5F;
						font-size: 12px;

						.icon-weizhi {
							color: #CCCCCC;
						}

						.system {
							margin: 0px 5px;
						}

						.their {
							margin-left: 5px;
						}
					}

					.value {
						font-size: 18px;
						font-weight: bold;
						margin-top: 12px;
						text-align: right;
					}

					.unit {
						color: #99999A;
						font-size: 12px;
						text-align: right;
					}
				}

			}
		}
	}
</style>
