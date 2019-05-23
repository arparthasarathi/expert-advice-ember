import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
  infinity: service(),
  model: function(){
    return RSVP.hash({
      posts: this.infinity.model('post', { totalPagesParam: 'meta.total', countParam: 'meta.totalRecords' })
    });
  },
  serialize: function(model) {
    return { post_slug: model.get('slug') };
  }
});
