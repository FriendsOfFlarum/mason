import {extend} from 'flarum/extend';
import app from 'flarum/app';
import CommentPost from 'flarum/components/CommentPost';
import FieldsViewer from './components/FieldsViewer';

function showFieldsOnPost(post) {
    // We only add fields to the first post, and only if fields are not displayed in the hero
    // TODO: what if the first post is deleted ?
    return post.number() === 1 && !app.forum.attribute('flagrow.mason.fields-in-hero');
}

export default function () {
    extend(CommentPost.prototype, 'init', function () {
        this.subtree.check(
            () => {
                if (showFieldsOnPost(this.props.post)) {
                    // Create a string with all answer ids
                    // If answers change this string will be different
                    return this.props.post.discussion().flagrowMasonAnswers().map(answer => answer.id()).join(',');
                }

                // For other posts we always return the same thing
                return '';
            }
        );
    });

    extend(CommentPost.prototype, 'content', function (content) {
        if (!showFieldsOnPost(this.props.post)) {
            return;
        }

        const postHeaderIndex = content.findIndex(item => item.attrs && item.attrs.className === 'Post-header');

        // Insert the new content just after the header
        // or at the very beginning if the header is not found
        content.splice(postHeaderIndex === -1 ? 0 : postHeaderIndex + 1, 0, FieldsViewer.component({
            discussion: this.props.post.discussion(),
        }));
    });
}
