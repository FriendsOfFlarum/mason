import app from 'flarum/forum/app';
import addComposerFields from './addComposerFields';
import addDiscussionControl from './addDiscussionControl';
import addFieldsToDiscussion from './addFieldsToDiscussion';
import patchModelIdentifier from './patchModelIdentifier';

export { default as extend } from './extend';

app.initializers.add('fof-mason', () => {
  addComposerFields();
  addFieldsToDiscussion();
  addDiscussionControl();
  patchModelIdentifier();
});
