import {extend} from 'flarum/extend';
import CommentPost from 'flarum/components/CommentPost';
import PostFields from 'flagrow/mason/components/PostFields';

export default function () {
    extend(CommentPost.prototype, 'content', function (content) {
        // We only add fields to the first post
        // TODO: what if the first post is deleted ?
        if (this.props.post.number() !== 1) {
            return;
        }

        const postHeaderIndex = content.findIndex(item => item.attrs && item.attrs.className === 'Post-header');

        // Insert the new content just after the header
        // or at the very beginning if the header is not found
        content.splice(postHeaderIndex === -1 ? 0 : postHeaderIndex + 1, 0, PostFields.component({
            discussion: this.props.post.discussion(),
        }));
    });
}
