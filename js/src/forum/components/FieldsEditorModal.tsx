import app from 'flarum/forum/app';
import FormModal, { type IFormModalAttrs } from 'flarum/common/components/FormModal';
import Button from 'flarum/common/components/Button';
import type Discussion from 'flarum/common/models/Discussion';
import type RequestError from 'flarum/common/utils/RequestError';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import type Answer from '../../common/models/Answer';
import type Field from '../../common/models/Field';
import { missingRequiredFields, withFieldAnswers } from '../../common/utils/fields';
import FieldsEditor from './FieldsEditor';

export interface IFieldsEditorModalAttrs extends IFormModalAttrs {
  answers: Answer[];
  /** Set when editing an existing discussion; also scopes the "tags as a field" option. */
  discussion?: Discussion;
  /** Persists the answers before the modal closes, so request errors are shown in it. */
  save?: (answers: Answer[], tags: Tag[] | null) => Promise<unknown>;
  /** Receives the answers once the modal has fully closed, so it may open another modal. */
  onsubmit?: (answers: Answer[], tags: Tag[] | null) => void;
}

export default class FieldsEditorModal extends FormModal<IFieldsEditorModalAttrs> {
  answers: Answer[] = [];
  /** Stays null unless the "tags as a field" option changed them. */
  tags: Tag[] | null = null;
  invalid: Field[] = [];

  oninit(vnode: Parameters<FormModal<IFieldsEditorModalAttrs>['oninit']>[0]) {
    super.oninit(vnode);

    this.answers = this.attrs.answers;
  }

  className() {
    return 'FieldsEditorModal Modal--medium';
  }

  title() {
    const { discussion } = this.attrs;

    return discussion
      ? app.translator.trans('fof-mason.forum.answers-modal.edit-title', {
          title: <em>{discussion.title()}</em>,
        })
      : app.translator.trans('fof-mason.forum.answers-modal.compose-title');
  }

  content() {
    return [
      <div className="Modal-body">
        <FieldsEditor
          answers={this.answers}
          onchange={(field: Field, fieldAnswers: Answer[]) => {
            this.answers = withFieldAnswers(this.answers, field, fieldAnswers);
            this.invalid = this.invalid.length ? missingRequiredFields(this.answers) : [];
          }}
          discussion={this.attrs.discussion}
          tags={this.tags ?? undefined}
          ontagchange={(tags: Tag[]) => (this.tags = tags)}
          invalid={this.invalid}
        />
      </div>,
      <div className="Modal-footer">
        <Button type="submit" className="Button Button--primary" loading={this.loading}>
          {app.translator.trans('fof-mason.forum.answers-modal.save')}
        </Button>
      </div>,
    ];
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();

    this.invalid = app.forum.canSkipRequiredMasonFields() ? [] : missingRequiredFields(this.answers);

    if (this.invalid.length) return;

    if (!this.attrs.save) {
      this.close();
      return;
    }

    this.loading = true;

    this.attrs.save(this.answers, this.tags).then(
      () => this.close(),
      (error: RequestError) => {
        this.loading = false;
        this.onerror(error);
      }
    );
  }

  protected close() {
    this.attrs.animateHide(() => this.attrs.onsubmit?.(this.answers, this.tags));
  }
}
