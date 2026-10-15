import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import DiscussionHero from 'flarum/forum/components/DiscussionHero';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import type ItemList from 'flarum/common/utils/ItemList';
import type Post from 'flarum/common/models/Post';
import type Mithril from 'mithril';
import { present } from '../common/utils/fields';
import FieldsViewer from './components/FieldsViewer';

function inHero(): boolean {
  return !!app.forum.attribute('fof-mason.fields-in-hero');
}

/**
 * CommentPost also renders on user profiles; answers belong only under a discussion's first post.
 */
function showUnder(post: Post): boolean {
  const discussion = post.discussion();

  return !inHero() && post.number() === 1 && !!discussion && !!discussion.canSeeMasonAnswers() && app.current.matches(DiscussionPage);
}

export default function addFieldsToDiscussion() {
  extend(CommentPost.prototype, 'oninit', function () {
    // Posts only redraw when their subtree check changes; include answer and field linkage
    // because a just-saved answer can arrive before its field.
    this.subtree.check(() =>
      showUnder(this.attrs.post)
        ? present(this.attrs.post.discussion().masonAnswers())
            .map((answer) => `${answer.id()}:${answer.field() ? 1 : 0}`)
            .join(',')
        : ''
    );
  });

  extend(CommentPost.prototype, 'content', function (content: Mithril.Children[]) {
    if (!showUnder(this.attrs.post)) return;

    content.push(<FieldsViewer discussion={this.attrs.post.discussion()} placement="post" />);
  });

  extend(DiscussionHero.prototype, 'bodyItems', function (items: ItemList<Mithril.Children>) {
    const { discussion } = this.attrs;

    if (!inHero() || !discussion.canSeeMasonAnswers()) return;

    // Below the title and badges (100).
    items.add('mason-fields', <FieldsViewer discussion={discussion} placement="hero" />, 50);
  });
}
