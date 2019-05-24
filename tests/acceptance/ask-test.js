import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { visit, fillIn, click, currentURL } from '@ember/test-helpers';

module('Acceptance | ask', function(hooks) {
  setupApplicationTest(hooks);

  test('authenticated users can visit /ask', async function(assert) {

    await authenticateSession();

    await visit('/ask');

    assert.equal(currentURL(), '/ask', 'user is post question');
  });

  test('post a form with empty title & tags', async function(assert) {

    await authenticateSession();

    await visit('/ask');

    await fillIn('input#title', '');
    await fillIn('input#description', 'Lorem ipsum description');
    await fillIn('input#tags', '');
    await click('button.submit');

    const titleError = this.element.querySelectorAll('.input-error')[0].textContent;
    const tagsError = this.element.querySelectorAll('.input-error')[1].textContent;

    assert.equal(titleError, "This field can't be blank");
    assert.equal(tagsError, "This field can't be blank");
  });

  test('post a form with empty valid fields', async function(assert) {

    await authenticateSession();

    await visit('/ask');

    let title = "This is a test title";
    await fillIn('input#title', 'title');
    await fillIn('input#description', 'Lorem ipsum description');
    await fillIn('input#tags', 'tag1,tag2');
    await click('button.submit');


    assert.equal(currentURL(), '/', 'user is at index route');
    const postTitle = this.element.querySelector('.post-title').find('a').textContent;
    assert.equal(postTitle, title);
  });
});
