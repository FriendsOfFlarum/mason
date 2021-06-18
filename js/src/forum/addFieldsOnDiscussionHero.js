import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import DiscussionHero from 'flarum/common/components/DiscussionHero';
import FieldsViewer from './components/FieldsViewer';

export default function () {
    extend(DiscussionHero.prototype, 'items', function (items) {
        if (!this.attrs.discussion.canSeeMasonAnswers() || !app.forum.attribute('fof-mason.fields-in-hero')) {
            return;
        }

        items.add('mason-fields', <FieldsViewer discussion={this.attrs.discussion} />);
    });
}
