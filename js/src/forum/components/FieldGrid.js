import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import chunkArray from '../helpers/chunkArray';

export default class FieldGrid extends Component {
    view() {
        return (
            <div className="Mason-Grid-Wrapper">
                <div className="Mason-Grid">
                    {chunkArray(this.attrs.items, app.forum.attribute('fof-mason.column-count')).map((row) => (
                        <div className="Mason-Row">
                            {row.map((item) => (
                                <div className="Mason-Column" {...item} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
