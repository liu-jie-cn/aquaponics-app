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

<style>
	/*每个页面公共css */
	/* @import url("@/static/css/iconfont.less"); */
	@import url("http://at.alicdn.com/t/font_2108548_ljk1e1a72m.css");
	page {
		height: 100%;
	}
</style>
