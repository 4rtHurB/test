import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | terms-of-use', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:terms-of-use');
    assert.ok(route);
  });
});
