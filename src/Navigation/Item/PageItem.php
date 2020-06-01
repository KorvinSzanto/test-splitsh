<?php
namespace Concrete\Core\Navigation\Item;

use Concrete\Core\Page\Page;

class PageItem extends Item
{

    /**
     * @var int
     */
    protected $pageID;

    /**
     * Item constructor.
     * @param string $url
     * @param string $name
     * @param bool $isActive
     */
    public function __construct(Page $page = null, bool $isActive = false)
    {
        if ($page) {
            $this->pageID = $page->getCollectionID();
            parent::__construct($page->getCollectionLink(), $page->getCollectionName(), $isActive);
        }
    }

    /**
     * @return PageItem[]
     */
    public function getChildren(): array
    {
        return parent::getChildren(); // TODO: Change the autogenerated stub
    }

    /**
     * @return int
     */
    public function getPageID(): int
    {
        return $this->pageID;
    }

    /**
     * @param int $pageID
     */
    public function setPageID(int $pageID): void
    {
        $this->pageID = $pageID;
    }

    public function jsonSerialize()
    {
        $data = parent::jsonSerialize();
        $data['pageID'] = $this->getPageID();
        return $data;
    }


}
