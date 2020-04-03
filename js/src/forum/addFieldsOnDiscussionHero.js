import {extend, override} from 'flarum/extend';
import app from 'flarum/app';
import DiscussionHero from 'flarum/components/DiscussionHero';
import Composer from 'flarum/components/Composer';
import FieldsViewer from './components/FieldsViewer';

export default function () {
    extend(DiscussionHero.prototype, 'items', function (items) {
        if (!this.props.discussion.canSeeFlagrowMasonAnswers() || !app.forum.attribute('flagrow.mason.fields-in-hero')) {
            return;
        }

        items.add('flagrow-mason-fields', FieldsViewer.component({
            discussion: this.props.discussion,
        }));
    });

    override(Composer.prototype, 'animateToPosition', function (original, position) {
        // we need to detect if there are any mason fields present and if there are
        // add their height to the default height of the composer window

        // we have to show the composer in order to get the current height from it,
        // otherwise the fields are not drawn yet
        const $composer = this.$().stop(true);
        const composerHeight = $composer.outerHeight();
        m.redraw(true);
        $composer.show();

        const headerHeight = this.$('.ComposerBody-header').outerHeight();

        if (position === Composer.PositionEnum.NORMAL && composerHeight < headerHeight) {
            this.height = headerHeight + composerHeight;
            this.updateHeight();
        }

        return original(position);
    });
}
