import Component from '@ember/component';
import { inject } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  answer: validator('presence', true)
});

export default Component.extend(Validations, {
  currentSession: inject(),
  answer: null,
  actions: {
    postAnswer: function(answer, question){
      if(this.get('currentSession.isAuthenticated')) {
        if(this.get('validations.attrs.answer.isValid')){
          let newAnswer = this.get('store').createRecord('post');
          newAnswer.set('body', answer);
          newAnswer.set('question', question);
          newAnswer.set('question_id', question.get('id'));
          newAnswer.save().then(() => {
            this.set('answer', null);
            console.log("Answer posted successfully");
          }, (reason) => {
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
