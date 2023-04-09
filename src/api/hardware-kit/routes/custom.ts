export default {
  routes: [
    {
      method: "GET",
      path: "/custom",
      handler: "hardware-kit.customAction",
      config: {
        auth: false,
      },
    },
  ],
}
