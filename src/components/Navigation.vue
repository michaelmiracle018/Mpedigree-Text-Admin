<template>
	<div class="nav-container" v-if="!auth">
		<div class="container">
			<div class="text-container">
				<h1>Welcome to our home page</h1>
			</div>
			<div class="sign-up-container">
				<i class="fa-solid fa-right-to-bracket"></i>
				<router-link class="btn-link" to="Login">Login/Register</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Navigation",

	created() {
		this.$store.dispatch("autoLogin");
    },
    computed: {
		auth() {
			return this.$store.getters.ifAuthenticated;
		},
	},
};
</script>

<style scoped>
.nav-container {
	position: fixed;
	top: 0;
	margin: 0;
	padding: 0;
	left: 0;
	height: 10%;
	background-color: rgb(34, 31, 31);
	width: 100vw;
}

.container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	padding: 10px;
}

.text-container {
	color: #fff;
	font-weight: bold;
	font-size: 1.3rem;
	text-transform: capitalize;
	margin-bottom: 10px;
}

.btn-link {
	color: #fff;
	font-weight: bold;
	font-size: 1.3rem;
	text-transform: capitalize;
	margin-right: 1rem;
	text-decoration: none;
	margin-bottom: 10px;
	cursor: pointer;
}

.btn-link:hover {
	color: rgb(9, 99, 246);
}

.sign-up-container i {
	color: #fff;
	font-weight: bold;
	font-size: 1.3rem;
}

i {
	position: absolute;
	right: 170px;
	margin: 0 auto;
	-webkit-transition: opacity 7s ease-in-out;
	-moz-transition: opacity 7s ease-in-out;
	-o-transition: opacity 7s ease-in-out;
	transition: opacity 7s ease-in-out;
}

@keyframes heartFadeInOut {
	0% {
		opacity: 1;
	}
	14% {
		opacity: 1;
	}
	28% {
		opacity: 0;
	}
	42% {
		opacity: 0;
	}
	70% {
		opacity: 0;
	}
}

i {
	animation-name: heartFadeInOut;
	animation-timing-function: ease-in-out;
	animation-iteration-count: infinite;
	animation-duration: 1s;
	animation-direction: alternate;
}
</style>
