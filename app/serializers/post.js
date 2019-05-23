import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  serialize() {
    let json = this._super(...arguments);
    let attributes = json.data.attributes;

    if( attributes["question-id"] ){
      attributes["question_id"] = attributes["question-id"];
    }

    if( attributes["tag-list"] ){
      attributes["tag_list"] = attributes["tag-list"];
    }

    delete attributes["tag-list"];
    delete attributes["question-id"];

    json.data.attributes = attributes;
    return json;
  }
});
