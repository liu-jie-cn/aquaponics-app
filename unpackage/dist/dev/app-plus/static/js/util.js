export default {
	// 时间格式化
	datastime(type) {
		let myDate = new Date(); //获取当前时间
		let yinian = myDate.getFullYear(); //年
		let yer = parseInt(myDate.getMonth()) + 1; //月份
		if (yer <= 9) {
			yer = "0" + yer;
		}
		let riqi = myDate.getDate(); //日
		if (riqi <= 9) {
			riqi = "0" + riqi;
		}
		let time = myDate.getHours(); //获取当前小时数(0-23)
		if (time <= 9) {
			time = "0" + time;
		}
		let fen = myDate.getMinutes(); //获取当前分钟数(0-59)
		if (fen <= 9) {
			fen = "0" + fen;
		}
		let miao = myDate.getSeconds(); //获取秒钟数
		if (miao <= 9) {
			miao = "0" + miao;
		}
		if (type == 'nyr') {
			return yinian + "-" + yer + "-" + riqi
		} // 2021年1月14日
		if (type == 'yous') {
			return yinian + "-" + yer + "-" + riqi + " " + time + ":" + fen + ":" + miao //2021-01-14 16:47:36
		}
		if (type == 'int') {
			return parseInt(yinian + "" + yer + "" + riqi + time + "" + fen)
		} //202101141647
		return yinian + "年" + yer + "月" + riqi + "日" + " " + time + ":" + fen + ":" + miao //2021年1月14日 16:47:36
	},
	// 最近七天
	lastSevenDays(day) {
		function doHandleMonth(month) {
			var m = month;
			if (month.toString().length == 1) {
				m = "0" + month;
			}
			return m;
		}
		var today = new Date();
		var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
		today.setTime(targetday_milliseconds); //注意，这行是关键代码
		var tYear = today.getFullYear();
		var tMonth = today.getMonth();
		var tDate = today.getDate();
		tMonth = doHandleMonth(tMonth + 1);
		tDate = doHandleMonth(tDate);
		return tYear + "-" + tMonth + "-" + tDate;
	},
	// 当前月份天数
	monthNumber() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var d = new Date(year, month, 0);
		return d.getDate();
	},
	/**
	 * 以当前时间为准
	 * 0：日每十分钟一个点
	 * 1：近七天，前七天
	 * 2：当月日期
	 * 3：年
	 * */
	tiemOrder(index) {
		let timeData = [];
		let texr = 0;
		switch (index) {
			case 0: //日
				timeData[0] = this.datastime('yous').substring(5, 10)
				break;
			case 1: //周
				timeData = Array(7).fill(0).map((map, index) => {
					return this.lastSevenDays(-index).substring(5, 10)
				})
				break;
			case 2: //月
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let d = new Date(year, month, 0);
				for (let i = 0; i < d.getDate(); i++) {
					timeData.push(i + 1)
				}
				break;
			case 3:
				for (let i = 0; i < 12; i++) {
					timeData.push(i + 1)
				}
				break;
		}
		return timeData;
	},
	/**
	 * @param {Object} link
	 * *  let link = [
        { time: '09:50', value: 'f' },
        { time: '10:00', value: 't' },
        { time: '10:50', value: 'f' },
        { time: '10:51', value: 't' }
    ];
	 * @param {Object} newDate
	 * 当前时间时:分（14:50）
	 */
	electricalEchartsData(link, newDate) {
		let h = "",
			m = "",
			time = []
		for (var host = 0; host < 24; host++) {
			h = addZero(host)
			for (var minute = 0; minute < 60; minute++) {
				m = addZero(minute)
				time.push(h + ":" + m);
			}
		}

		function addZero(num) {
			if (parseInt(num) < 10) {
				num = '0' + num;
			} else {
				num = '' + num;
			}
			return num;
		}
		// let link = [
		//     { time: '09:50', value: 'f' },
		//     { time: '10:00', value: 't' },
		//     { time: '10:50', value: 'f' },
		//     { time: '10:51', value: 't' }
		// ];
		let tindex = 1;
		let findex = 1;
		let data = Array(1440).fill("")
		let xt = Array(1440).fill("")
		let xtj = Array(1440).fill("")
		let xto = Array(1440).fill("")
		let xf = Array(1440).fill("");
		let xfj = Array(1440).fill("")
		let xfo = Array(1440).fill("")
		link.forEach((each, index) => {
			let fillTime = time.findIndex(fill => fill === each.time);
			if (fillTime) {
				data[fillTime] = each.value
			};
			if (index == 0) {
				if (each.value == "t") {
					xtj[0] = "开"
				} else {
					xfj[0] = "关"
				}
			}
		})
		data.forEach((each, index) => {
			if (each == "t") {
				xt[index] = "开";
				xf[index] = "";
				each = "开";
			} else if (each == "f") {
				xf[index] = "关";
				xt[index] = "";
				each = "关";
			}
			each = "";
		})
		xt.forEach((each, index) => {
			if (each) {
				if (tindex % 2) {
					xto[index] = "";
					xtj[index] = each;
					tindex = 2
				} else {
					xtj[index] = "";
					xto[index] = each;
					tindex = 1
				}
			}
		})
		xf.forEach((each, index) => {
			if (each) {
				if (findex % 2) {
					xfo[index] = "";
					xfj[index] = each;
					findex = 2
				} else {
					xfj[index] = "";
					xfo[index] = each;
					findex = 1
				}
			}
		});
		let dataIndex = -1;
		let dataReplace = ""
		let fillIndex = time.findIndex(fill => fill === newDate);
		let dataSeries = [xtj, xto, xfj, xfo];
		data.forEach((each, index) => {
			if (xtj[index]) {
				dataIndex = 0
				dataReplace = xtj[index]
			} else if (xto[index]) {
				dataIndex = 1
				dataReplace = xto[index]
			} else if (xfj[index]) {
				dataIndex = 2
				dataReplace = xfj[index]
			} else if (xfo[index]) {
				dataIndex = 3
				dataReplace = xfo[index]
			}
			if (index <= fillIndex) {
				dataSeries[dataIndex][index] = dataReplace
			} else {
				dataSeries[dataIndex][index] = ""
			}
		})
		let show = true;
		dataSeries.forEach((each, index) => {
			each.forEach((child, num) => {
				if (child && child != each[num + 1] && show) {
					each[num + 1] = child
					show = false
				} else {
					show = true
				}
			})
		})
		return {
			"xtj": xtj,
			"xto": xto,
			"xfj": xfj,
			"xfo": xfo,
			"time": time
		};
	}
}
