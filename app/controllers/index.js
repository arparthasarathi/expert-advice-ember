import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({
  questions: filterBy('model.posts', 'question_id', null)
});
