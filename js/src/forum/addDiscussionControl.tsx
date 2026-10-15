import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import DiscussionControls from 'flarum/forum/utils/DiscussionControls';
import type Discussion from 'flarum/common/models/Discussion';
import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import { editDiscussionFields } from './utils/fieldsEditor';

export default function addDiscussionControl() {
  extend(DiscussionControls, 'moderationControls', function (items: ItemList<Mithril.Children>, discussion: Discussion) {
    if (!discussion.canUpdateMasonAnswers()) return;

    items.add(
      'mason-update-answers',
      <Button icon="fas fa-clipboard-list" onclick={() => editDiscussionFields(discussion)}>
        {app.translator.trans('fof-mason.forum.discussion-controls.edit-answers')}
      </Button>
    );
  });
}
