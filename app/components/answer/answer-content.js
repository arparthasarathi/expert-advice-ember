import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  currentSession: service(),
  errorHandler: service(),
  actions: {
    deleteAnswer(answer) {
      if (confirm("Are you sure want to delete the answer?")) {
        answer.destroyRecord().then(
          () => {
            this.notifications.success("Successfully deleted.", {
              autoClear: true,
              clearDurations: 5000
            });
          },
          reason => {
            this.errorHandler.displayErrors(reason.errors);
          }
        );
      }
    }
  }
});
