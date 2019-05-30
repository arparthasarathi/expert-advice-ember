import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('previousPath', this._router.currentPath);
  },
  model(params) {
    return RSVP.hash({
      post: this.store.findRecord('post', params.post_slug )
    });
  },
  serialize(model) {
    return { post_slug: model.get('slug')};
  }
});
