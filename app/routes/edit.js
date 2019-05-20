import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  setupController: function(controller, model) {
    this._super(controller, model);
    $(window).scrollTop(0);
    controller.set('previousPath', this._router.currentPath);
  },
  model: function(params) {
    return RSVP.hash({
      post: this.store.findRecord('post', params.post_slug )
    });
  },
  serialize: function(model, params) {
    return { post_slug: model.get('slug')};
  }
});
