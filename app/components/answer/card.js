import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  currentSession: inject(),
  actions: {
    deletePost: function (answer) {
      if(confirm("Are you sure want to delete the post?")) {
        answer.destroyRecord().then(() => {
          console.log("Answer deleted successfully")
        }, (reason) => {
          this.set("errorMessage", errorMessage);
        });
      }
    }
  }
});
