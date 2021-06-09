import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import CommentPost from 'flarum/common/components/CommentPost';
import DiscussionPage from 'flarum/common/components/DiscussionPage';
import FieldsViewer from './components/FieldsViewer';

function showFieldsOnPost(post) {
    // The CommentPost component is also visible on the user profile, but we don't want to render the fields there
    if (!app.current.matches(DiscussionPage)) {
        return false;
    }

    // We only add fields to the first post, and only if fields are not displayed in the hero
    // TODO: what if the first post is deleted ?
    return post.number() === 1 && !app.forum.attribute('fof-mason.fields-in-hero');
}

export default function () {
    extend(CommentPost.prototype, 'oninit', function () {
        if (!this.attrs.post.discussion().canSeeMasonAnswers() || !showFieldsOnPost(this.attrs.post)) {
            return;
        }

        this.subtree.check(() => {
            // Create a string with all answer ids
            // If answers change this string will be different
            return (this.attrs.post.discussion().masonAnswers() || [])
                .map((answer) => {
                    // Sometimes answer will be undefined while the data is being saved in FieldsEditorModal
                    if (!answer) {
                        return '';
                    }

                    // There is a time after discussion.save() is called but before the data included in response is parsed
                    // where Flarum will already have updated the relationship, but answer.field will be missing and this causes
                    // the field to be skipped in FieldsViewer. So we also need to check the load status of that relationship
                    return JSON.stringify([answer.id(), !!answer.field()]);
                })
                .join(',');
        });
    });

    extend(CommentPost.prototype, 'content', function (content) {
        if (!this.attrs.post.discussion().canSeeMasonAnswers() || !showFieldsOnPost(this.attrs.post)) {
            return;
        }

        const postHeaderIndex = content.findIndex((item) => item.attrs && item.attrs.className === 'Post-header');

        // Insert the new content just after the header
        // or at the very beginning if the header is not found
        content.splice(
            postHeaderIndex === -1 ? 0 : postHeaderIndex + 1,
            0,
            FieldsViewer.component({
                discussion: this.attrs.post.discussion(),
            })
        );
    });
}
