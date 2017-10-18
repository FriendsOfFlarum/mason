import {extend} from 'flarum/extend';
import app from 'flarum/app';
import DiscussionHero from 'flarum/components/DiscussionHero';
import PostFields from 'flagrow/mason/components/PostFields';

export default function () {
    extend(DiscussionHero.prototype, 'items', function (items) {
        if (!app.forum.attribute('flagrow.mason.fields-in-hero')) {
            return;
        }

        items.add('flagrow-mason-fields', PostFields.component({
            discussion: this.props.discussion,
        }));
    });
}
