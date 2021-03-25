import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import chunkArray from './../helpers/chunkArray';

/* global m */

export default class FieldGrid extends Component {
    view() {
        return m('.Mason-Grid-Wrapper', m('.Mason-Grid', chunkArray(this.attrs.items, app.forum.attribute('fof-mason.column-count')).map(
            row => m('.Mason-Row', row.map(
                item => m('.Mason-Column', item)
            ))
        )));
    }
}
