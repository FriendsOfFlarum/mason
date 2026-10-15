import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import Model from 'flarum/common/Model';
import forumExtend from '../../../src/forum/extend';
import patchModelIdentifier from '../../../src/forum/patchModelIdentifier';
import type Answer from '../../../src/common/models/Answer';
import { applyExtenders, LINUX, seedFields, VERSION } from '../../helpers';

const identify = (model: Model) => (Model as any).getIdentifier(model);

beforeAll(() => {
  bootstrapForum();
  app.boot();
  applyExtenders(forumExtend);
  seedFields();
  patchModelIdentifier();
});

test('an unsaved free-text answer is sent inline with its content and field', () => {
  const typed = app.store.createRecord<Answer>('mason-answers', {
    attributes: { content: '2.3.1' },
    relationships: {
      field: { data: { type: 'mason-fields', id: VERSION } },
    },
  });

  expect(identify(typed)).toEqual({
    type: 'mason-answers',
    attributes: { content: '2.3.1' },
    relationships: {
      field: { data: { type: 'mason-fields', id: VERSION } },
    },
  });
});

test('saved answers and other models keep the standard identifier', () => {
  expect(identify(app.store.getById('mason-answers', LINUX)!)).toEqual({
    type: 'mason-answers',
    id: LINUX,
  });
  expect(identify(app.forum)).toEqual({ type: 'forums', id: '1' });
});
