import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import mq from 'mithril-query';
import forumExtend from '../../../src/forum/extend';
import FieldsViewer from '../../../src/forum/components/FieldsViewer';
import { applyExtenders, loadMasonTranslations, makeDiscussion, seedFields, setForum, VERSION } from '../../helpers';

beforeAll(() => {
  bootstrapForum();
  app.boot();
  applyExtenders(forumExtend);
  loadMasonTranslations();
  seedFields();
});

beforeEach(() =>
  setForum({
    'fof-mason.hide-empty-fields-section': false,
    'fof-mason.fields-section-title': '',
  })
);

function render(discussion = makeDiscussion()) {
  return mq({
    view: () => <FieldsViewer discussion={discussion} placement="post" />,
  });
}

test('lists each answered field as a label/value pair', () => {
  const out = render();

  expect(out).toHaveElement('.Mason-Details dl.Mason-Details-list');
  expect(out).toContainRaw('Operating system');
  expect(out).toContainRaw('Linux');
});

test('an unanswered field shows only when the admin enabled "show when empty"', () => {
  const out = render(makeDiscussion({ answers: [] }));

  // App version has show_when_empty; Operating system does not.
  expect(out).toContainRaw('App version');
  expect(out).toContainRaw('No answer');
  expect(out).not.toContainRaw('Operating system');
});

test('free-text answers render as plain text', () => {
  const out = render(
    makeDiscussion({
      freeText: [{ id: '50', content: '2.3.1', field: VERSION }],
    })
  );

  expect(out).toContainRaw('2.3.1');
  expect(out).not.toHaveElement('.Mason-Details input');
});

test('offers editing only to actors who may update the answers', () => {
  expect(render(makeDiscussion({ canUpdate: false }))).not.toHaveElement('.Mason-Details-edit');
  expect(render(makeDiscussion({ canUpdate: true }))).toHaveElement('.Mason-Details-edit');
});

test('shows the configured section title', () => {
  setForum({ 'fof-mason.fields-section-title': 'Bug details' });

  expect(render()).toContainRaw('Bug details');
});

test('renders nothing when every field is hidden and "hide empty section" is on', () => {
  seedFields({ version: { show_when_empty: false } });
  setForum({ 'fof-mason.hide-empty-fields-section': true });

  const out = render(makeDiscussion({ answers: [], canUpdate: true }));

  expect(out).not.toHaveElement('.Mason-Details');
  seedFields();
});
