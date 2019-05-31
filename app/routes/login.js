import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  session: service(),
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('previousPath', this._router.currentPath);
  },
  actions: {
    login(email, password) {
      this.get("session")
        .authenticate("authenticator:oauth2", email, password)
        .then(() => {
          this.notifications.success('Login successful.', {
            autoClear: true,
            clearDurations: 5000
          });
        })
        .catch(() => {
          this.controller.set("errorMessage", "Invalid login.");
        });
    }
  }
});
