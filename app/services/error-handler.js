import Service from '@ember/service';
import { inject as service } from "@ember/service";

export default Service.extend({
  notifications: service('notification-messages'),

  displayError(errors){
    let errorMessage = errors.map(error => error.title).join(",");
    this.set('errorMessage', errorMessage);
    this.get('notifications').error('Please try again.', {
      autoClear: true,
      clearDurations: 5000
    });
  }

});
