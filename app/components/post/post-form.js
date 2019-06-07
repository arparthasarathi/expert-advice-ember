import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { validator, buildValidations } from "ember-cp-validations";

const Validations = buildValidations({
  tagList: validator("presence", true)
});

export default Component.extend(Validations, {
  currentSession: service(),
  errorHandler: service(),
  router: service(),
  tagList: computed("model.post.tags", function() {
    return this.post.tags.map(tag => tag.name).join(",");
  }),
  actions: {
    postQuestion(post) {
      post.set("tagList", this.get("tagList"));
      post.validate().then(({ validations }) => {
        this.set("didValidate", true);
        if (validations.get("isValid")) {
          this.set("didValidate", false);
          post.save().then(
            post => {
              this.notifications.success("Successfully posted.", {
                autoClear: true,
                clearDurations: 5000
              });
              this.router.transitionTo("show", post.get("slug"));
            },
            reason => {
              this.errorHandler.displayErrors(reason.errors);
            }
          );
        }
      });
    },
    cancelPost(post) {
      post.rollbackAttributes();
      let previousPath = this.get("previousPath");
      let slug = post.get("slug");
      if (previousPath === "show" && slug) {
        this.router.transitionTo("show", slug);
      }
      this.router.transitionTo("index");
    }
  }
});
