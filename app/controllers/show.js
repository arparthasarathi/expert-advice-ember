import Controller from "@ember/controller";
import { sort } from "@ember/object/computed";
import { computed } from "@ember/object";

export default Controller.extend({
  sortedAnswers: sort("model.post.answers", "sortDefinition"),
  sortDefinition: computed(function() {
    return ["created_at:desc"];
  })
});
