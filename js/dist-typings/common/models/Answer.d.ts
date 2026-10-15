import Model from 'flarum/common/Model';
import type Field from './Field';
export default class Answer extends Model {
    content(): string;
    is_suggested(): boolean;
    sort(): number | null;
    field(): false | Field;
}
