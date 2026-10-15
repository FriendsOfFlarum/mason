import bootstrapAdmin from '@flarum/jest-config/src/bootstrap/admin';
import app from 'flarum/admin/app';
import mq from 'mithril-query';
import { jest } from '@jest/globals';
import commonExtend from '../../../src/common/extend';
import EditFieldModal from '../../../src/admin/components/EditFieldModal';
import type Field from '../../../src/common/models/Field';
import { applyExtenders, loadMasonTranslations } from '../../helpers';

beforeAll(() => {
  bootstrapAdmin();
  app.boot();
  applyExtenders(commonExtend);
  loadMasonTranslations();
});

afterEach(() => jest.restoreAllMocks());

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

function open(field?: Field) {
  let modal!: EditFieldModal;
  const animateHide = jest.fn();
  const out = mq({
    view: () => (
      <EditFieldModal
        state={app.modal}
        animateShow={() => {}}
        animateHide={animateHide}
        field={field}
        oncreate={(vnode: any) => (modal = vnode.state)}
      />
    ),
  });

  return { out, modal, animateHide };
}

function storedField(): Field {
  return app.store.pushPayload({
    data: {
      type: 'mason-fields',
      id: '7',
      attributes: {
        name: 'Severity',
        min_answers_count: 1,
        max_answers_count: 1,
        user_values_allowed: true,
        validation: 'string',
        show_when_empty: true,
        icon: null,
      },
      relationships: { allAnswers: { data: [] } },
    },
  } as any) as unknown as Field;
}

test('the "required" switch maps to one mandatory answer', () => {
  const { modal } = open(storedField());

  expect(modal.submitData()).toMatchObject({
    name: 'Severity',
    min_answers_count: 1,
    max_answers_count: 1,
    user_values_allowed: true,
    validation: 'string',
  });

  modal.required(false);
  expect(modal.submitData().min_answers_count).toBe(0);
});

test('validation rules only apply to fields accepting user values', () => {
  const { out, modal } = open(storedField());

  expect(out).toHaveElement('input[name=validation]');

  modal.userValuesAllowed(false);
  out.redraw();
  expect(out).not.toHaveElement('input[name=validation]');
});

test('a new field stays open on the saved record, ready for answers', async () => {
  const { out, modal, animateHide } = open();
  const saved = storedField();
  // Model.save() resolves to the stored record, a different instance from the unsaved one.
  jest.spyOn(modal.field as any, 'save').mockResolvedValue(saved as any);

  expect(out).toContainRaw('Save the field to add answers');

  out.trigger('form', 'submit', {} as Event);
  await flush();
  out.redraw();

  expect(modal.field).toBe(saved);
  expect(animateHide).not.toHaveBeenCalled();
  expect(out).toHaveElement('.MasonAnswerList');
});

test('saving an existing field closes the modal', async () => {
  const field = storedField();
  const { out, animateHide } = open(field);
  jest.spyOn(field as any, 'save').mockResolvedValue(field as any);

  out.trigger('form', 'submit', {} as Event);
  await flush();

  expect(animateHide).toHaveBeenCalled();
});
