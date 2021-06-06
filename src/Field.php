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
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int                                               $id
 * @property string                                            $name
 * @property string                                            $description
 * @property int                                               $min_answers_count
 * @property int                                               $max_answers_count
 * @property bool                                              $show_when_empty
 * @property bool                                              $user_values_allowed
 * @property string                                            $validation
 * @property string                                            $icon
 * @property int                                               $sort
 * @property Carbon                                            $created_at
 * @property Carbon                                            $updated_at
 * @property Carbon                                            $deleted_at
 * @property \Illuminate\Database\Eloquent\Collection|Answer[] $answers
 */
class Field extends AbstractModel
{
    use SoftDeletes;

    public $timestamps = true;

    protected $table = 'fof_mason_fields';

    protected $casts = [
        'min_answers_count'   => 'integer',
        'max_answers_count'   => 'integer',
        'show_when_empty'     => 'boolean',
        'user_values_allowed' => 'boolean',
    ];

    protected $visible = [
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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
