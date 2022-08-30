<?php
namespace Concrete\Core\Health\Report\Finding\Formatter;

use Concrete\Core\Health\Report\Finding\Details\DetailsInterface;
use HtmlObject\Element;

class SuccessFormatter implements FormatterInterface
{

    public function getIcon(): Element
    {
        return new Element('i', '', ['class' => 'fa fa-thumbs-up']);
    }

    public function getFindingEntryTextClass(): string
    {
        return 'text-success';
    }

    public function showDetails(DetailsInterface $details): bool
    {
        return false;
    }

    public function getType(): string
    {
        return 'Success';
    }


}
