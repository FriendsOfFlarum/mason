import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import commonExtend from '../../../src/common/extend';
import type Answer from '../../../src/common/models/Answer';
import type Field from '../../../src/common/models/Field';
import { byContent, bySort, fieldOf, missingRequiredFields, sortedFields, withFieldAnswers } from '../../../src/common/utils/fields';
import { applyExtenders, LINUX, OS, seedFields, VERSION, WINDOWS } from '../../helpers';

beforeAll(() => {
  bootstrapForum();
  app.boot();
  applyExtenders(commonExtend);
  seedFields();
});

const field = (id: string) => app.store.getById<Field>('mason-fields', id)!;
const answer = (id: string) => app.store.getById<Answer>('mason-answers', id)!;

function freeTextAnswer(content: string, fieldId = VERSION): Answer {
  return app.store.createRecord<Answer>('mason-answers', {
    attributes: { content },
    relationships: {
      field: { data: { type: 'mason-fields', id: fieldId } },
    },
  });
}

describe('ordering', () => {
  test('fields follow the admin-defined sort', () => {
    expect(sortedFields().map((f) => f.name())).toEqual(['App version', 'Operating system']);
  });

  test('items never reordered go last, oldest first', () => {
    const items = [
      { id: () => '9', sort: () => null },
      { id: () => '3', sort: () => null },
      { id: () => '5', sort: () => 0 },
    ];

    expect(bySort(items).map((item) => item.id())).toEqual(['5', '3', '9']);
  });

  test('free-text answers sort alphabetically', () => {
    const answers = ['beta', 'Alpha', 'gamma'].map((content) => freeTextAnswer(content));

    expect(byContent(answers).map((a) => a.content())).toEqual(['Alpha', 'beta', 'gamma']);
  });
});

describe('fieldOf', () => {
  test('uses the field linkage when the payload has it', () => {
    expect(fieldOf(freeTextAnswer('2.3.1'), sortedFields())).toBe(field(VERSION));
  });

  test('falls back to the field suggesting the answer (forum payload has no linkage)', () => {
    expect(answer(LINUX).field()).toBeFalsy();
    expect(fieldOf(answer(LINUX), sortedFields())).toBe(field(OS));
  });
});

describe('answers per field', () => {
  test('swapping one field keeps the other fields answers', () => {
    const version = freeTextAnswer('2.3.1');
    const result = withFieldAnswers([answer(WINDOWS), version], field(OS), [answer(LINUX)]);

    expect(result).toEqual([version, answer(LINUX)]);
  });

  test('required fields without an answer are missing', () => {
    expect(missingRequiredFields([freeTextAnswer('2.3.1')])).toEqual([field(OS)]);
    expect(missingRequiredFields([answer(WINDOWS)])).toEqual([]);
  });
});
