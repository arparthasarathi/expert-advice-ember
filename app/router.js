import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("login");
  this.route("signup");
  this.route("dashboard");
  this.route("ask");
  this.route("show", { path: "/:post_slug" });
  this.route("edit", { path: "/:post_slug/edit" });
});

export default Router;
