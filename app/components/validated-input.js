import {
  not,
  notEmpty,
  and,
  or,
  readOnly,
  alias
} from '@ember/object/computed';
import Component from '@ember/component';
import { defineProperty, computed } from '@ember/object';

export default Component.extend({
  classNames: ['validated-input'],
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success'],
  model: null,
  value: null,
  type: 'text',
  autocomplete: 'off',
  autocorrect: 'off',
  autocapitalize: 'off',
  spellcheck: false,
  valuePath: '',
  placeholder: '',
  validation: null,
  showValidations: false,
  didValidate: false,
  notValidating: not('validation.isValidating').readOnly(),
  hasContent: notEmpty('value').readOnly(),
  hasWarnings: notEmpty('validation.warnings').readOnly(),
  isValid: and('hasContent', 'validation.isTruelyValid').readOnly(),
  shouldDisplayValidations: or('showValidations', 'didValidate').readOnly(),
  shouldDisplayValidationsOnType: or('showValidations', 'didValidate', 'hasContent').readOnly(),
  showErrorClass: and('notValidating', 'showErrorMessage', 'hasContent', 'validation').readOnly(),
  showErrorMessage: and('shouldDisplayValidations', 'validation.isInvalid').readOnly(),
  showErrorMessageOnType: and('shouldDisplayValidationsOnType', 'validation.isInvalid').readOnly(),
  showWarningMessage: and('shouldDisplayValidations', 'hasWarnings', 'isValid').readOnly(),
  init() {
    this._super(...arguments);
    let valuePath = this.get('valuePath');
    defineProperty(this, 'validation', readOnly(`model.validations.attrs.${valuePath}`));
    defineProperty(this, 'value', alias(`model.${valuePath}`));
    defineProperty(this, 'singleLineInputTypes', computed(function() {
      return ["text", "number", "password"];
    }));
    defineProperty(this, 'multiLineInputTypes', computed(function(){
      return ['textarea'];
    }));
    defineProperty(this, 'selectableInputTypes', computed(function(){
      return ['checkbox', 'radio'];
    }));
  },
  focusOut() {
    this._super(...arguments);
    this.set('showValidations', true);
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('showValidations', false);
  }
});
