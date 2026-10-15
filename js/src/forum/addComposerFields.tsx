import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import classList from 'flarum/common/utils/classList';
import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import type Tag from 'ext:flarum/tags/common/models/Tag';
import type Answer from '../common/models/Answer';
import { missingRequiredFields, present, sortedFields } from '../common/utils/fields';
import { loadFieldsEditor, openFieldsEditor } from './utils/fieldsEditor';

/**
 * DiscussionComposer lives in a lazy chunk, so it is only typed loosely here.
 */
interface DiscussionComposerLike {
  composer: { fields: { masonAnswers?: Answer[]; tags?: Tag[] } };
  headerItems(): ItemList<Mithril.Children>;
  onsubmit(): void;
  data(): Record<string, any>;
}

function answersOf(component: DiscussionComposerLike): Answer[] {
  return present(component.composer.fields.masonAnswers);
}

function chooseAnswers(component: DiscussionComposerLike, then?: () => void) {
  return openFieldsEditor({
    answers: answersOf(component),
    onsubmit: (answers, tags) => {
      component.composer.fields.masonAnswers = answers;
      if (tags) component.composer.fields.tags = tags;
      then?.();
    },
  });
}

function needsAnswers(component: DiscussionComposerLike): boolean {
  return !app.forum.canSkipRequiredMasonFields() && missingRequiredFields(answersOf(component)).length > 0;
}

export default function addComposerFields() {
  app.prefetch.add('fof-mason.fields-editor', () => (app.forum.canFillMasonFields() ? loadFieldsEditor() : Promise.resolve()));

  extend('flarum/forum/components/DiscussionComposer', 'headerItems', function (this: DiscussionComposerLike, items: ItemList<Mithril.Children>) {
    if (!app.forum.canFillMasonFields() || !sortedFields().length) return;

    const summary = answersOf(this)
      .map((answer) => answer.content())
      .join(' · ');

    items.add(
      'mason-fields',
      <Button
        className={classList('Button Button--ua-reset DiscussionComposer-masonFields', {
          'DiscussionComposer-masonFields--incomplete': needsAnswers(this),
        })}
        icon="fas fa-clipboard-list"
        title={summary || undefined}
        onclick={() => chooseAnswers(this)}
      >
        <span className="DiscussionComposer-masonFields-label">{summary || app.translator.trans('fof-mason.forum.composer.add-details')}</span>
      </Button>,
      // Right after the tags chip (10), before the title input.
      5
    );
  });

  // Ask for missing required answers on submit, like tags does for missing tags.
  override('flarum/forum/components/DiscussionComposer', 'onsubmit', function (this: DiscussionComposerLike, original: () => void) {
    if (app.forum.canFillMasonFields() && needsAnswers(this)) {
      chooseAnswers(this, original);
      return;
    }

    original();
  });

  extend('flarum/forum/components/DiscussionComposer', 'data', function (this: DiscussionComposerLike, data: Record<string, any>) {
    if (!app.forum.canFillMasonFields() || !this.composer.fields.masonAnswers) return;

    data.relationships ||= {};
    data.relationships.masonAnswers = answersOf(this);
  });
}
