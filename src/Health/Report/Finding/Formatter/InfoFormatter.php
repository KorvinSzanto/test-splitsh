<?php
namespace Concrete\Core\Health\Report\Finding\Formatter;

use Concrete\Core\Health\Report\Finding\Details\DetailsInterface;
use HtmlObject\Element;

class InfoFormatter implements FormatterInterface
{

    public function getIcon(): Element
    {
        return new Element('i', '', ['class' => 'fa fa-info-circle']);
    }

    public function getFindingEntryTextClass(): string
    {
        return 'text-info';
    }

    public function showDetails(DetailsInterface $details): bool
    {
        return true;
    }

    public function getType(): string
    {
        return 'Notice';
    }




}
