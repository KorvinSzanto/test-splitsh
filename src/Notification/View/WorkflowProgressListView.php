<?php

namespace Concrete\Core\Notification\View;

use Concrete\Core\Application\UserInterface\ContextMenu\Item\LinkItem;
use Concrete\Core\Entity\Notification\Notification;
use Concrete\Core\Notification\View\Menu\WorkflowProgressListViewMenu;
use Concrete\Core\Workflow\Progress\SiteProgressInterface;
use HtmlObject\Element;

class WorkflowProgressListView extends StandardListView
{
    protected $progress;

    protected $workflow;

    protected $request;

    protected $actions = [];

    /**
     * @var \Concrete\Core\Entity\Notification\WorkflowProgressNotification
     */
    protected $notification;

    /**
     * WorkflowProgressListView constructor.
     *
     * @param \Concrete\Core\Entity\Notification\WorkflowProgressNotification $notification
     */
    public function __construct(Notification $notification)
    {
        parent::__construct($notification);
        $this->progress = $this->notification->getWorkflowProgressObject();
        $this->workflow = $this->progress->getWorkflowObject();
        $this->request = $this->progress->getWorkflowRequestObject();
        $this->actions = $this->progress->getWorkflowProgressActions();
    }

    public function getTitle()
    {
        return t('Workflow Progress');
    }

    public function getIconClass()
    {
        // Not used, since renderIcon() is overridden
        return false;
    }

    public function renderIcon()
    {
        return $this->request->getRequestIconElement();
    }

    public function getInitiatorUserObject()
    {
        return $this->request->getRequesterUserObject();
    }

    public function getActionDescription()
    {
        $req = $this->progress->getWorkflowRequestObject();
        $description = $req->getWorkflowRequestDescriptionObject();
        if ($description) {
            return $description->getDescription();
        }
    }

    public function getInitiatorComment()
    {
        return $this->workflow->getWorkflowProgressCurrentComment($this->progress);
    }

    public function getFormAction()
    {
        return $this->progress->getWorkflowProgressFormAction();
    }

    public function getNotificationDateTimeZone()
    {
        if ($this->progress instanceof SiteProgressInterface) {
            $site = $this->progress->getSite();
            if ($site) {
                return $site->getTimezone();
            }
        }
    }

    public function getMenu()
    {
        $menu = new WorkflowProgressListViewMenu();
        foreach ($this->actions as $action) {
            if ($action->getWorkflowProgressActionURL() != '') {
                $class = '';
                if (strpos($action->getWorkflowProgressActionStyleClass(), 'dialog-launch') > -1) {
                    $class = 'dialog-launch';
                }
                $parameters = array_merge(['class' => $class], $action->getWorkflowProgressActionExtraButtonParameters());
                $item = new LinkItem(
                    $action->getWorkflowProgressActionURL() . '&source=dashboard',
                    $action->getWorkflowProgressActionLabel(),
                    $parameters
                );
            } else {
                $parameters = array_merge([
                    'data-workflow-task' => $action->getWorkflowProgressActionTask(),
                ], $action->getWorkflowProgressActionExtraButtonParameters());

                $item = new LinkItem(
                    '#',
                    $action->getWorkflowProgressActionLabel(),
                    $parameters
                );
            }
            $menu->addItem($item);
        }

        return $menu;
    }

    protected function getRequestedByElement()
    {
        return new Element('span', t('Submitted By '));
    }
}
