import Component from "@ember/component";
import { inject } from "@ember/service";

export default Component.extend({
  currentSession: inject(),
  actions: {
    deletePost: function (post) {
      if(confirm("Are you sure want to delete the post?")) {
        post.destroyRecord().then(() => {
          this.get('notifications').success('Successfully deleted.', {
            autoClear: true,
            clearDurations: 5000
          });
        }, (reason) => {
          this.set("errorMessage", reason.errors);
        });
      }
    }
  }
});
