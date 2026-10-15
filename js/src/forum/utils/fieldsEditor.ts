import app from 'flarum/forum/app';
import type Discussion from 'flarum/common/models/Discussion';
import type Model from 'flarum/common/Model';
import type { IInternalModalAttrs } from 'flarum/common/components/Modal';
import type { IFieldsEditorModalAttrs } from '../components/FieldsEditorModal';
import { present } from '../../common/utils/fields';

/**
 * The editor (modal + inputs) is its own chunk: only composing or editing answers needs it.
 */
export const loadFieldsEditor = () => import('../components/FieldsEditorModal');

export function openFieldsEditor(attrs: Omit<IFieldsEditorModalAttrs, keyof IInternalModalAttrs>) {
  return app.modal.show(loadFieldsEditor, attrs);
}

export function editDiscussionFields(discussion: Discussion) {
  return openFieldsEditor({
    discussion,
    answers: present(discussion.masonAnswers()),
    save: (answers, tags) => {
      const relationships: Record<string, Model | Model[]> = {
        masonAnswers: answers,
      };

      if (tags) relationships.tags = tags;

      // Save through a stand-in: Model.save() writes relationships to the instance before the request
      // resolves, and the real discussion would render half-saved answers in the meantime.
      const discussionStandIn = app.store.createRecord<Discussion>('discussions');
      discussionStandIn.pushData({
        type: 'discussions',
        id: discussion.id()!,
      });
      discussionStandIn.exists = true;

      return discussionStandIn.save({ relationships });
    },
  });
}
