import app from 'flarum/app';
import Component from 'flarum/Component';
import chunkArray from './../helpers/chunkArray';

export default class FieldGrid extends Component {
    view() {
        return m('.Mason-Grid-Wrapper', m('.Mason-Grid', chunkArray(this.props.items, app.forum.attribute('fof-mason.column-count')).map(
            row => m('.Mason-Row', row.map(
                item => m('.Mason-Column', item)
            ))
        )));
    }
}
