import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  currentSession: service(),
  router: service(),
  actions: {
    deletePost: function (post) {
      if(confirm("Are you sure want to delete the post?")) {
        post.destroyRecord().then(() => {
          this.get('notifications').success('Successfully deleted.', {
            autoClear: true,
            clearDurations: 5000
          });
          this.get('router').transitionTo('index');
        }, (reason) => {
          this.set("errorMessage", reason.errors);
        });
      }
    }
  }
});
