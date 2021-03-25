import {extend} from 'flarum/common/extend';
import app from 'flarum/forum/app';
import DiscussionControls from 'flarum/forum/utils/DiscussionControls';
import Button from 'flarum/common/components/Button';
import FieldsEditorModal from './components/FieldsEditorModal';

export default function () {
    extend(DiscussionControls, 'moderationControls', function (items, discussion) {
        if (discussion.canUpdateMasonAnswers()) {
            items.add('mason-update-answers', Button.component({
                icon: 'fas fa-tag',
                onclick: () => app.modal.show(FieldsEditorModal, {discussion}),
            }, app.translator.trans('fof-mason.forum.discussion-controls.edit-answers')));
        }
    });
}
