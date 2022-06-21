<template>
	<form action="#!" id="main">
		<h2>Customer account</h2>
		<div class="form-group">
			<div class="input-register">
				<label for="username" class="label">Name</label>
				<input type="text" id="username-first" v-model="name" required />
			</div>

			<div class="input-register">
				<label for="email">Email</label>
				<input type="email" id="username" v-model="email" required />
			</div>
		</div>
		<div class="form-group">
			<div class="input-register">
				<label for="username" class="label">Phone</label>
				<input type="text" id="username-first" v-model="phone" required />
			</div>

			<div class="input-register">
				<label for="password">Address</label>
				<input type="text" id="username" v-model="address" required />
			</div>
		</div>
		<div class="msg" v-if="error">{{ errorMsg }}</div>
		<button type="submit" @click.prevent="submit()">Submit</button>
	</form>
</template>

<script>
// import { mapActions } from "vuex";
export default {
	data() {
		return {
			name: "",
			email: "",
			phone: "",
			address: "",
			entityId: localStorage.getItem("userId"),
			errorMsg: "",
			error: null,
		};
	},
	methods: {
		// ...mapActions(["createCustomer"]),
		submit() {
			const credentials = {
				email: this.email,
				phone_number: this.phone,
				address: this.address,
				name: this.name,
				entity_id: this.entityId,
			};
			if (
				(this.name !== "",
				this.email !== "",
				this.phone !== "",
				this.address !== "")
			) {
				this.error = false;
				this.$store.dispatch("createCustomer", credentials)
				(this.name = ""),
				(this.email = ""),
				(this.phone = ""),
					(this.address = "");
				// e.preventDefault();
			} else { 
				
				this.error = true
				this.errorMsg = "Please fill all empty fields"
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
