import ApplicationAdapter from "./application";

export default ApplicationAdapter.extend({
  urlForFindRecord(slug) {
    return `${this.host}/${this.namespace}/posts/` + slug;
  },
  urlForDeleteRecord(id){
    let post = this.get('store').peekRecord('post', id);
    let slug = post.get('slug');
    return `${this.host}/${this.namespace}/posts/` + slug;
  },
  urlForUpdateRecord(id){
    let post = this.get('store').peekRecord('post', id);
    let slug = post.get('slug');
    return `${this.host}/${this.namespace}/posts/` + slug;
  },
  urlForQuery(params){
    if(params.query){
      return `${this.host}/${this.namespace}/posts/search`;
    }
    else {
      return `${this.host}/${this.namespace}/posts`;
    }
  }
});
