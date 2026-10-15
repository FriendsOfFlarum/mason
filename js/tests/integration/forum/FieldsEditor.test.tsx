import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import mq from 'mithril-query';
import { jest } from '@jest/globals';
import forumExtend from '../../../src/forum/extend';
import FieldsEditor from '../../../src/forum/components/FieldsEditor';
import type Answer from '../../../src/common/models/Answer';
import type Field from '../../../src/common/models/Field';
import { applyExtenders, LINUX, loadMasonTranslations, OS, seedFields, setForum, VERSION, WINDOWS } from '../../helpers';

beforeAll(() => {
  bootstrapForum();
  app.boot();
  applyExtenders(forumExtend);
  loadMasonTranslations();
  seedFields();
  setForum({});
});

const field = (id: string) => app.store.getById<Field>('mason-fields', id)!;
const answer = (id: string) => app.store.getById<Answer>('mason-answers', id)!;

function pick(out: any, fieldId: string, value: string) {
  out.first(`#mason-field-${fieldId}`).value = value;
  out.trigger(`#mason-field-${fieldId}`, 'change');
}

test('suggestion-only fields are dropdowns of the suggested answers, in admin order', () => {
  const out = mq({
    view: () => <FieldsEditor answers={[]} onchange={() => {}} />,
  });

  expect(out).toHaveElement(`select#mason-field-${OS}`);
  expect(out.find(`#mason-field-${OS} option`).map((option: HTMLOptionElement) => option.textContent)).toEqual([
    'Choose an option',
    'Linux',
    'Windows',
  ]);
});

test('fields allowing user values are text inputs', () => {
  const out = mq({
    view: () => <FieldsEditor answers={[]} onchange={() => {}} />,
  });

  expect(out).toHaveElement(`input#mason-field-${VERSION}`);
});

test('required fields are marked in their label', () => {
  const out = mq({
    view: () => <FieldsEditor answers={[]} onchange={() => {}} />,
  });

  expect(out.first(`label[for=mason-field-${OS}]`).textContent).toContain('*');
  expect(out.first(`label[for=mason-field-${VERSION}]`).textContent).not.toContain('*');
});

test('picking a suggestion reports that field and answer', () => {
  const onchange = jest.fn();
  const out = mq({
    view: () => <FieldsEditor answers={[]} onchange={onchange} />,
  });

  pick(out, OS, WINDOWS);

  expect(onchange).toHaveBeenCalledWith(field(OS), [answer(WINDOWS)]);
});

test('picking the placeholder clears the field', () => {
  const onchange = jest.fn();
  const out = mq({
    view: () => <FieldsEditor answers={[answer(LINUX)]} onchange={onchange} />,
  });

  pick(out, OS, '');

  expect(onchange).toHaveBeenCalledWith(field(OS), []);
});

test('typing reports an unsaved answer linked to the field; clearing reports none', () => {
  const onchange = jest.fn<(field: Field, answers: Answer[]) => void>();
  const out = mq({
    view: () => <FieldsEditor answers={[]} onchange={onchange} />,
  });

  out.setValue(`#mason-field-${VERSION}`, '2.3.1');
  const [reportedField, [typed]] = onchange.mock.calls[0];

  expect(reportedField).toBe(field(VERSION));
  expect(typed.exists).toBe(false);
  expect(typed.content()).toBe('2.3.1');
  expect(typed.field()).toBe(field(VERSION));

  out.setValue(`#mason-field-${VERSION}`, '');
  expect(onchange).toHaveBeenLastCalledWith(field(VERSION), []);
});

test('shows the current answers', () => {
  const out = mq({
    view: () => <FieldsEditor answers={[answer(LINUX)]} onchange={() => {}} />,
  });

  expect(out).toHaveElement(`#mason-field-${OS} option[value="${LINUX}"][selected]`);
  expect(out).not.toHaveElement(`#mason-field-${OS} option[value="${WINDOWS}"][selected]`);
});

test('flags fields reported as invalid', () => {
  const out = mq({
    view: () => <FieldsEditor answers={[]} onchange={() => {}} invalid={[field(OS)]} />,
  });

  expect(out).toHaveElement('.Mason-Field--invalid');
  expect(out).toContainRaw('This field is required.');
});
