import $ from 'jquery';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model: function(params) {
    return RSVP.hash({
      post: this.get('store').findRecord('post', params.post_slug )
    });
  },
  serialize: function(model, params) {
    return { post_slug: model.get('slug')};
  }
});