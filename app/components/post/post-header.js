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
          let errors = reason.errors;
          let errorMessage = "";
          errors.forEach(function (error, index) {
            errorMessage = errorMessage.concat(error.title);
            if(index < (reason.errors.length - 1))
              errorMessage = errorMessage.concat(",")
          });
          this.set('errorMessage', errorMessage);
          this.get('notifications').error('Please try again.', {
            autoClear: true,
            clearDurations: 5000
          });
        });
      }
    }
  }
});
