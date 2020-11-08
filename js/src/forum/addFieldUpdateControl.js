import {extend} from 'flarum/extend';
import app from 'flarum/app';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import Button from 'flarum/components/Button';
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
