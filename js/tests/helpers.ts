import app from 'flarum/common/app';
import type IExtender from 'flarum/common/extenders/IExtender';
import type Discussion from 'flarum/common/models/Discussion';
import flatten from 'flat';
import jsYaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export const OS = '1';
export const VERSION = '2';
export const WINDOWS = '11';
export const LINUX = '12';

export function applyExtenders(extenders: IExtender<any>[]) {
  extenders.forEach((extender) => extender.extend(app, { name: 'fof-mason', exports: {} } as any));
}

export function loadMasonTranslations() {
  // Jest runs from the `js` directory.
  const file = path.resolve(process.cwd(), '../resources/locale/en.yml');

  app.translator.addTranslations(flatten(jsYaml.load(fs.readFileSync(file, 'utf8')) as object));
}

/**
 * Mirrors the forum payload: suggested answers arrive without `field` linkage.
 */
export function seedFields(
  overrides: {
    os?: Record<string, unknown>;
    version?: Record<string, unknown>;
  } = {}
) {
  app.store.pushPayload({
    data: [
      {
        type: 'mason-fields',
        id: OS,
        attributes: {
          name: 'Operating system',
          description: 'Which OS are you using?',
          min_answers_count: 1,
          max_answers_count: 1,
          show_when_empty: false,
          user_values_allowed: false,
          validation: null,
          icon: 'fas fa-desktop',
          sort: 1,
          ...overrides.os,
        },
        relationships: {
          suggestedAnswers: {
            data: [
              { type: 'mason-answers', id: WINDOWS },
              { type: 'mason-answers', id: LINUX },
            ],
          },
        },
      },
      {
        type: 'mason-fields',
        id: VERSION,
        attributes: {
          name: 'App version',
          description: 'e.g. 2.3.1',
          min_answers_count: 0,
          max_answers_count: 1,
          show_when_empty: true,
          user_values_allowed: true,
          validation: 'string|max:20',
          icon: null,
          sort: 0,
          ...overrides.version,
        },
        relationships: { suggestedAnswers: { data: [] } },
      },
    ],
    included: [
      {
        type: 'mason-answers',
        id: WINDOWS,
        attributes: { content: 'Windows', is_suggested: true, sort: 1 },
      },
      {
        type: 'mason-answers',
        id: LINUX,
        attributes: { content: 'Linux', is_suggested: true, sort: 0 },
      },
    ],
  } as any);
}

/**
 * Mirrors a discussion payload, which includes `masonAnswers.field`.
 */
export function makeDiscussion({
  answers = [LINUX],
  freeText = [] as { id: string; content: string; field: string }[],
  canSee = true,
  canUpdate = false,
} = {}): Discussion {
  return app.store.pushPayload({
    data: {
      type: 'discussions',
      id: '1',
      attributes: {
        title: 'Crash on startup',
        canSeeMasonAnswers: canSee,
        canUpdateMasonAnswers: canUpdate,
      },
      relationships: {
        masonAnswers: {
          data: [...answers, ...freeText.map((answer) => answer.id)].map((id) => ({ type: 'mason-answers', id })),
        },
      },
    },
    included: [
      ...answers.map((id) => ({
        type: 'mason-answers',
        id,
        relationships: {
          field: { data: { type: 'mason-fields', id: OS } },
        },
      })),
      ...freeText.map((answer) => ({
        type: 'mason-answers',
        id: answer.id,
        attributes: {
          content: answer.content,
          is_suggested: false,
          sort: null,
        },
        relationships: {
          field: { data: { type: 'mason-fields', id: answer.field } },
        },
      })),
    ],
  } as any) as unknown as Discussion;
}

export function setForum(attributes: Record<string, unknown>) {
  app.forum.pushAttributes({
    canFillMasonFields: true,
    canSkipRequiredMasonFields: false,
    'fof-mason.column-count': 1,
    ...attributes,
  });
}
