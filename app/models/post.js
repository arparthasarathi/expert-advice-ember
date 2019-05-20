import DS from 'ember-data';

export default DS.Model.extend(Validations, {
  title: DS.attr('string'),
  slug: DS.attr('string'),
  body: DS.attr('string'),
  tags: DS.hasMany('tag'),
  user: DS.belongsTo('user'),
  question_id: DS.attr('number'),
  tag_list: DS.attr('string'),
  question: DS.belongsTo('post',  { inverse: 'answers' }),
  answers: DS.hasMany('post', { inverse: 'question' }),
});
