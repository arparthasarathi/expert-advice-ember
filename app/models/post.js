import DS from 'ember-data';
import {buildValidations, validator} from "ember-cp-validations";

const Validations = buildValidations({
  title: [
    validator('presence', true)
  ],
  body: [
    validator('presence', true)
  ],
  tag_list: [
    validator('presence', true)
  ]
});

export default DS.Model.extend(Validations, {
  title: DS.attr('string'),
  slug: DS.attr('string'),
  body: DS.attr('string'),
  tags: DS.hasMany('tag'),
  user: DS.belongsTo('user'),
  views_count: DS.attr('number'),
  question_id: DS.attr('number'),
  tag_list: DS.attr('string'),
  question: DS.belongsTo('post',  { inverse: 'answers' }),
  answers: DS.hasMany('post', { inverse: 'question' }),
  created_at: DS.attr('datetime'),
  updated_at: DS.attr('datetime')
});
