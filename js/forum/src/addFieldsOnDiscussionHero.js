import {extend} from 'flarum/extend';
import app from 'flarum/app';
import DiscussionHero from 'flarum/components/DiscussionHero';
import FieldsViewer from 'flagrow/mason/components/FieldsViewer';

export default function () {
    extend(DiscussionHero.prototype, 'items', function (items) {
        if (!app.forum.attribute('flagrow.mason.fields-in-hero')) {
            return;
        }

        items.add('flagrow-mason-fields', FieldsViewer.component({
            discussion: this.props.discussion,
        }));
    });
}
