<?php

/*
 * This file is part of fof/mason.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Mason;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Discussion\Discussion;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int                                                   $id
 * @property int                                                   $field_id
 * @property Field|null                                            $field
 * @property string                                                $content
 * @property bool                                                  $is_suggested
 * @property int|null                                              $sort
 * @property Carbon                                                $created_at
 * @property Carbon                                                $updated_at
 * @property \Illuminate\Database\Eloquent\Collection<int, Discussion> $discussions
 */
class Answer extends AbstractModel
{
    use ScopeVisibilityTrait;

    public $timestamps = true;

    protected $table = 'fof_mason_answers';

    protected $casts = [
        'is_suggested' => 'boolean',
        'sort'         => 'integer',
    ];

    protected $fillable = [
        'content',
        'is_suggested',
    ];

    /**
     * @return BelongsTo<Field, $this>
     */
    public function field(): BelongsTo
    {
        return $this->belongsTo(Field::class);
    }

    /**
     * @return BelongsToMany<Discussion, $this>
     */
    public function discussions(): BelongsToMany
    {
        return $this->belongsToMany(Discussion::class, 'fof_mason_discussion_answer', 'answer_id', 'discussion_id');
    }
}
