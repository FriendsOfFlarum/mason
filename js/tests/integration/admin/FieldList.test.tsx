import bootstrapAdmin from '@flarum/jest-config/src/bootstrap/admin';
import app from 'flarum/admin/app';
import mq from 'mithril-query';
import { jest } from '@jest/globals';
import commonExtend from '../../../src/common/extend';
import FieldList from '../../../src/admin/components/FieldList';
import { applyExtenders, loadMasonTranslations } from '../../helpers';

beforeAll(() => {
  bootstrapAdmin();
  app.boot();
  applyExtenders(commonExtend);
  loadMasonTranslations();
});

afterEach(() => jest.restoreAllMocks());

/** The admin index endpoint includes every answer, suggested or typed by users. */
function seedAdminFields() {
  app.store.pushPayload({
    data: [
      {
        type: 'mason-fields',
        id: '1',
        attributes: {
          name: 'Operating system',
          min_answers_count: 1,
          max_answers_count: 1,
          user_values_allowed: false,
          icon: 'fas fa-desktop',
          sort: 1,
        },
        relationships: {
          allAnswers: {
            data: ['11', '12', '13'].map((id) => ({
              type: 'mason-answers',
              id,
            })),
          },
        },
      },
      {
        type: 'mason-fields',
        id: '2',
        attributes: {
          name: 'App version',
          min_answers_count: 0,
          max_answers_count: 1,
          user_values_allowed: true,
          icon: null,
          sort: 0,
        },
        relationships: { allAnswers: { data: [] } },
      },
    ],
    included: [
      {
        type: 'mason-answers',
        id: '11',
        attributes: { content: 'Windows', is_suggested: true },
      },
      {
        type: 'mason-answers',
        id: '12',
        attributes: { content: 'Linux', is_suggested: true },
      },
      {
        type: 'mason-answers',
        id: '13',
        attributes: { content: 'BeOS', is_suggested: false },
      },
    ],
  } as any);
}

async function render() {
  const out = mq({ view: () => <FieldList /> });
  await new Promise((resolve) => setTimeout(resolve, 0));
  out.redraw();

  return out;
}

test('lists fields in admin order with what kind of input they are', async () => {
  seedAdminFields();
  jest.spyOn(app.store, 'find').mockResolvedValue([] as any);

  const out = await render();
  const rows = out.find('.MasonFieldList-item').map((row: HTMLElement) => row.textContent);

  expect(rows[0]).toContain('App version');
  expect(rows[0]).toContain('Free text');
  expect(rows[1]).toContain('Operating system');
  expect(rows[1]).toContain('Required');
  // Only suggested answers count towards the dropdown.
  expect(rows[1]).toContain('Dropdown · 2 answers');
});

test('explains the empty state', async () => {
  jest.spyOn(app.store, 'find').mockResolvedValue([] as any);
  jest.spyOn(app.store, 'all').mockReturnValue([]);

  const out = await render();

  expect(out).toContainRaw('No fields yet');
  expect(out).toHaveElement('.MasonFieldList button');
});
