import {extend} from 'flarum/extend';
import app from 'flarum/app';
import DiscussionHero from 'flarum/components/DiscussionHero';
import FieldsViewer from './components/FieldsViewer';

export default function () {
    extend(DiscussionHero.prototype, 'items', function (items) {
        if (!this.props.discussion.canSeeMasonAnswers() || !app.forum.attribute('fof-mason.fields-in-hero')) {
            return;
        }

        items.add('mason-fields', FieldsViewer.component({
            discussion: this.props.discussion,
        }));
    });
}
