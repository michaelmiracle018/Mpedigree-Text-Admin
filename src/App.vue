<template>
	<Navigation  v-if="!navigation"/>

	<router-view />
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
	name: "App",
	components: {
    Navigation
  },
     data() {
        return {
            navigation: null,
        }
    },
  methods: {
    handleLogout() {
      this.$store.dispatch("logout");
    },
    checkRoute() {
      if (
        this.$route.name === "Login" ||
        this.$route.name === "Register" 
      ) {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
   watch: {
    $route() {
      this.checkRoute();
    }
  },
};
</script>

<style></style>
