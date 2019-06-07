import DS from "ember-data";
import { buildValidations, validator } from "ember-cp-validations";
import { computed } from "@ember/object";

const Validations = buildValidations({
  title: [validator("presence", true)],
  body: [validator("presence", true)],
  tagList: [validator("presence", true)]
});

export default DS.Model.extend(Validations, {
  title: DS.attr("string"),
  slug: DS.attr("string"),
  body: DS.attr("string"),
  tags: DS.hasMany("tag"),
  user: DS.belongsTo("user"),
  viewsCount: DS.attr("number"),
  questionId: DS.attr("number"),
  tagList: DS.attr("string"),
  question: DS.belongsTo("post", { inverse: "answers" }),
  answers: DS.hasMany("post", { inverse: "question" }),
  createdAt: DS.attr("datetime"),
  updatedAt: DS.attr("datetime"),
  editedAt: DS.attr("datetime"),
  isEdited: computed("createdAt", "editedAt", function() {
    return this.get("editedAt") > this.get("createdAt");
  })
});
