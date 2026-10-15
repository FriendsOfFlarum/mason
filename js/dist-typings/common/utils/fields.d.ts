import type Answer from '../models/Answer';
import type Field from '../models/Field';
interface Ordered {
    id(): string | undefined;
    sort(): number | null;
}
/**
 * Admin-defined order. Items never reordered (`sort` null) go last, oldest first.
 */
export declare function bySort<T extends Ordered>(items: T[]): T[];
export declare function byContent(answers: Answer[]): Answer[];
export declare function sortedFields(): Field[];
/**
 * Answers preloaded with the forum carry no `field` linkage, so fall back to the field suggesting them.
 */
export declare function fieldOf(answer: Answer, fields: Field[]): Field | undefined;
export declare function answersFor(field: Field, answers: Answer[], fields: Field[]): Answer[];
/**
 * `answers` with `field`'s answers swapped for `fieldAnswers`.
 */
export declare function withFieldAnswers(answers: Answer[], field: Field, fieldAnswers: Answer[], fields?: Field[]): Answer[];
export declare function missingRequiredFields(answers: Answer[], fields?: Field[]): Field[];
/**
 * Store relationships keep `undefined` holes for records deleted client-side.
 */
export declare function present<T>(items: false | (T | undefined)[] | undefined | null): T[];
export {};
