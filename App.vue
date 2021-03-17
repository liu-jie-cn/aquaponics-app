<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			plus.screen.lockOrientation('portrait-primary');
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	/* @import url("@/static/css/iconfont.less"); */
	@import url("http://at.alicdn.com/t/font_2108548_ia7alkvq2ls.css");

	@font-face {
		font-family: "DIN";
		src: url("./static/font/DIN-Regular.otf")
	}

	@font-face {
		font-family: "DINBLOD";
		src: url("./static/font/din-bold.otf")
	}

	.login .modal-title {
		position: relative;
		top: 20px;
		font-size: 20px !important;
		font-weight: bold;

	}

	.login .btn {
		display: none;
	}

	.safety .uni-icon-success {
		color: #14E39E;
		line-height: 42px;
		margin-right: 10px;
	}

	page {
		height: 100%;
	}

	.uni-tabbar__label {
		color: #111111 !important;
		font-size: 12px !important;
	}

	uni-page-refresh {
		display: none;
	}

	.page-head {
		font-size: 20px;
		font-weight: bold;
		color: #111111;
		line-height: 20px;
		text-align: center;
		padding: 50px 0px 14px 0px;
		border-bottom: 1px solid #E8ECF0;
		width: 100%;

	}

	.monitor-tabBar {
		width: calc(100% - 24px);
		position: relative;
		padding: 50px 12px 13px 12px;
		background: #FFFFFF;
		position: fixed;
		top: 0px;
		background: #FFFFFF;
		z-index: 999;

		.icon-jiantou-left {
			width: 5%;
			position: absolute;
			font-weight: bolder;
			line-height: 24px;
		}

		.icon-tongji {
			width: 5%;
			position: absolute;
			right: 15px;
			font-size: 20px;
			line-height: 24px;
		}

		.tabBar-title {
			color: #111111;
			font-size: 18px;
			font-weight: bolder;
			text-align: center;
		}
	}

	.hint {
		color: #5F5F5F;
		text-align: center;
		font-size: 12px;
		padding: 6px 0px;
	}
</style>
