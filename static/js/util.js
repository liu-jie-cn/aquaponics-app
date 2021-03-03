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
			return yinian + "年" + yer + "月" + riqi + "日"
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
}
