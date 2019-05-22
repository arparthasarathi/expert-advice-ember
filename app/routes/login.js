import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  session: service(),
  setupController: function(controller, model) {
    this._super(controller, model);
    $(window).scrollTop(0);
    controller.set('previousPath', this._router.currentPath);
  },
  actions: {
    login(email, password) {
      this.get("session")
        .authenticate("authenticator:oauth2", email, password)
        .then(() => this.transitionTo(this.get('previousPath')))
        .catch(() => {
          this.controller.set("errorMessage", "Invalid login.");
        });
    }
  }
});
