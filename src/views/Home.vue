<template>
	<main class="wrapper">
		<div class="container">
			<h1>Register With Us To View Our Admin Dashboard</h1>
			<h2>You Can Get An Account By Simply Registering With Us.</h2>
			<h3>Already Have An Account?</h3>
			<div class="center-btn">
				<router-link id="btn" to="Login">Login In</router-link>
			</div>
		</div>
	</main>
	
</template>

<script>
export default {
	name: "Home",
};
</script>

<style scoped>
.wrapper {
	width: 100%;
	height: 90%;
	bottom: 0;
	left: 0;
	background-color: rgb(17, 31, 53);
	position: absolute;
	z-index: 7;
}
.container h1 {
	font-family: "Courier New", Courier, monospace;
	letter-spacing: 1px;
	word-spacing: 2px;
	color: #fff;
	font-size: 40px;
	font-weight: 888;
	text-transform: uppercase;
	text-align: center;
	padding: 2rem;
}

.container h3 {
	text-align: center;
	font-family: "Courier New", Courier, monospace;
	color: #fff;
	font-size: 16px;
	font-weight: bold;
}

.center-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2rem;
}
.container #btn {
	padding: 1rem;
	width: 10%;
	text-align: center;
	font-family: "Courier New", Courier, monospace;
	font-size: 16px;
	font-weight: bold;
	outline: none;
	border: none;
	color: #fff;
	background-color: rgb(4, 19, 44);
}

#btn:hover {
	background-color: rgb(11, 25, 48,)
}
</style>
