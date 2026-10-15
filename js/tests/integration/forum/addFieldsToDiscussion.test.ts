import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import CommentPost from 'flarum/forum/components/CommentPost';
import DiscussionHero from 'flarum/forum/components/DiscussionHero';
import DiscussionPage from 'flarum/forum/components/DiscussionPage';
import IndexPage from 'flarum/forum/components/IndexPage';
import PageState from 'flarum/common/states/PageState';
import type Post from 'flarum/common/models/Post';
import type Mithril from 'mithril';
import forumExtend from '../../../src/forum/extend';
import addFieldsToDiscussion from '../../../src/forum/addFieldsToDiscussion';
import FieldsViewer from '../../../src/forum/components/FieldsViewer';
import { applyExtenders, makeDiscussion, seedFields, setForum } from '../../helpers';

beforeAll(() => {
  bootstrapForum();
  app.boot();
  applyExtenders(forumExtend);
  seedFields();
  addFieldsToDiscussion();
});

beforeEach(() => {
  setForum({ 'fof-mason.fields-in-hero': false });
  app.current = new PageState(DiscussionPage);
});

function makePost(number: number, discussionAttrs: Parameters<typeof makeDiscussion>[0] = {}): Post {
  makeDiscussion(discussionAttrs);

  return app.store.pushPayload({
    data: {
      type: 'posts',
      id: String(100 + number),
      attributes: {
        number,
        contentType: 'comment',
        contentHtml: '<p>Body</p>',
      },
      relationships: {
        discussion: { data: { type: 'discussions', id: '1' } },
      },
    },
  } as any) as unknown as Post;
}

function postContent(post: Post): Mithril.Vnode<any, any>[] {
  const component = Object.create(CommentPost.prototype);
  component.attrs = { post };

  return component.content();
}

const isViewer = (vnode: any) => vnode?.tag === FieldsViewer;

test('details follow the body of the discussion opener', () => {
  const content = postContent(makePost(1));
  const viewerIndex = content.findIndex(isViewer);

  expect(viewerIndex).toBe(content.length - 1);
  expect(viewerIndex).toBeGreaterThan(0);
  expect(content[viewerIndex].attrs.placement).toBe('post');
});

test('replies get no details', () => {
  expect(postContent(makePost(2)).some(isViewer)).toBe(false);
});

test('actors who may not see answers get no details', () => {
  expect(postContent(makePost(1, { canSee: false })).some(isViewer)).toBe(false);
});

test('posts listed outside a discussion (e.g. a user profile) get no details', () => {
  app.current = new PageState(IndexPage);

  expect(postContent(makePost(1)).some(isViewer)).toBe(false);
});

describe('hero placement', () => {
  function heroItems(discussion = makeDiscussion()) {
    const hero = Object.create(DiscussionHero.prototype);
    hero.attrs = { discussion };

    return hero.bodyItems();
  }

  test('moves the details from the post into the hero', () => {
    setForum({ 'fof-mason.fields-in-hero': true });

    expect(heroItems().get('mason-fields').attrs.placement).toBe('hero');
    expect(postContent(makePost(1)).some(isViewer)).toBe(false);
  });

  test('stays out of the hero by default', () => {
    expect(heroItems().has('mason-fields')).toBe(false);
  });
});
