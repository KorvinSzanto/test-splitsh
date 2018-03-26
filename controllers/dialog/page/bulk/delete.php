<?php
namespace Concrete\Controller\Dialog\Page\Bulk;

use Concrete\Controller\Backend\UserInterface as BackendInterfaceController;
use Concrete\Core\Form\Service\Form;
use Concrete\Core\Foundation\Queue\Response\EnqueueItemsResponse;
use Concrete\Core\Page\Command\DeletePageCommand;
use Page;
use Permissions;
use Concrete\Core\Foundation\Queue\QueueService;

class Delete extends BackendInterfaceController
{
    protected $viewPath = '/dialogs/page/bulk/delete';
    protected $pages;
    protected $canEdit = false;

    protected function canAccess()
    {
        $this->populatePages();

        return $this->canEdit;
    }

    protected function populatePages()
    {
        if (!isset($this->pages)) {
            if (is_array($_REQUEST['item'])) {
                foreach ($_REQUEST['item'] as $cID) {
                    $c = Page::getByID($cID);
                    if (is_object($c) && !$c->isError()) {
                        $this->pages[] = $c;
                    }
                }
            }
        }

        if (count($this->pages) > 0) {
            $this->canEdit = true;
            foreach ($this->pages as $c) {
                $cp = new Permissions($c);
                if (!$cp->canDeletePage()) {
                    $this->canEdit = false;
                }
            }
        } else {
            $this->canEdit = false;
        }

        return $this->canEdit;
    }

    public function view()
    {
        $this->populatePages();
        $this->set('form', $this->app->make('helper/form'));
        $this->set('dh', $this->app->make('helper/date'));
        $this->set('pages', $this->pages);
    }

    public function submit()
    {
        if ($this->canAccess()) {
            $u = new \User();
            foreach($this->pages as $page) {
                $this->queueCommand(new DeletePageCommand($page->getCollectionID(),
                    $u->getUserID()
                ));
            }

            $q = $this->app->make(QueueService::class)
                ->get('delete_page');
            return new EnqueueItemsResponse($q);
        }
    }


}
