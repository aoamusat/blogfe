<template>
  <main
    class="container-fluid mx-auto w-full flex justify-center items-center min-h-screen"
  >
    <div
      class="w-full md:w-1/4 flex min-h-full flex-col justify-center px-2 py-12"
    >
      <div class="mx-auto text-center">
        <NuxtLink class="text-center items-center" to="/">
          <a
            class="flex title-font font-medium items-center justify-center text-gray-900 mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              ></path>
            </svg>
          </a>
        </NuxtLink>
        <h2
          class="my-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>
      <Notification
        v-if="error"
        :text="error"
        className="text-red-900 bg-red-300"
      />

      <div class="my-3 sm:mx-auto w-full">
        <form method="post" class="space-y-6" @submit.prevent="userLogin">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                v-model="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                v-model="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <NuxtLink to="/register">
            <a
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >Create an account</a
            ></NuxtLink
          >
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import Notification from "../components/Notification.vue";
export default {
  auth: false,
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async userLogin() {
      try {
        this.error = null;
        console.log("1");
        await this.$axios.get(
          `${process.env.API_BASE_URL}/sanctum/csrf-cookie`
        );
        console.log("2");
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        console.log("3");
        this.$router.push("/"); // Redirect after successful login
      } catch (err) {
        this.error =
          err.response?.data?.message || "An error occurred during login";
        console.log(this.error);
      }
    },
  },
};
</script>
