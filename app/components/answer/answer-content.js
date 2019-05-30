import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentSession: service(),
  actions: {
    deleteAnswer(answer) {
      if(confirm("Are you sure want to delete the answer?")) {
        answer.destroyRecord().then(() => {
          this.get('notifications').success('Successfully deleted.', {
            autoClear: true,
            clearDurations: 5000
          });
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
