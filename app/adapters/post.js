import ApplicationAdapter from "./application";

export default ApplicationAdapter.extend({
  urlForFindRecord(slug) {
    return `${this.host}/${this.namespace}/posts/` + slug;
  }
});
