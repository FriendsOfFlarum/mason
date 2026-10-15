import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import mq from 'mithril-query';
import { jest } from '@jest/globals';
import forumExtend from '../../../src/forum/extend';
import FieldsEditorModal from '../../../src/forum/components/FieldsEditorModal';
import type Answer from '../../../src/common/models/Answer';
import { applyExtenders, LINUX, loadMasonTranslations, OS, seedFields, setForum, VERSION } from '../../helpers';

beforeAll(() => {
  bootstrapForum();
  app.boot();
  applyExtenders(forumExtend);
  loadMasonTranslations();
  seedFields();
});

beforeEach(() => setForum({ canSkipRequiredMasonFields: false }));
afterEach(() => jest.restoreAllMocks());

const answer = (id: string) => app.store.getById<Answer>('mason-answers', id)!;
const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

function open(attrs: Record<string, unknown>) {
  let modal!: FieldsEditorModal;
  // animateHide normally waits for the closing transition, then calls back.
  const animateHide = jest.fn((done?: () => void) => done?.());
  const out = mq({
    view: () => (
      <FieldsEditorModal
        state={app.modal}
        animateShow={() => {}}
        animateHide={animateHide}
        answers={[]}
        {...attrs}
        oncreate={(vnode: any) => (modal = vnode.state)}
      />
    ),
  });

  return { out, modal, animateHide };
}

test('will not submit while a required field is unanswered', () => {
  const onsubmit = jest.fn();
  const { out } = open({ onsubmit });

  out.trigger('form', 'submit', {} as Event);

  expect(onsubmit).not.toHaveBeenCalled();
  expect(out).toContainRaw('This field is required.');
});

test('actors allowed to skip required fields can submit without them', () => {
  setForum({ canSkipRequiredMasonFields: true });
  const onsubmit = jest.fn();
  const { out } = open({ onsubmit });

  out.trigger('form', 'submit', {} as Event);

  expect(onsubmit).toHaveBeenCalledWith([], null);
});

test('hands the answers back only once the modal has closed', () => {
  const onsubmit = jest.fn();
  const { out, animateHide } = open({ onsubmit, answers: [answer(LINUX)] });

  out.trigger('form', 'submit', {} as Event);

  expect(animateHide).toHaveBeenCalledTimes(1);
  expect(onsubmit).toHaveBeenCalledWith([answer(LINUX)], null);
});

test('edit mode persists before closing, and stays open when saving fails', async () => {
  jest.spyOn(FieldsEditorModal.prototype, 'onerror').mockImplementation(() => {});
  const save = jest.fn<() => Promise<unknown>>().mockRejectedValueOnce(new Error('422')).mockResolvedValueOnce(undefined);
  const { out, modal, animateHide } = open({
    save,
    answers: [answer(LINUX)],
  });

  out.trigger('form', 'submit', {} as Event);
  await flush();

  expect(save).toHaveBeenCalledWith([answer(LINUX)], null);
  expect(animateHide).not.toHaveBeenCalled();
  expect((modal as unknown as { loading: boolean }).loading).toBe(false);

  out.trigger('form', 'submit', {} as Event);
  await flush();

  expect(animateHide).toHaveBeenCalledTimes(1);
});

test('keeps every change when two inputs change before a redraw', () => {
  const onsubmit = jest.fn();
  const { out } = open({ onsubmit });

  // Dispatch directly: unlike out.trigger(), this does not redraw in between,
  // so the second handler still closes over the first render's state.
  const dispatch = (selector: string, value: string, type: string) => {
    const element = out.first(selector);
    // mithril-query renders into domino, which only accepts its own events.
    const event = element.ownerDocument.createEvent('Event');
    event.initEvent(type, true, true);
    element.value = value;
    element.dispatchEvent(event);
  };

  dispatch(`#mason-field-${OS}`, LINUX, 'change');
  dispatch(`#mason-field-${VERSION}`, '2.3.1', 'input');

  out.trigger('form', 'submit', {} as Event);

  const [answers] = onsubmit.mock.calls[0] as [Answer[]];
  expect(answers.map((a) => a.content())).toEqual(['Linux', '2.3.1']);
});
