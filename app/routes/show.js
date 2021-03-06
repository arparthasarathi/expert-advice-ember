import Route from "@ember/routing/route";
import RSVP from "rsvp";

export default Route.extend({
  model(params) {
    return RSVP.hash({
      post: this.store.findRecord("post", params.post_slug)
    });
  },
  serialize(model) {
    return { post_slug: model.get("slug") };
  }
});
