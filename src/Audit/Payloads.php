<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason\Audit;

use FoF\Mason\Answer;
use FoF\Mason\Event\AnswerCreated;
use FoF\Mason\Event\AnswerDeleted;
use FoF\Mason\Event\AnswerUpdated;
use FoF\Mason\Event\DiscussionAnswersChanged;
use FoF\Mason\Event\FieldCreated;
use FoF\Mason\Event\FieldDeleted;
use FoF\Mason\Event\FieldUpdated;
use FoF\Mason\Field;

/**
 * Audit log payloads. The audit browser only interpolates a fixed set of keys (name, key, keys,
 * old_name, new_name, old_value, new_value, discussion_id), so labels use those; full detail rides
 * along for "Show raw". Names and contents are snapshots, so entries outlive deleted fields/answers.
 */
class Payloads
{
    public static function fieldCreated(FieldCreated $event): array
    {
        return self::field($event->field);
    }

    public static function fieldUpdated(FieldUpdated $event): array
    {
        return self::field($event->field) + [
            'keys'    => array_keys($event->changes),
            'changes' => self::changes($event->changes),
        ];
    }

    public static function fieldDeleted(FieldDeleted $event): array
    {
        return self::field($event->field);
    }

    public static function answerCreated(AnswerCreated $event): array
    {
        return self::answer($event->answer) + ['name' => $event->answer->content];
    }

    public static function answerUpdated(AnswerUpdated $event): array
    {
        return self::answer($event->answer) + [
            'old_name' => $event->changes['content'][0] ?? $event->answer->content,
            'new_name' => $event->answer->content,
            'keys'     => array_keys($event->changes),
            'changes'  => self::changes($event->changes),
        ];
    }

    public static function answerDeleted(AnswerDeleted $event): array
    {
        return self::answer($event->answer) + ['name' => $event->answer->content];
    }

    /**
     * Null (nothing logged) when no visible field's answers changed, e.g. only answers to deleted fields.
     */
    public static function discussionAnswersChanged(DiscussionAnswersChanged $event): ?array
    {
        $old = self::contentsByField($event->oldAnswers);
        $new = self::contentsByField($event->newAnswers);
        $changes = [];

        foreach (self::fieldsOf([...$event->oldAnswers, ...$event->newAnswers]) as $field) {
            $before = $old[$field->id] ?? [];
            $after = $new[$field->id] ?? [];

            if ($before !== $after) {
                $changes[$field->name] = ['old' => $before, 'new' => $after];
            }
        }

        if (!$changes) {
            return null;
        }

        return [
            'discussion_id' => $event->discussion->id,
            'keys'          => array_keys($changes),
            'old_value'     => self::summary(array_map(fn (array $change) => $change['old'], $changes)),
            'new_value'     => self::summary(array_map(fn (array $change) => $change['new'], $changes)),
            'changes'       => $changes,
        ];
    }

    protected static function field(Field $field): array
    {
        return ['field_id' => $field->id, 'name' => $field->name];
    }

    protected static function answer(Answer $answer): array
    {
        return [
            'answer_id' => $answer->id,
            'field_id'  => $answer->field_id,
            'key'       => $answer->field()->withTrashed()->value('name'),
        ];
    }

    /**
     * @param array<string, array{0: mixed, 1: mixed}> $changes
     *
     * @return array<string, array{old: mixed, new: mixed}>
     */
    protected static function changes(array $changes): array
    {
        return array_map(fn (array $change) => ['old' => $change[0], 'new' => $change[1]], $changes);
    }

    /**
     * @param Answer[] $answers
     *
     * @return array<int, string[]> field id => sorted contents
     */
    protected static function contentsByField(array $answers): array
    {
        $contents = [];

        foreach ($answers as $answer) {
            $contents[$answer->field_id][] = $answer->content;
        }

        return array_map(function (array $fieldContents) {
            sort($fieldContents);

            return $fieldContents;
        }, $contents);
    }

    /**
     * Visible fields (soft-deleted ones are excluded by the relation) in admin order.
     *
     * @param Answer[] $answers
     *
     * @return Field[]
     */
    protected static function fieldsOf(array $answers): array
    {
        $fields = [];

        foreach ($answers as $answer) {
            if ($field = $answer->field) {
                $fields[$field->id] = $field;
            }
        }

        usort($fields, fn (Field $a, Field $b) => [$a->sort ?? PHP_INT_MAX, $a->id] <=> [$b->sort ?? PHP_INT_MAX, $b->id]);

        return $fields;
    }

    /**
     * @param array<string, string[]> $contentsByName
     */
    protected static function summary(array $contentsByName): string
    {
        $parts = [];

        foreach ($contentsByName as $name => $contents) {
            if ($contents) {
                $parts[] = $name.': '.implode(', ', $contents);
            }
        }

        return implode('; ', $parts);
    }
}
