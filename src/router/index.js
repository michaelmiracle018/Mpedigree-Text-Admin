import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DashBoard from "../components/DashBoard.vue";
import Category from "../components/Category.vue";
import Customer from "../components/Customer.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			title: "Home",
		},
	},
	{
		path: "/DashBoard",
		name: "DashBoard",
		component: DashBoard,
		meta: {
			title: "DashBoard",
		},
	},
	{
		path: "/Category",
		name: "Category",
		component: Category,
		meta: {
			title: "Category",
		},
	},
	{
		path: "/Customer",
		name: "Customer",
		component: Customer,
		meta: {
			title: "Customer",
		},
	},
	{
		path: "/Login",
		name: "Login",
		component: Login,
		meta: {
			title: "Login",
		},
	},
	{
		path: "/Register",
		name: "Register",
		component: Register,
		meta: {
			title: "Register",
		},
	},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | Text`;
	next();
});
export default router
