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
    postAnswer(answer, question){
      if(this.get('currentSession.isAuthenticated')) {
        this.set('didValidate', true);
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
      }
      else {
        if(confirm("You need to be signed in to post an answer. Do you want to sign in?")) {
          this.get('router').transitionTo('login');
        }
      }
    }
  }
});
