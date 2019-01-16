<?php

namespace Flagrow\Mason\Validators;

use Flagrow\Mason\Field;
use Flarum\Foundation\AbstractValidator;

class UserAnswerValidator extends AbstractValidator
{
    /**
     * @param Field $field
     * @return $this
     */
    public function setField(Field $field)
    {
        $rules = [];

        if ($field->min_answers_count > 0) {
            $rules[] = 'required';
        }

        if ($field->validation) {
            $rules = array_merge($rules, explode('|', $field->validation));
        }

        $this->rules = [$field->name => $rules];

        return $this;
    }
}
