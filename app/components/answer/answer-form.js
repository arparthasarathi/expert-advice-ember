import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  answer: validator('presence', true)
});

export default Component.extend(Validations, {
  currentSession: service(),
  store: service(),
  answer: null,
  actions: {
    postAnswer: function(answer, question){
      this.set('didValidate', true);
      if(this.get('currentSession.isAuthenticated')) {
        if(this.get('validations.attrs.answer.isValid')){
          this.set('didValidate', false);
          let newAnswer = this.get('store').createRecord('post');
          newAnswer.set('body', answer);
          newAnswer.set('question', question);
          newAnswer.set('question_id', question.get('id'));
          newAnswer.save().then(() => {
            this.set('answer', null);
            this.get('notifications').success('Answer posted successfully.', {
              autoClear: true,
              clearDurations: 5000
            });
          }, (reason) => {
            this.get('notifications').error('Please try again.', {
              autoClear: true,
              clearDurations: 5000
            });
            this.set("errorMessage", reason.errors)
          });
        }
      }
      else {
        if(confirm("You need to be signed in to post an answer. Do you want to sign in?")) {
          this.transitionToRoute('login');
        }
      }
    }
  }
});
