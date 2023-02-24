<template>
	<el-container>
		<!-- 左侧导航 -->
		<el-aside width="200px" id="Slide">
			<el-scrollbar>
				<Slidebar></Slidebar>
			</el-scrollbar>
		</el-aside>
		<!-- 右侧内容 -->
		<el-container>
			<!-- 面包屑 -->
			<el-header>
				<Nav></Nav>
			</el-header>
			<!-- 主体内容 -->
			<el-main>
				<Main></Main>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import { Slidebar, Nav, Main } from './components/index'
export default {
	name: 'Layout',
	components: {
		Slidebar,
		Nav,
		Main
	}
}
</script>

<style scoped>
.el-container {
	width: 100%;
	height: 100%;
}
.el-container .el-aside {
	height: 100%;
	background-color: #304156;
	overflow: hidden;
}
.el-header {
	background-color: #ffffff;
	-webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.el-main {
	padding: 0 20px;
}
</style>
