import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model: function(params){
    return RSVP.hash({
      posts: this.get('store').findAll('post');
    });
  },
  serialize: function(model, params) {
    return { post_slug: model.get('slug') };
  }
});
