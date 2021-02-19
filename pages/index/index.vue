<template>
	<view id="index">
		<view class="kpi-alarm">
			<view class="title">
				鱼菜共生基地
			</view>
			<view class="kpi">
				<view v-for="(item,index) in kpiData" :key="index" class="kpi-for" @click="kpiswitchTab(index)">
					<image class="border" :src="'../../static/svg/'+(index+1)+'.svg'" mode=""></image>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
			<view class="alarm">
				<view v-for="(item,index) in alarmData" :key="index" class="alarm-for">
					<view class="type-text">
						<view class="type" :style="{'background':item.type==0?'#4BA6FF ':'#FF881E'}">{{item.type==0?'提示':'预警'}}</view>
						<view class="text">{{item.title}}</view>
					</view>
					<view class="tiem">{{item.time}}</view>
				</view>
			</view>
		</view>
		<view class="interval"></view>
		<view class="video">
			<view class="video-title">实时监控</view>
			<view class="video-for" v-for="(item,index) in videoData" :key="index">
				<view class="border" @click="videoFullPlay(item.url)">
					<image v-bind:src="'../../static/img/'+item.img+'.png'"></image>
				</view>
				<view class="name">{{item.name}}</view>
			</view>
			<video v-show="videoShow" id="myVideo" class="border-video" v-bind:src="videoUrl" controls :autoplay="true"
			 @fullscreenchange='fullscreenchange'></video>
		</view>
		<view class="interval"></view>
		<view class="monitor">
			<view class="monitor-title">实时监测</view>
			<view class="select">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{array[index]}}</view>
				</picker>
				<image class="monitor-image" src="../../static/svg/xia.svg" mode=""></image>
			</view>
			<view class="monitor-data">
				<view class="monitor-for" v-for="(item,index) in monitorData" :key="index">
					<view class="name-value">
						<view class="name">{{item.name}}</view>
						<view class="value">{{item.value}}</view>
					</view>
					<view class="type-unit" v-if="item.unit!='--'">
						<view class="type" :style="{'background':item.alarmType?'#14E39E':'#FF9C38'}">{{item.alarmType?'正常':'报警'}}</view>
						<view class="unit">{{item.unit}}</view>
					</view>
					<view class="type-unit" v-else>
						<view class="type"></view>
						<view class="unit"></view>
					</view>
					<view class="border"></view>
					<view class="state">
						<view class="icon"></view>
						{{item.type?'在线':'离线'}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: '',
				videoUrl: '',
				videoShow: false,
				title: 'picker',
				array: ['1号系统', '2号系统', '3号系统', '棚外环境', '棚内环境'],
				index: 0,
				kpiData: [{
					name: "实时监测",
					color: '#FFDCA5'
				}, {
					name: "报警管理",
					color: '#99EFD9'
				}, {
					name: "日常检测",
					color: '#81D3F8'
				}, {
					name: "订单统计",
					color: '#99EFD9'
				}],
				alarmData: [{
					type: 1,
					title: '2号系统溶氧值低于3mg/L',
					time: '14:24'
				}, {
					type: 1,
					title: '1号系统水温高于35℃',
					time: '12:56'
				}, {
					type: 0,
					title: '2号系统电机关闭',
					time: '10:12'
				}],
				videoData: [{
					name: '种植区',
					img: 'zhongzhiqu',
					url: 'https://hls01open.ys7.com/openlive/05cb307524bc459d8a72002a01608107.m3u8'
				}, {
					name: '养殖区',
					img: 'yangzhiqu',
					url: 'https://hls01open.ys7.com/openlive/28b9e8dedd544e5aaf7aaa8ed49f4c22.m3u8'
				}, {
					name: '系统南门',
					img: 'sysnan',
					url: 'https://hls01open.ys7.com/openlive/8e4582f0a39a4072b5cc17d10effdb9b.m3u8'
				}, {
					name: '系统北门',
					img: 'sysbei',
					url: 'https://hls01open.ys7.com/openlive/e5a4a2762efe47918a1758382e2c0ff1.m3u8'
				}],
				monitorData: [],
				systemData: [{
					name: "溶氧",
					value: '0',
					unit: 'mg/L',
					field: 'dissolved_oxygen',
					type: true,
					alarmType: true
				}, {
					name: "水温",
					value: '0',
					unit: '℃',
					field: 'water_temperature',
					type: true,
					alarmType: true
				}, {
					name: "PH",
					value: '0',
					unit: '',
					field: 'ph',
					type: true,
					alarmType: true
				}, {
					name: "电导率",
					value: '0',
					unit: 'S/m',
					field: 'conductivity',
					type: true,
					alarmType: true
				}, {
					name: "ORP",
					value: '0',
					unit: 'mg/L',
					field: 'orp',
					type: true,
					alarmType: true
				}, {
					name: "水位",
					value: '0',
					unit: 'm',
					field: 'level',
					type: true,
					alarmType: true
				}, {
					name: "水压1",
					value: '0',
					unit: 'kPa',
					field: 'pressure',
					type: true,
					alarmType: true
				}, {
					name: "水压2",
					value: '0',
					unit: 'kPa',
					field: 'pressure',
					type: true,
					alarmType: true
				}, {
					name: "氧气压力",
					value: '0',
					unit: 'kPa',
					field: 'pressure',
					type: true,
					alarmType: true
				}, {
					name: "电机",
					value: '开',
					unit: '--',
					field: '',
					type: true,
					alarmType: true
				}],
				contextData: [{
					name: "温度",
					value: '0',
					unit: '℃',
					field: 'Temperature',
					type: true,
					alarmType: true
				}, {
					name: "湿度",
					value: '0',
					unit: 'rh',
					field: 'Humidity',
					type: true,
					alarmType: true
				}, {
					name: "CO2",
					value: '0',
					unit: '',
					field: 'Co2',
					type: true,
					alarmType: true
				}, {
					name: "风速",
					value: '0',
					unit: 'm/s',
					field: 'WindSpeed',
					type: true,
					alarmType: true
				}, {
					name: "风力",
					value: '0',
					unit: '',
					field: 'WindPower',
					type: true,
					alarmType: true
				}, {
					name: "光照强度",
					value: '0',
					unit: '0',
					field: 'Illumination',
					type: true,
					alarmType: true
				}]
			}
		},
		onLoad() {
			uni.request({
				url: this.url + "/auth/login", //仅为示例，并非真实接口地址。
				method: "POST",
				data: {
					userName: "admin",
					password: "admin",
				},
				success: (data) => {
					if (data.data.code == 200) {
					
						this.token = data.data.data.tokenType + data.data.data.accessToken
						this.systemDataInquire(0);
						this.alarmListData();
					}
				}
			})
			// uni.getStorage({
			// 	key: 'token',
			// 	success: (e) => {
			// 		if (e.data) {
			// 			console.log()
			// 			this.token = e.data
			// 			this.systemDataInquire(0);
			// 			this.alarmListData();
			// 		}
			// 	},
			// 	fail: (e) => {
			// 		this.loginToken()
			// 	}
			// })
		},
		methods: {
			// 告警列表
			alarmListData() {
				console.log(this.token)
				uni.request({
					url: this.url + '/index/alarm/3/1',
					header: {
						'authorization': this.token
					},
					success: (data) => {
						console.log(data)
					}
				})
			},
			// 实时数据-下拉框
			bindPickerChange(e) {
				if (this.index != e) {
					this.index = e.target.value
					if (e.target.value < 3) {
						this.systemDataInquire(e.target.value)
					} else {
						this.environmentDataInquire(e.target.value)
					}
				}
			},
			// 系统实时数据查询
			systemDataInquire(index) {
				this.monitorData = this.systemData
				let url, fieladData
				switch (index) {
					case 0:
						url = 'systemOne'
						fieladData = [
							['ycgsSupplyOxygen', 'pressure', '氧气压力', '']
						]
						break;
					case 1:
						url = 'systemTwo'
						fieladData = [
							['YcgsWaterQuality', 'dissolvedOxygen', '溶氧', ''],
							['YcgsWaterQuality', 'waterTemperature', '水温', ''],
							['YcgsWaterQuality', 'ph', 'PH', ''],
							['YcgsWaterQuality', 'orp', 'ORP', ''],
							['YcgsWaterQuality', 'conductivity', '电导率', ''],
							['YcgsWaterSupply', 'pressure', '水压1', ''],
							['YcgsSupplyOxygen', 'pressure', '氧气压力', ''],
							['YcgsReturnTank', 'level', '水位', '']
						]
						break;
					case 2:
						url = 'systemThree'
						fieladData = [
							['YcgsWaterSupplyThreeLeft', 'pressure', '水压1', ''],
							['YcgsWaterSupplyThreeRight', 'pressure', '水压2', ''],
							['YcgsSupplyOxygenThree', 'pressure', '氧气压力', ''],
							['YcgsReturnTankThree', 'level', '水位', '']
						]
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
				this.monitorData = this.contextData
				uni.request({
					url: this.url + '/index/monitoring',
					header: {
						'authorization': this.token
					},
					success: (data) => {
						if (data.data.code == 200) {
							let fieladData = [
								['YcgsMeteorological', room + 'Temperature', '温度', ''],
								['YcgsMeteorological', room + 'Humidity', '湿度', ''],
								['YcgsMeteorological', room + 'Co2', 'CO2', ''],
								['YcgsMeteorological', room + 'WindPower', '风速', ''],
								['YcgsMeteorological', room + 'WindSpeed', '风力', ''],
								['YcgsEnvironmentalScience', room + 'Illumination', '光照强度', '']
							]
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
					each[3] = data[each[0]][each[1]].toFixed(1)
					link.push([each[2], each[3]])
				})
				this.monitorData.forEach(each => {
					if (each.name != "电机") each.value = "0"
				})
				link.forEach(each => {
					let fill = this.monitorData.filter(fill => fill.name === each[0])[0];
					fill.value = each[1]
				})
			},
			// 监控视频Token获取
			vodeoTokenFuntion() {
				uni.request({
					url: "http://open.ys7.com/api/lapp/token/get", //仅为示例，并非真实接口地址。
					method: "POST",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						appKey: '6b9f4ddfd88a4a509dc2239b2436d7e5',
						appSecret: '9c3a98980a746d4966c1b22c44a28360'
					},
					success: (data) => {
						if (data.data.code == 200) {
							uni.setStorage({
								key: 'vodeoToken',
								data: data.data.data.tokenType + data.data.data.accessToken
							})
						}
					}
				})
			},
			// 获取logintoken
			loginToken() {
				uni.request({
					url: this.url + "/auth/login", //仅为示例，并非真实接口地址。
					method: "POST",
					data: {
						userName: 'admin',
						password: 'admin',
					},
					success: (data) => {
						if (data.data.code == 200) {
							uni.setStorage({
								key: 'token',
								data: data.data.data.tokenType + data.data.data.accessToken
							})
							uni.reLaunch({
								url: '../index/index'
							});
						}
					}
				})
			},
			// 视频全屏播放
			videoFullPlay(url) {
				this.videoUrl = url;
				let videoContext = uni.createVideoContext('myVideo');
				videoContext.requestFullScreen();
				setTimeout(() => {
					videoContext.play();
				}, 1000);
				this.videoShow = true
			},
			//视频退出全屏
			fullscreenchange() {
				this.videoShow = false
				let videoContext = uni.createVideoContext('myVideo');
				videoContext.stop();
				this.videoUrl = '';

			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.reLaunch({
						url: '../index/index'
					});
				}, 1000);
			},
			kpiswitchTab(num) {
				// console.log(num)
				switch (num) {
					case 0:
						uni.navigateTo({
							url: '../work/monitor'
						});
						break;
				}
			}
		}
	}
</script>

<style lang="less">
	#index {


		.interval {
			height: 10px;
			background: #F6F7F7;
		}

		.kpi-alarm {
			padding-top: 50px;
			background: linear-gradient(0deg, #2478FF 0%, #2693FF 100%);

			.title {
				color: #FFFFFF;
				font-size: 20px;
				font-weight: bold;
				text-align: center;
				padding: 0px 0px 30px 0px;
			}
		}

		.kpi {
			display: flex;
			justify-content: space-between;
			text-align: center;
			font-size: 14px;
			padding: 0px 20px;

			.border {
				width: 37px;
				height: 37px;
				margin: auto;
				position: relative;
				border-radius: 4px;
			}

			.name {
				font-size: 14px;
				margin-top: 10px;
				margin-bottom: 20px;
				color: #FFFFFF;
			}
		}

		.alarm {
			border-top-right-radius: 20px;
			border-top-left-radius: 20px;
			background: #FFFFFF;
			padding: 20px 15px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			text-align: center;

			.alarm-for {
				display: flex;
				justify-content: space-between;
				text-align: left;

				.type-text {
					display: flex;
				}

				.type {
					width: 35px;
					height: 18px;
					line-height: 18px;
					text-align: center;
					font-size: 12px;
					color: #FFFFFF;
					border-radius: 18px;
				}

				.text {
					color: #111111;
					font-size: 14px;
					font-weight: 500;
					margin-left: 10px;
				}

				.tiem {
					font-size: 12px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #5F5F5F;
				}
			}

			.alarm-for:nth-child(2) {
				margin: 10px 0px;
			}
		}

		.video {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0px 12px;
			margin: 17px 0px;

			.video-title {
				width: 100%;
				color: #111111;
				font-size: 18px;
				font-weight: bold;
			}

			.video-for {
				width: 45%;
				margin-top: 15px;

				.name {
					text-align: center;
					font-size: 14px;
					margin-top: 10px;
				}

				.border {
					width: 100%;
					height: 95px;
					background: #F5F7FA;

					image {
						width: 100%;
						height: 100%;
						border-radius: 4px;
					}

					.border-video {
						width: 0px;
						height: 0px;
					}
				}
			}
		}

		.monitor {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			padding: 0px 12px;
			margin: 17px 0px;

			.monitor-title {
				color: #111111;
				font-size: 18px;
				font-weight: bold;
			}

			.select {
				line-height: 29px;
				display: flex;

				.monitor-image {
					width: 30px;
					height: 20px;
					margin-top: 5px;
				}
			}

			.monitor-data {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 5px;

				.monitor-for {
					width: 48%;
					border: 1px solid #F3F9FF;
					margin-top: 10px;
					box-shadow: 0px 4px 6px 0px rgba(44, 150, 255, 0.08);
					border-radius: 4px;

					.name-value {
						display: flex;
						justify-content: space-between;
						color: #111111;
						padding: 12px 12px 0px 12px;

						.name {
							font-size: 14px;
						}

						.value {
							font-size: 16px;
							font-weight: bold;
						}
					}

					.type-unit {
						display: flex;
						font-size: 12px;
						padding: 3px 12px 12px 12px;
						justify-content: space-between;

						.type {
							width: 35px;
							height: 18px;
							line-height: 18px;
							color: #FFFFFF;
							text-align: center;
							border-radius: 4px;
						}

						.unit {
							color: #99999A;
							padding-top: 2px;
						}
					}

					.border {
						border-top: 1px solid #F5F7FA;
					}

					.state {
						display: flex;
						font-size: 12px;
						color: #5F5F5F;
						padding: 6px 12px;
						position: relative;
						margin-left: 10px;

						.icon {
							width: 6px;
							height: 6px;
							position: absolute;
							top: 50%;
							left: 0px;
							transform: translateY(-50%);
							border-radius: 3px;
							background: #2BE6A8;
						}
					}
				}
			}
		}

	}
</style>
