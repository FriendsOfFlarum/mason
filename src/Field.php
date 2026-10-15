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
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int                                               $id
 * @property string                                            $name
 * @property string|null                                       $description
 * @property int                                               $min_answers_count
 * @property int                                               $max_answers_count
 * @property bool                                              $show_when_empty
 * @property bool                                              $user_values_allowed
 * @property string|null                                       $validation
 * @property string|null                                       $icon
 * @property int|null                                          $sort
 * @property Carbon                                            $created_at
 * @property Carbon                                            $updated_at
 * @property Carbon|null                                       $deleted_at
 * @property \Illuminate\Database\Eloquent\Collection<int, Answer> $answers
 * @property \Illuminate\Database\Eloquent\Collection<int, Answer> $suggestedAnswers
 * @property \Illuminate\Database\Eloquent\Collection<int, Answer> $allAnswers
 */
class Field extends AbstractModel
{
    use ScopeVisibilityTrait;
    use SoftDeletes;

    public $timestamps = true;

    protected $table = 'fof_mason_fields';

    protected $casts = [
        'min_answers_count'   => 'integer',
        'max_answers_count'   => 'integer',
        'show_when_empty'     => 'boolean',
        'user_values_allowed' => 'boolean',
        'sort'                => 'integer',
        'deleted_at'          => 'datetime',
    ];

    protected $fillable = [
        'name',
        'description',
        'min_answers_count',
        'max_answers_count',
        'show_when_empty',
        'user_values_allowed',
        'validation',
        'icon',
        'sort',
    ];

    /**
     * @return HasMany<Answer, $this>
     */
    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }

    /**
     * @return HasMany<Answer, $this>
     */
    public function suggestedAnswers(): HasMany
    {
        return $this->answers()->where('is_suggested', true)->orderBy('sort', 'desc');
    }

    /**
     * Includes user-created (non-suggested) answers, so only exposed to admins.
     *
     * @return HasMany<Answer, $this>
     */
    public function allAnswers(): HasMany
    {
        return $this->answers()->orderBy('is_suggested', 'desc')->orderBy('sort', 'desc');
    }
}
