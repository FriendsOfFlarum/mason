import Model from 'flarum/common/Model';
import type Answer from './Answer';
export default class Field extends Model {
    name(): string;
    description(): string | null;
    min_answers_count(): number;
    max_answers_count(): number;
    show_when_empty(): boolean;
    user_values_allowed(): boolean;
    validation(): string | null;
    icon(): string | null;
    sort(): number | null;
    allAnswers(): false | (Answer | undefined)[];
    suggestedAnswers(): false | (Answer | undefined)[];
    required(): boolean;
    multiple(): boolean;
}
