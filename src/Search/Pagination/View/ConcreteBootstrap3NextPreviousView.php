<?php
namespace Concrete\Core\Search\Pagination\View;

use Pagerfanta\View\DefaultView;
use Pagerfanta\View\TwitterBootstrap3View;

class ConcreteBootstrap3NextPreviousView extends DefaultView implements ViewInterface
{
    protected function createDefaultTemplate()
    {
        return new ConcreteBootstrap3NextPreviousTemplate();
    }

    public function getName()
    {
        return 'concrete_bootstrap3_next_previous';
    }

    public function getArguments()
    {
        return array();
    }



}
