import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('previousPath', this._router.currentPath);
  },
  model: function(){
    return RSVP.hash({
      post: this.store.createRecord('post')
    });
  }
});
