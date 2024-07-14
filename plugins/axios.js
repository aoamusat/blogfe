export default function ({ $axios }) {
  // Make the CSRF token request before other requests
  $axios.onRequest(async (config) => {
    // Only fetch CSRF token if it's not already set
    if (!document.cookie.includes("XSRF-TOKEN")) {
      await $axios.get("/sanctum/csrf-cookie");
    }

    return config;
  });

  // Automatically set the CSRF token header from the cookie
  $axios.onRequest((config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="));
    if (token) {
      config.headers["X-XSRF-TOKEN"] = token.split("=")[1];
    }

    return config;
  });
}
