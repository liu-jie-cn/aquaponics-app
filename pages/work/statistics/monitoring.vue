<template>
	<view class="monitoring">
		<view class="monitor-tabBar">
			<view class="iconfont icon-jiantou-left" @click="navigateBack"></view>
			<view class="tabBar-title">监测数据</view>
		</view>
		<view class="stance"></view>
		<view class="monitoring-data">
			<view class="monitoring-select">
				<view class="select" v-for="(item,index) in selectData" :key="index">
					<picker @change="bindPickerChange($event,index)" :value="item.name" :range="item.data">
						<view class="uni-input">{{item.name}}</view>
					</picker>
					<image class="monitor-image" src="../../../static/svg/xia.svg" mode=""></image>
				</view>
				<view class="split" style="left: 50%;"></view>
			</view>
			<view class="time-btn">
				<view :class="['order-btn',timeBtnIndex==index?'order-btn-pitch':'']" v-for="(item,index) in ['近24h','近7天','近一月','近一年']"
				 :key="index" @click="tiemOrder(index)">
					{{item}}
				</view>
			</view>
			<view class="monitoring-echarts" v-for="(item,index) in echartsData" :key="index" v-show="index==selectIndex">
				<view class="echarts-for" v-for="(data,num) in item" :key="num" v-show="!data.empty">
					<view class="name-unit">
						<view class="name">
							<image class="info" src="../../../static/img/info.png" mode=""></image>
							<text>{{data.name}}</text>
						</view>
						<view class="unit">{{data.unit}}</view>
					</view>
					<echarts class="echartsClass" :option="data.option"></echarts>
					<view class="null" v-show="data.exist">暂无数据</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import Echarts from '@/components/echarts/echarts.vue'
	import util from '@/static/js/util.js'
	export default {
		name: '',
		props: {},
		components: {
			Echarts
		},
		data() {
			return {
				//绑定的数据
				token: '',
				selectData: [{
					name: '1号系统',
					data: ['1号系统', '2号系统', '3号系统', '棚外环境', '棚内环境']
				}, {
					name: '全项检测',
					data: ['']
				}],
				returnData: [
					[{
						id: '0001832010230002',
						name: '气压',
						unit: 'kpa',
						empty: false,
						exist: false,
						field: 'pressure',
						option: {
							tooltip: {
								trigger: 'axis',
								position: function(pos, params, dom, rect, size) {
									// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
									var obj = {
										top: 0
									};
									obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
									return obj;
								},
								axisPointer: {
									type: 'shadow'
								}
							},
							grid: {
								top: '15%',
								right: '5%',
								left: '12%',
								bottom: '13%'
							},
							xAxis: [{
								type: 'category',
								boundaryGap: false,
								data: [],
								axisLine: {
									lineStyle: {
										color: '#F0F3F7'
									}
								},
								axisTick: {
									show: false,
								},
								axisLabel: {
									margin: 10,
									color: '#5F5F5F',
									textStyle: {
										fontSize: 12
									},
								},
							}],
							yAxis: [{
								type: 'value',
								max: 1,
								min: 0,
								axisLabel: {
									formatter: '{value}',
									color: '#5F5F5F',
								},
								axisTick: {
									show: false,
								},
								axisLine: {
									show: false
								},
								splitLine: {
									// show: false,
									lineStyle: {
										type: 'solid',
										color: '#F0F3F7'
									}
								}
							}],
							series: [{
								type: 'line',
								smooth: true,
								data: [],
								symbolSize: 0,
								areaStyle: {},
								lineStyle: {
									color: "rgba(38, 147, 255, 1)",
									width: 4
								},
								// 自定义变量，以数组形式传递渐变参数
								linearGradient: [0, 0, 0, 1,
									[{
											offset: 0,
											color: 'rgba(38, 147, 255, 0.4)'
										},
										{
											offset: 1,
											color: 'rgba(38, 147, 255, 0.15)'
										}
									]
								]
							}]
						}
					}, {
						id: '0001662010230003',
						name: '电机',
						unit: '',
						empty: false,
						exist: false,

						field: '',
						option: {
							tooltip: {
								trigger: 'axis',
								formatter: '启动频率:{c}<br/>{b}'
							},
							dataZoom: [],
							xAxis: [{
								type: 'category',
								boundaryGap: false,
								data: [], //data.time,
								axisLine: {
									show: false,
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									margin: 10,
									textStyle: {
										color: '#CCCCCC',
										fontSize: 12
									}
								},
							}],
							yAxis: {
								data: ['关', '开'],
								boundaryGap: false,
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									show: true
								},
								axisLabel: {
									margin: 10,
									textStyle: {
										color: '#CCCCCC',
										fontSize: 12
									}
								},
							},
							series: [{
									data: [], //data.xfj
									type: 'line',
									symbolSize: 0,
									itemStyle: {
										color: '#2693FF'
									},
									lineStyle: {
										width: 1
									}
								}, {
									data: [], //data.xfo,
									type: 'line',
									symbolSize: 0,
									itemStyle: {
										color: '#2693FF'
									},
									lineStyle: {
										width: 1
									}
								},
								{
									data: [], // data.xtj,
									type: 'line',
									symbolSize: 0,
									itemStyle: {
										color: '#2693FF'
									},
									areaStyle: {},
									lineStyle: {
										width: 1
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(74, 146, 251,1)'
											},
											{
												offset: 1,
												color: 'rgba(74, 146, 251,0)'
											}
										]
									]
								},
								{
									data: [], //data.xto,
									type: 'line',
									symbolSize: 0,
									itemStyle: {
										color: '#2693FF'
									},
									areaStyle: {},
									lineStyle: {
										width: 1
									},
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(74, 146, 251,1)'
											},
											{
												offset: 1,
												color: 'rgba(74, 146, 251,0)'
											}
										]
									]
								}
							]
						},
					}],
					[{
							id: '0001902010230001',
							name: 'ORP',
							unit: '',
							empty: false,
							exist: false,

							field: 'orp',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001902010230001',
							name: 'PH',
							unit: '',
							empty: false,
							exist: false,

							field: 'ph',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001902010230001',
							name: '水温',
							unit: '℃',
							empty: false,
							exist: false,

							field: 'waterTemperature',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001902010230001',
							name: '溶氧值',
							unit: 'mg/L',
							empty: false,
							exist: false,

							field: 'dissolvedOxygen',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001902010230001',
							name: '电导率',
							unit: 'mg/L',
							empty: false,
							exist: false,

							field: 'conductivity',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001832010230001',
							name: '水压',
							unit: 'kpa',
							empty: false,
							exist: false,

							field: 'pressure',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001832010230002',
							name: '气压',
							unit: 'kpa',
							empty: false,
							exist: false,

							field: 'pressure',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001842010230001',
							name: '水位',
							unit: 'm',
							empty: false,
							exist: false,

							field: 'level',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						}, {
							id: '0001662010230002',
							name: '电机',
							unit: '',
							empty: false,
							exist: false,

							field: '',
							option: {
								tooltip: {
									trigger: 'axis',
									formatter: '启动频率:{c}<br/>{b}'
								},
								dataZoom: [],
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [], //data.time,
									axisLine: {
										show: false,
									},
									axisTick: {
										show: false
									},
									axisLabel: {
										margin: 10,
										textStyle: {
											color: '#CCCCCC',
											fontSize: 12
										}
									},
								}],
								yAxis: {
									data: ['关', '开'],
									boundaryGap: false,
									axisLine: {
										show: false
									},
									axisTick: {
										show: false
									},
									axisLabel: {
										show: true
									},
									axisLabel: {
										margin: 10,
										textStyle: {
											color: '#CCCCCC',
											fontSize: 12
										}
									},
								},
								series: [{
										data: [], //data.xfj
										type: 'line',
										symbolSize: 0,
										itemStyle: {
											color: '#2693FF'
										},
										lineStyle: {
											width: 1
										}
									}, {
										data: [], //data.xfo,
										type: 'line',
										symbolSize: 0,
										itemStyle: {
											color: '#2693FF'
										},
										lineStyle: {
											width: 1
										}
									},
									{
										data: [], // data.xtj,
										type: 'line',
										symbolSize: 0,
										itemStyle: {
											color: '#2693FF'
										},
										areaStyle: {},
										lineStyle: {
											width: 1
										},
										// 自定义变量，以数组形式传递渐变参数
										linearGradient: [0, 0, 0, 1,
											[{
													offset: 0,
													color: 'rgba(74, 146, 251,1)'
												},
												{
													offset: 1,
													color: 'rgba(74, 146, 251,0)'
												}
											]
										]
									},
									{
										data: [], //data.xto,
										type: 'line',
										symbolSize: 0,
										itemStyle: {
											color: '#2693FF'
										},
										areaStyle: {},
										lineStyle: {
											width: 1
										},
										linearGradient: [0, 0, 0, 1,
											[{
													offset: 0,
													color: 'rgba(74, 146, 251,1)'
												},
												{
													offset: 1,
													color: 'rgba(74, 146, 251,0)'
												}
											]
										]
									}
								]
							},
						}
					],
					[{
							id: '0001832010230006',
							name: '水压1',
							unit: 'kpa',
							empty: false,
							exist: false,

							field: 'pressure',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001832010230005',
							name: '水压2',
							unit: 'kpa',
							empty: false,
							exist: false,

							field: 'pressure',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001832010230007',
							name: '气压',
							unit: 'kpa',
							empty: false,
							exist: false,

							field: 'pressure',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001842010230002',
							name: '水位',
							unit: 'm',
							empty: false,
							exist: false,

							field: 'level',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						}, {
							id: '0001662010230004',
							name: '电机',
							unit: '',
							empty: false,
							exist: false,

							field: '',
							option: {
								tooltip: {
									trigger: 'axis',
									formatter: '启动频率:{c}<br/>{b}'
								},
								dataZoom: [],
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [], //data.time,
									axisLine: {
										show: false,
									},
									axisTick: {
										show: false
									},
									axisLabel: {
										margin: 10,
										textStyle: {
											color: '#CCCCCC',
											fontSize: 12
										}
									},
								}],
								yAxis: {
									data: ['关', '开'],
									boundaryGap: false,
									axisLine: {
										show: false
									},
									axisTick: {
										show: false
									},
									axisLabel: {
										show: true
									},
									axisLabel: {
										margin: 10,
										textStyle: {
											color: '#CCCCCC',
											fontSize: 12
										}
									},
								},
								series: [{
										data: [], //data.xfj
										type: 'line',
										symbolSize: 0,
										itemStyle: {
											color: '#2693FF'
										},
										lineStyle: {
											width: 1
										}
									}, {
										data: [], //data.xfo,
										type: 'line',
										symbolSize: 0,
										itemStyle: {
											color: '#2693FF'
										},
										lineStyle: {
											width: 1
										}
									},
									{
										data: [], // data.xtj,
										type: 'line',
										symbolSize: 0,
										itemStyle: {
											color: '#2693FF'
										},
										areaStyle: {},
										lineStyle: {
											width: 1
										},
										// 自定义变量，以数组形式传递渐变参数
										linearGradient: [0, 0, 0, 1,
											[{
													offset: 0,
													color: 'rgba(74, 146, 251,1)'
												},
												{
													offset: 1,
													color: 'rgba(74, 146, 251,0)'
												}
											]
										]
									},
									{
										data: [], //data.xto,
										type: 'line',
										symbolSize: 0,
										itemStyle: {
											color: '#2693FF'
										},
										areaStyle: {},
										lineStyle: {
											width: 1
										},
										linearGradient: [0, 0, 0, 1,
											[{
													offset: 0,
													color: 'rgba(74, 146, 251,1)'
												},
												{
													offset: 1,
													color: 'rgba(74, 146, 251,0)'
												}
											]
										]
									}
								]
							},
						}
					],
					[{
							id: '0002912011020001',
							name: '温度',
							unit: '℃',
							empty: false,
							exist: false,

							field: 'outdoorTemperature',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0002912011020001',
							name: '湿度',
							unit: 'rh',
							empty: false,
							exist: false,

							field: 'outdoorHumidity',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0002912011020001',
							name: 'CO2',
							unit: '',
							empty: false,
							exist: false,

							field: 'outdoorCo2',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0002912011020001',
							name: '风力',
							unit: '级',
							empty: false,
							exist: false,

							field: 'outdoorWindPower',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0002912011020001',
							name: '风速',
							unit: 'm/s',
							empty: false,
							exist: false,

							field: 'outdoorWindSpeed',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001892010230001',
							name: '光照强度',
							unit: 'lx',
							empty: false,
							exist: false,

							field: 'outdoorIllumination',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001892010230001',
							name: 'PM10',
							unit: 'μg/m3',
							empty: false,
							exist: false,

							field: 'outdoorPm10',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						}, {
							id: '0001892010230001',
							name: 'PM2.5',
							unit: 'μg/m3',
							empty: false,
							exist: false,

							field: 'outdoorPm25',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						}
					],
					[{
							id: '0002912011020001',
							name: '温度',
							unit: '℃',
							empty: false,
							exist: false,

							field: 'indoorTemperature',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0002912011020001',
							name: '湿度',
							unit: 'rh',
							empty: false,
							exist: false,

							field: 'indoorHumidity',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0002912011020001',
							name: 'CO2',
							unit: '',
							empty: false,
							exist: false,

							field: 'indoorCo2',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0002912011020001',
							name: '风力',
							unit: '级',
							empty: false,
							exist: false,

							field: 'indoorWindPower',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0002912011020001',
							name: '风速',
							unit: 'm/s',
							empty: false,
							exist: false,

							field: 'indoorWindSpeed',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001892010230001',
							name: '光照强度',
							unit: 'lx',
							empty: false,
							exist: false,

							field: 'indoorIllumination',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						},
						{
							id: '0001892010230001',
							name: 'PM10',
							unit: 'μg/m3',
							empty: false,
							exist: false,

							field: 'indoorPm10',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						}, {
							id: '0001892010230001',
							name: 'PM2.5',
							unit: 'μg/m3',
							empty: false,
							exist: false,
							field: 'indoorPm25',
							option: {
								tooltip: {
									trigger: 'axis',
									position: function(pos, params, dom, rect, size) {
										// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
										var obj = {
											top: 0
										};
										obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
										return obj;
									},
									axisPointer: {
										type: 'shadow'
									}
								},
								grid: {
									top: '15%',
									right: '5%',
									left: '12%',
									bottom: '13%'
								},
								xAxis: [{
									type: 'category',
									boundaryGap: false,
									data: [],
									axisLine: {
										lineStyle: {
											color: '#F0F3F7'
										}
									},
									axisTick: {
										show: false,
									},
									axisLabel: {
										margin: 10,
										color: '#5F5F5F',
										textStyle: {
											fontSize: 12
										},
									},
								}],
								yAxis: [{
									type: 'value',
									max: 1,
									min: 0,
									axisLabel: {
										formatter: '{value}',
										color: '#5F5F5F',
									},
									axisTick: {
										show: false,
									},
									axisLine: {
										show: false
									},
									splitLine: {
										// show: false,
										lineStyle: {
											type: 'solid',
											color: '#F0F3F7'
										}
									}
								}],
								series: [{
									type: 'line',
									smooth: true,
									data: [],
									symbolSize: 0,
									areaStyle: {},
									lineStyle: {
										color: "rgba(38, 147, 255, 1)",
										width: 4
									},
									// 自定义变量，以数组形式传递渐变参数
									linearGradient: [0, 0, 0, 1,
										[{
												offset: 0,
												color: 'rgba(38, 147, 255, 0.4)'
											},
											{
												offset: 1,
												color: 'rgba(38, 147, 255, 0.15)'
											}
										]
									]
								}]
							}
						}
					]
				],
				timeBtnIndex: 0,
				selectIndex: 0,
				echartsData: [
					[],
					[],
					[],
					[]
				],
			};
		},
		onLoad() {
			//页面初始化触发事件
			uni.getStorage({
				key: 'token',
				success: (e) => {
					if (e.data) {
						this.token = e.data
						this.selectData[1].data = this.returnData[0].map(map => {
							return map.name
						})
						this.selectData[1].data.unshift("全项检测");
						this.echartsData[0] = this.returnData[0];
						this.tiemOrder(0)
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
			// 下拉框
			bindPickerChange(e, index) {
				let value = e.target.value;
				this.selectData[index].name = this.selectData[index].data[value];
				this.echartsData[value] = this.returnData[value];
				if (index == 0) {
					this.selectIndex = value;
					this.tiemOrder(0)
					this.selectData[1].data = this.returnData[value].map(map => {
						return map.name
					});
					this.selectData[1].name = '全项检测';
					this.selectData[1].data.unshift("全项检测");
					this.echartsData[value].forEach((each, num) => {
						each.empty = false
					})
				} else if (index == 1) {
					const fill = this.selectData[0].data.findIndex(fill => fill === this.selectData[0].name);
					this.echartsData[fill].forEach((each, num) => {
						if (num == value - 1) {
							each.empty = false
						} else if (value - 1 == -1) {
							each.empty = false
						} else {
							each.empty = true
						}
					})
				}
			},
			// 时间按钮
			tiemOrder(index) {
				this.timeBtnIndex = index;
				this.echartsData[this.selectIndex].forEach(each => {
					if (each.name == "电机") {
						this.electricalStatistics(each, index)
					} else {
						this.recordStatistics(each, index)
					}
				})
			},
			// 非电机设备数据统计
			recordStatistics(each, index) {
				const timeStr = ['day', 'week', 'month', 'year'];
				uni.request({
					url: this.url + '/record/' + timeStr[index] + "/" + each.id,
					header: {
						'authorization': this.token
					},
					success: (data) => {
						if (data.data.code == 200) {
							let xAxis = []; // 时间轴
							let chartData = []; // 数据
							(data.data.data).forEach(eachData => {
								let time = eachData.recordTime || eachData.testingTime
								switch (index) {
									case 0:
										xAxis.push(time.substr(11, 5))
										break;
									case 1:
									case 2:
										xAxis.push(time.substr(5, 5))
										break;
									case 3:
										xAxis.push(time.substr(0, 4))
										break;
								}
								if (index != 0) {
									chartData.push(+(JSON.parse(eachData.recordValue)[each.field].toFixed(2)));
								} else {
									chartData.push(+(eachData[each.field].toFixed(2)));
								}
							})
							const max = +(Math.max(...chartData) + 0.5).toFixed(0);
							const min = +(Math.min(...chartData) - 0.5).toFixed(0);
							each.option.xAxis[0].data = xAxis.reverse();
							each.option.yAxis[0].max = max;
							each.option.yAxis[0].min = min < 0 ? 0 : min;
							each.option.series[0].data = chartData;
							each.exist = false
						} else if (data.data.code == 204) {
							each.option.xAxis[0].data = [];
							each.option.yAxis[0].max = "";
							each.option.yAxis[0].min = "";
							each.option.series[0].data = [];
							each.exist = true
						}
					}
				})
			},
			// 电机设备数据统计
			electricalStatistics(each, index) {
				uni.request({
					url: this.url + '/record/di/' + each.id,
					header: {
						'authorization': this.token
					},
					success: (data) => {
						if (data.data.code == 200) {
							let link = (data.data.data.dataInfo).map(map => {
								let time = map.powerOffTime || map.powerOnTime;
								return {
									time: time.slice(11, 16),
									value: map.deviceStatus ? "t" : "f"
								}
							});
							const eleData = util.electricalEchartsData(link, util.datastime('yous').slice(11, 16));
							each.option.xAxis[0].data = eleData.time;
							each.option.series[0].data = eleData.xfj;
							each.option.series[1].data = eleData.xfo;
							each.option.series[2].data = eleData.xtj;
							each.option.series[3].data = eleData.xto;
							each.option.dataZoom = [{
								show: true,
								realtime: true,
								start: 0,
								end: 40,
								textStyle: {
									color: '#CCCCCC',
									fontSize: 12
								}
							}, {
								type: 'inside',
								start: 0,
								end: 40,
							}];
							each.exist = false;
						} else {
							each.option.yAxis.data = [];
							each.option.xAxis[0].data = [];
							each.option.series[0].data = [];
							each.option.series[1].data = [];
							each.option.series[2].data = [];
							each.option.series[3].data = [];
							each.option.dataZoom = []
							each.exist = true
						}
					}
				})
			},
			// 下拉刷新页面
			onPullDownRefresh() {
				setTimeout(function() {
					uni.stopPullDownRefresh();
					uni.redirectTo({
						url: '../statistics/monitoring'
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
	.monitoring {
		min-height: 100%;
		background: #F5F7FA;

		.stance {
			height: 207px; 
		}
		.monitoring-select {
			width: calc(100% - 54px);
			display: flex;
			padding: 15px 27px;
			background: #FFFFFF;
			position: fixed;
			top: 87px;
			z-index: 999;

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

			.time {
				width: 50%;
				line-height: 29px;
				text-align: center;
			}

			.split {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 1px;
				height: 11px;
				background: #E8ECF0;
			}
		}

		.time-btn {
			width: calc(100% - 24px);
			padding: 10px 12px;
			display: flex;
			justify-content: space-between;
			position: fixed;
			background: #F5F7FA;
			top: 146px;
			z-index: 999;

			.order-btn {
				color: #99999A;
				background: #FFFFFF;
				border: 1px solid #E9E9E9;
				border-radius: 30px;
				padding: 10px 20px;
				font-size: 14px;
			}

			.order-btn-pitch {
				color: #2693FF;
				background: #E9F1FA;
				border: 1px solid #2693FF;
			}
		}

		.monitoring-echarts {
			position: relative;
			// top: 50px;
			// margin-top: 50px;
			padding: 0px 12px 12px 12px;
			border-radius: 8px;

			.echarts-for {
				width: calc(100% - 24px);
				background: #FFFFFF;
				padding: 20px 12px;
				position: relative;

				.name-unit {
					display: flex;
					justify-content: space-between;

					text {
						margin-left: 8px;
						font-size: 17px;
						color: #111111;
					}

					.info {
						height: 17px;
						width: 17px;
						position: relative;
						top: 3px;
					}

					.unit {
						color: #99999A;
						font-size: 12px;
						position: relative;
						top: 3px;
					}
				}

				.echartsClass {
					width: 100%;
					height: 194px;
					margin-top: 11px;
				}

				.null {
					position: absolute;
					bottom: 0px;
					width: 100%;
					height: 194px;
					line-height: 194px;
					text-align: center;
				}

			}

			.echarts-for:not(:first-child) {
				margin-top: 8px;
			}
		}
	}
</style>
