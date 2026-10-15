import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import { jest } from '@jest/globals';
import DiscussionComposer from 'flarum/forum/components/DiscussionComposer';
import Stream from 'flarum/common/utils/Stream';
import forumExtend from '../../../src/forum/extend';
import addComposerFields from '../../../src/forum/addComposerFields';
import type Answer from '../../../src/common/models/Answer';
import { applyExtenders, LINUX, loadMasonTranslations, seedFields, setForum } from '../../helpers';

/** Stands in for the real submit (which would hit the API); the override wraps it. */
const submit = jest.fn();

beforeAll(() => {
  bootstrapForum();
  app.boot();
  applyExtenders(forumExtend);
  loadMasonTranslations();
  seedFields();

  (DiscussionComposer.prototype as any).onsubmit = submit;
  addComposerFields();
  // What the lazy chunk does when it loads; string-path extends attach now.
  flarum.reg.add('core', 'forum/components/DiscussionComposer', DiscussionComposer);
});

beforeEach(() => {
  setForum({ canFillMasonFields: true, canSkipRequiredMasonFields: false });
  submit.mockClear();
});

afterEach(() => jest.restoreAllMocks());

const answer = (id: string) => app.store.getById<Answer>('mason-answers', id)!;

function composer(masonAnswers?: Answer[]) {
  const component = Object.create(DiscussionComposer.prototype);
  component.attrs = {};
  component.title = Stream('');
  component.composer = { fields: { masonAnswers, content: Stream('Body') } };

  return component;
}

describe('header chip', () => {
  test('invites users who can fill fields to add details', () => {
    const chip = composer().headerItems().get('mason-fields');

    expect(chip).toBeTruthy();
    expect(JSON.stringify(chip.children)).toContain('Add details');
    expect(chip.attrs.className).toContain('DiscussionComposer-masonFields--incomplete');
  });

  test('summarises the chosen answers', () => {
    const chip = composer([answer(LINUX)])
      .headerItems()
      .get('mason-fields');

    expect(JSON.stringify(chip.children)).toContain('Linux');
    expect(chip.attrs.className).not.toContain('--incomplete');
  });

  test('is absent for users who cannot fill fields', () => {
    setForum({ canFillMasonFields: false });

    expect(composer().headerItems().has('mason-fields')).toBe(false);
  });
});

describe('submitting', () => {
  test('a missing required answer opens the details form instead of posting', () => {
    const show = jest.spyOn(app.modal, 'show').mockResolvedValue(undefined);

    composer().onsubmit();

    expect(show).toHaveBeenCalled();
    expect(submit).not.toHaveBeenCalled();
  });

  test('saving the details form fills the composer and then posts', () => {
    const show = jest.spyOn(app.modal, 'show').mockResolvedValue(undefined);
    const component = composer();

    component.onsubmit();
    const attrs = show.mock.calls[0][1] as {
      onsubmit: (answers: Answer[], tags: null) => void;
    };
    attrs.onsubmit([answer(LINUX)], null);

    expect(component.composer.fields.masonAnswers).toEqual([answer(LINUX)]);
    expect(submit).toHaveBeenCalledTimes(1);
  });

  test('posts straight away once required answers are given', () => {
    const show = jest.spyOn(app.modal, 'show');

    composer([answer(LINUX)]).onsubmit();

    expect(show).not.toHaveBeenCalled();
    expect(submit).toHaveBeenCalledTimes(1);
  });

  test('posts straight away for actors allowed to skip required fields', () => {
    setForum({ canSkipRequiredMasonFields: true });

    composer().onsubmit();

    expect(submit).toHaveBeenCalledTimes(1);
  });

  test('sends the answers with the discussion', () => {
    const data = composer([answer(LINUX)]).data();

    expect(data.relationships.masonAnswers).toEqual([answer(LINUX)]);
  });
});
