<?php

namespace Concrete\Core\Form\Service\DestinationPicker;

use ArrayAccess;
use Concrete\Core\Form\Service\Form;
use Egulias\EmailValidator\EmailValidator;
use Symfony\Component\HttpFoundation\ParameterBag;

class EmailPicker implements PickerInterface
{
    /**
     * @var \Concrete\Core\Form\Service\Form
     */
    protected $formService;

    public function __construct(Form $formService)
    {
        $this->formService = $formService;
    }

    /**
     * {@inheritdoc}
     *
     * @see \Concrete\Core\Form\Service\DestinationPicker\PickerInterface::getDisplayName()
     */
    public function getDisplayName(array $options)
    {
        return empty($options['displayName']) ? t('Email Address') : $options['displayName'];
    }

    /**
     * {@inheritdoc}
     *
     * @see \Concrete\Core\Form\Service\DestinationPicker\PickerInterface::getHeight()
     */
    public function getHeight()
    {
        return 40;
    }

    /**
     * {@inheritdoc}
     *
     * @see \Concrete\Core\Form\Service\DestinationPicker\PickerInterface::generate()
     */
    public function generate($pickerKey, array $options, $selectedValue = null)
    {
        $miscFields = $options;
        unset($miscFields['displayName']);
        unset($miscFields['checkDNS']);
        unset($miscFields['strict']);

        return $this->formService->email($pickerKey, $selectedValue, $options);
    }

    /**
     * {@inheritdoc}
     *
     * @see \Concrete\Core\Form\Service\DestinationPicker\PickerInterface::decode()
     */
    public function decode(ParameterBag $data, $pickerKey, array $options, ArrayAccess $errors = null, $fieldDisplayName = null)
    {
        $result = null;
        $postValue = $data->get($pickerKey);
        if (is_string($postValue)) {
            $postValue = trim($postValue);
            if ($postValue !== '') {
                $maxLength = empty($options['maxlength']) ? 0 : (int) $options['maxlength'];
                if ($maxLength > 0) {
                    $postLength = mb_strlen($postValue);
                    if ($postLength > $maxLength) {
                        $postValue = null;
                        if ($errors !== null) {
                            if ((string) $fieldDisplayName === '') {
                                $errors[] = t('The maximum length of the email address is %s characters.', $maxLength);
                            } else {
                                $errors[] = t('The maximum length of %1$s is %s characters.', $fieldDisplayName, $maxLength);
                            }
                        }
                    }
                }
                if ($postValue !== null) {
                    $emailValidator = new EmailValidator();
                    if (!$emailValidator->isValid($postValue, !empty($options['checkDNS']), !empty($options['strict']))) {
                        $postValue = null;
                        if ($errors !== null) {
                            if ((string) $fieldDisplayName === '') {
                                $errors[] = t('The specified email address is not valid.');
                            } else {
                                $errors[] = t('Please specify a valid email address for %s.', $fieldDisplayName);
                            }
                        }
                    }
                }
                $result = $postValue;
            }
        }

        return $result;
    }
}
