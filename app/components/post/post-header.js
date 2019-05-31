import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  currentSession: service(),
  errorHandler: service(),
  router: service(),
  actions: {
    deletePost(post) {
      if(confirm("Are you sure want to delete the post?")) {
        post.destroyRecord().then(() => {
          this.notifications.success('Successfully deleted.', {
            autoClear: true,
            clearDurations: 5000
          });
          this.router.transitionTo('index');
        }, (reason) => {
          this.errorHandler.displayErrors(reason.errors);
        });
      }
    }
  }
});
