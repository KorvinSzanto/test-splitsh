<?php
namespace Concrete\Core\Workflow;

use Concrete\Core\Foundation\ConcreteObject;

class Description extends ConcreteObject
{
    /**
     * @var ?string
     * @deprecated Will become protected
     */
    public $text = null;

    /**
     * @var ?string
     * @deprecated Will become protected
     */
    public $emailtext = null;

    /**
     * @var ?string
     * @deprecated Will become protected
     */
    public $status = null;

    /**
     * @var ?string
     * @deprecated Will become protected
     */
    public $incontext = null;

    public function getDescription()
    {
        return $this->text;
    }

    public function setDescription($text)
    {
        $this->text = $text;
    }

    public function getEmailDescription()
    {
        return $this->emailtext;
    }

    public function setEmailDescription($text)
    {
        $this->emailtext = $text;
    }

    public function setInContextDescription($html)
    {
        $this->incontext = $html;
    }

    public function getInContextDescription()
    {
        return $this->incontext;
    }

    public function setShortStatus($status)
    {
        $this->status = $status;
    }

    public function getShortStatus()
    {
        return $this->status;
    }
}
