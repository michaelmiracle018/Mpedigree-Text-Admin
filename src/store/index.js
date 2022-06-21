import { createStore } from 'vuex'

;
import router from "../router/index";

import axios from "axios";

import "../assets/DashBoard.css";
import "../assets/Style.css";

const getCategory = "/inventory/category/list/";
const registerUrl = "/entity/signup";
const baseURL = "https://staging.afcfta.app/api";
const loginUrl = "/individual/signin";
const categoryURL = "/inventory/category/add/";
const customerURL = "/inventory/customers/add/";

const token = JSON.parse(localStorage.getItem("signInToken"));
const userId = localStorage.getItem("userId");

export default createStore({
	state: {
		allCustomers: [],
		categories: [],
		signInToken: null,
		userId: null,
		user: null,
	},
	getters: {
		getAllCustomers: (state) => state.allCustomers,
		isLoggedIn: (state) => !!state.signInToken,
		user: (state) => state.user,
		getAllCategories: (state) => state.categories,
		ifAuthenticated(state) {
			return state.signInToken !== null;
		},
	},
	actions: {
		// LOGIN ACTION
		login({ commit }, credential) {
			return axios
				.post(`${baseURL}${loginUrl}`, {
					email: credential.email,
					password: credential.password,
				})
				.then((res) => {
					localStorage.setItem("signInToken", JSON.stringify(res.data.token)),
						localStorage.setItem(
							"userId",
							JSON.stringify(res.data.entities[0].entity.id),
						);
					commit("loginToken", {
						signInToken: res.data.token,
						userId: res.data.entities[0].entity.id,
					});
					router.push({path: "/DashBoard"});
				})
				.catch((error) => {
					console.log(error);
					router.push("/Register");
				});
		},
		//  REGISTER ACTION
		register({ commit }, credential) {
			return axios
				.post(`${baseURL}${registerUrl}`, {
					name: credential.name,
					type: credential.type,
					market: credential.market,
					address: credential.address,
					admin_phone: credential.admin_phone,
					admin_email: credential.admin_email,
					admin_password: credential.admin_password,
					admin_last_name: credential.admin_last_name,
					admin_first_name: credential.admin_first_name,
					admin_other_names: credential.admin_other_names,
				})
				.then((res) => {
					localStorage.setItem("signInToken", JSON.stringify(res.data.token)),
						localStorage.setItem(
							"userId",
							JSON.stringify(res.data.entities[0].id),
						);
					commit("loginToken", {
						signInToken: res.data.token,
						userId: res.data.entities[0].id,
					});
					router.push("/Dashboard");
				})
				.catch((error) => {
					console.error(error);
					
				});
		},
		// LOGOUT ACTION
		logout({ commit }) {
			localStorage.removeItem("signInToken");
			localStorage.removeItem("userId");
			router.push("/");
			commit("clearAuth");
		},
		// AUTO LOGIN ACTION
		autoLogin({ commit }) {
			const signInToken = JSON.parse(localStorage.getItem("signInToken"));
			const userId = JSON.parse(localStorage.getItem("userId"));
			if (signInToken && userId) {
				router.push("/Dashboard");
			}
			commit("loginToken", {
				signInToken: signInToken,
				userId: userId,
			});
		},
		// CATEGORIES ACTION
		createCategory({ commit }, credential) {
			return axios
				.post(
					`${baseURL}${categoryURL}`,
					{
						category_name: credential.category_name,
						entity_id: credential.entity_id,
					},
					{
						headers: {
							Authorization: `${token}`,
						},
					},
				)
				.then((res) => {
					commit("newCategoryInfo", res.data);
					router.push("/Dashboard");
				})
				.catch((error) => {
					console.log(error);
				});
		},
		
		fetchAllCategories({ commit }) {
			return axios
				.get(`${baseURL}${getCategory}${userId}`, {
					headers: { Authorization: `${token}` },
				})
				.then((res) => {
					commit(
						"setCategories",
						res.data.categories.filter(
							(item) => item.category_name !== "Uncategorized",
						),
					);
				})
				.catch((error) => {
					console.log(error);
				});
		},

		deleteCategory({ commit }, categoryId) {
			return axios
				.delete(
					`https://staging.afcfta.app/api/inventory/category/${categoryId}/delete/`,
					{
						headers: { Authorization: `${token}` },
					},
				)
				.then(() => {
					commit("removeCategoryInfo", categoryId);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		// CUSTOMERS ACTION
		createCustomer({ commit }, credential) {
			return axios
				.post(
					`${baseURL}${customerURL}`,
					{
						email: credential.email,
						name: credential.name,
						phone_number: credential.phone_number,
						address: credential.address,
						entity_id: credential.entity_id,
					},
					{
						headers: {
							Authorization: `${token}`,
						},
					},
				)
				.then((res) => {
					commit("newCustomerInfo", res.data);
					router.push("/Dashboard");
				})
		},
		fetchAllCustomers({ commit }) {
			return axios
				.get(
					`https://staging.afcfta.app/api/inventory/customers/list/${userId}`,
					{
						headers: { Authorization: `${token}` },
					},
				)
				.then((res) => {
					commit("setCustomers", res.data.customer);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		deleteCustomer({ commit }, uuId) {
			return axios
				.delete(`https://staging.afcfta.app/api/inventory/customers/${uuId}/`, {
					headers: { Authorization: `${token}` },
				})
				.then(() => {
					commit("removeCustomerInfo", uuId);
				})
				.catch((error) => {
					console.log(error);
				});
		},

	},
	mutations: {
		loginToken(state, userData) {
			state.signInToken = userData.signInToken;
			state.userId = userData.userId;
		},
		clearAuth(state) {
			state.signInToken = null;
			state.userId = null;
		},
		newCategoryInfo(state, info) {
			if (Array.isArray(state?.categories)) {
				state.categories.push(info)
			} else {
				state.categories = []
				state.categories.push(info);
			}
		},
		setCategories: (state, category) => (state.categories = category),
		removeCategoryInfo(state, id) {
			state.categories = state.categories.filter((item) => item.id !== id);
		},
		
		newCustomerInfo(state, info) {
			if (Array.isArray(state?.allCustomers)) {
				state.allCustomers.push(info)
			} else {
				state.allCustomers = []
				state.allCustomers.push(info);
			}
		},
		setCustomers: (state, customer) => (state.allCustomers = customer),
		removeCustomerInfo(state, uuId) {
			console.log(uuId);
			console.log(state.allCustomers);
			state.allCustomers = state.allCustomers.filter((item) => item.uuid !== uuId);
		},
	},
});



