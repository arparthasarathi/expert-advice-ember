import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  tagList: validator('presence', true)
});

export default Component.extend(Validations, {
  currentSession: service(),
  router: service(),
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
            this.get('notifications').success('Successfully posted.', {
              autoClear: true,
              clearDurations: 5000
            });
            this.get('router').transitionTo('show', post.get('slug'));
          }, (reason) => {
              let errors = reason.errors;
              let errorMessage = "";
              errors.forEach(function (error, index) {
                errorMessage = errorMessage.concat(error.title);
                if(index < (reason.errors.length - 1))
                  errorMessage = errorMessage.concat(",")
              });
              this.set('errorMessage', errorMessage);
              this.get('notifications').error('Please try again.', {
                autoClear: true,
                clearDurations: 5000
              });
          });
        }
      });
    },
    cancelPost: function(post){
      post.rollbackAttributes();
      let previousPath = this.get('previousPath');
      let slug = post.get('slug');
      if((previousPath === "show") && slug){
        this.get('router').transitionTo("show", slug);
      }
      this.get('router').transitionTo('index');
    }
  }
});
