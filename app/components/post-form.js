import Component from "@ember/component";
import { inject } from "@ember/service";
import { computed } from "@ember/object";
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tagList: validator('presence', true)
});

export default Component.extend(Validations, {
  currentSession: inject(),
  router: inject(),
  tagList: computed('model.post.tags', function(){
    let tagsString = "";
    let post = this.get('post');
    let tags = post.get('tags');
    tags.forEach(function(tag, index){
      let name = tag.get('name');
      tagsString = tagsString.concat(name);
      if(index < (tags.length-1)){
        tagsString = tagsString.concat(",");
      }
    });
    return tagsString;
  }),
  actions: {
    postQuestion: function (post) {
      post.set('tag_list', this.get('tagList'));
      post.validate().then(({ validations }) => {
        this.set('didValidate', true);
        if(validations.get('isValid')){
          post.save().then((post) => {
            debugger;
            this.transitionTo('show', post.get('slug'));
          }, (reason) => {
            this.set('errorMessage', reason.errors);
          });
        }
      });
    },
    cancelPost: function(post){
      post.rollbackAttributes();
      let previousPath = this.get('previousPath');
      if(previousPath === "index") {
        this.get('router').transitionTo(previousPath);
      }
      else if(previousPath === "show"){
        let slug = post.get('slug');
        this.get('router').transitionTo("show", slug);
      }
    }
  }
});