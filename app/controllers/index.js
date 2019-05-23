import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  infinity: service(),
  questions: filterBy('model.posts', 'question_id', null),
  sortedQuestions: sort('questions', 'sortDefinition'),
  sortDefinition: computed(function() {
    return ['created_at:desc']
  }),
  actions: {
    async searchPosts(query) {
      let posts = await this.infinity.model('post', {
        query: query,
        totalPagesParam: 'meta.total',
        countParam: 'meta.totalRecords'
      });
      this.set('model.posts', posts);
    }
  }
});
