import usersModule from "./modules/users/users.module";
import router from "./app.router";
import authModule from "./modules/auth/auth.module";

export default {
  ver: "v1",
  modules: [usersModule, authModule],
  router: router,
};
