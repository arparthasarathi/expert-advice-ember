import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentSession: service(),
  actions: {
    deleteAnswer: function (answer) {
      if(confirm("Are you sure want to delete the answer?")) {
        answer.destroyRecord().then(() => {
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
