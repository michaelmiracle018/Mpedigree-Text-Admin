<template>
	<form action="#!" id="main">
		<h2>Category Account</h2>

		<div class="input-parent">
			<label for="username">Name</label>
			<input type="text" class="username" v-model="name" required />
		</div>

		<div class="msg" v-if="error">{{errorMsg}}</div>
		<button type="submit" @click.prevent="submit()">Submit</button>
	</form>
</template>

<script>
export default {
	data() {
		return {
			name: "",
			entityId: localStorage.getItem("userId"),
			errorMsg: "",
			error: null
		};
	},
	methods: {
		submit() {
			const credential = {
				category_name: this.name,
				entity_id: this.entityId,
			};
			if (this.name !== "") {
				this.error = false
				this.$store.dispatch("createCategory", credential)
			} else {
				this.error = true,
				this.errorMsg = "Please fill the empty field"
			}
		},
	},
};
</script>

<style scoped>
.msg {
	font-size: 12px;
	color: red;
	font-weight: bold;
	padding: 0.5rem;
	text-align: center;
}
</style>
