import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger } from 'ember-power-select/test-support/helpers'

module('Integration | Component | bs form/element/control/power select', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('options', ['foo', 'bar']);
    this.set('prop', 'foo');
  });

  test('it renders as blockless element', async function(assert) {
    await render(hbs`
    {{#bs-form model=this as |form|}}
      {{form.element controlType="power-select" property="prop" options=options}}
    {{/bs-form}}`);
    assert.equal(findAll('.ember-power-select-trigger').length, 1);
    assert.equal(find('.ember-power-select-selected-item').textContent.trim(), 'foo');
    await clickTrigger();
    assert.equal(findAll('.ember-power-select-option').length, 2);
    assert.equal(findAll('.ember-power-select-option')[0].textContent.trim(), 'foo');
    assert.equal(findAll('.ember-power-select-option')[1].textContent.trim(), 'bar');
    await click(findAll('.ember-power-select-option')[1]);
    assert.equal(this.get('prop'), 'bar');
  });

  test('it renders as blockless control component', async function(assert) {
    await render(hbs`
    {{#bs-form model=this as |form|}}
      {{#form.element controlType="power-select" property="prop" options=options as |el|}}
        {{el.control}}
      {{/form.element}}
    {{/bs-form}}`);
    assert.equal(findAll('.ember-power-select-trigger').length, 1);
    assert.equal(find('.ember-power-select-selected-item').textContent.trim(), 'foo');
    await clickTrigger();
    assert.equal(findAll('.ember-power-select-option').length, 2);
    assert.equal(findAll('.ember-power-select-option')[0].textContent.trim(), 'foo');
    assert.equal(findAll('.ember-power-select-option')[1].textContent.trim(), 'bar');
    await click(findAll('.ember-power-select-option')[1]);
    assert.equal(this.get('prop'), 'bar');
  });

  test('it renders as block control component', async function(assert) {
    await render(hbs`
    {{#bs-form model=this as |form|}}
      {{#form.element controlType="power-select" property="prop" options=options as |el|}}
        {{#el.control as |val|}}
          {{val}}
        {{/el.control}} 
      {{/form.element}}
    {{/bs-form}}`);
    assert.equal(findAll('.ember-power-select-trigger').length, 1);
    assert.equal(find('.ember-power-select-selected-item').textContent.trim(), 'foo');
    await clickTrigger();
    assert.equal(findAll('.ember-power-select-option').length, 2);
    assert.equal(findAll('.ember-power-select-option')[0].textContent.trim(), 'foo');
    assert.equal(findAll('.ember-power-select-option')[1].textContent.trim(), 'bar');
    await click(findAll('.ember-power-select-option')[1]);
    assert.equal(this.get('prop'), 'bar');
  });

  test('it renders placeholder', async function(assert) {
    await render(hbs`
    {{#bs-form model=this as |form|}}
      {{form.element controlType="power-select" property="prop2" options=options placeholder="something"}}
    {{/bs-form}}`);
    assert.equal(find('.ember-power-select-trigger').textContent.trim(), 'something');

    await render(hbs`
    {{#bs-form model=this as |form|}}
      {{#form.element controlType="power-select" property="prop2" options=options placeholder="something" as |el|}}
        {{#el.control as |val|}}
          {{val}}
        {{/el.control}} 
      {{/form.element}}
    {{/bs-form}}`);
    assert.equal(find('.ember-power-select-trigger').textContent.trim(), 'something');
  });

  test('it can disable select', async function(assert) {
    await render(hbs`
    {{#bs-form model=this as |form|}}
      {{form.element controlType="power-select" property="prop" options=options disabled=true}}
    {{/bs-form}}`);
    assert.ok(find('.ember-power-select-trigger').getAttribute('aria-disabled'));

    await render(hbs`
    {{#bs-form model=this as |form|}}
      {{#form.element controlType="power-select" property="prop" options=options disabled=true as |el|}}
        {{#el.control as |val|}}
          {{val}}
        {{/el.control}} 
      {{/form.element}}
    {{/bs-form}}`);
    assert.ok(find('.ember-power-select-trigger').getAttribute('aria-disabled'));
  });

  test('it can render array of objects with objectLabelPath', async function(assert) {
    this.set('options', this.get('options').map((title) => ({ title })));
    this.set('prop', this.get('options')[0]);
    await render(hbs`
    {{#bs-form model=this as |form|}}
      {{form.element controlType="power-select" property="prop" options=options optionLabelPath="title"}}
    {{/bs-form}}`);
    assert.equal(findAll('.ember-power-select-trigger').length, 1);
    assert.equal(find('.ember-power-select-selected-item').textContent.trim(), 'foo');
    await clickTrigger();
    assert.equal(findAll('.ember-power-select-option').length, 2);
    assert.equal(findAll('.ember-power-select-option')[0].textContent.trim(), 'foo');
    assert.equal(findAll('.ember-power-select-option')[1].textContent.trim(), 'bar');
    await click(findAll('.ember-power-select-option')[1]);
    assert.equal(this.get('prop'), this.get('options')[1]);
  });

  test('it passes power-select options', async function(assert) {
    await render(hbs`
    {{#bs-form model=this as |form|}}
      {{#form.element controlType="power-select" property="prop2" options=options placeholder="something" as |el|}}
        {{el.control searchEnabled=false triggerClass='form-control' }}
      {{/form.element}}
    {{/bs-form}}`);
    assert.ok(find('.form-control'));
    await clickTrigger();
    assert.notOk(find('.ember-power-select-search-input'));
  });
});
