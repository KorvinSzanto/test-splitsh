<?php
namespace Concrete\Controller\Backend\Board;

use Concrete\Core\Board\Command\ClearSlotFromBoardCommand;
use Concrete\Core\Board\Command\DeleteBoardInstanceSlotRuleCommand;
use Concrete\Core\Board\Command\PinSlotToBoardCommand;
use Concrete\Core\Board\Instance\Slot\RenderedSlotCollectionFactory;
use Concrete\Core\Controller\AbstractController;
use Concrete\Core\Entity\Board\InstanceSlotRule;
use Concrete\Core\Logging\Channels;
use Concrete\Core\Logging\LoggerFactory;
use Concrete\Core\Package\Offline\Exception;
use Concrete\Core\Permission\Checker;
use Doctrine\ORM\EntityManager;
use Concrete\Core\Entity\Board\Instance as InstanceEntity;
use Symfony\Component\HttpFoundation\JsonResponse;

class Instance extends AbstractController
{

    protected function canEditSlotRule(InstanceSlotRule $rule)
    {
        $board = $rule->getInstance()->getBoard();
        if ($board) {
            $permissions = new Checker($board);
            if ($rule->isLocked()) {
                $canEditSlotRule = $permissions->canEditBoardLockedRules();
            } else {
                $canEditSlotRule = $permissions->canEditBoardContents();
            }
            return $canEditSlotRule;
        }
        return false;
    }

    public function deleteRule()
    {
        $entityManager = $this->app->make(EntityManager::class);
        $rule = $entityManager->find(InstanceSlotRule::class, $this->request->request->get('boardInstanceSlotRuleID'));
        if ($rule && $this->canEditSlotRule($rule)) {
            $command = new DeleteBoardInstanceSlotRuleCommand($rule);
            $this->app->executeCommand($command);
            return new JsonResponse($rule);
        }
        throw new \Exception(t('Access Denied.'));
    }

    public function deleteRuleByBatch()
    {
        $token = $this->app->make('token');
        if ($token->validate()) {
            $entityManager = $this->app->make(EntityManager::class);
            $rules = [];
            foreach((array) $this->request->request->get('instances') as $instanceID) {
                $instance = $entityManager->find(InstanceEntity::class, $instanceID);
                if ($instance) {
                    $instanceRules = $instance->getRules();
                    foreach($instanceRules as $instanceRule) {
                        if ($instanceRule->getBatchIdentifier() == $this->request->request->get('batchIdentifier')) {
                            $rules[] = $instanceRule;
                        }
                    }
                }
            }
            $canProceed = false;
            if ($rules) {
                $canProceed = true;
                foreach($rules as $rule) {
                    if (!$this->canEditSlotRule($rule)) {
                        $canProceed = false;
                    }
                }
            }
            if ($canProceed) {
                foreach($rules as $rule) {
                    $command = new DeleteBoardInstanceSlotRuleCommand($rule);
                    $this->app->executeCommand($command);
                }
                return new JsonResponse([]);
            }
            throw new \Exception(t('Access Denied.'));
        }
    }

    public function pinSlot()
    {
        $entityManager = $this->app->make(EntityManager::class);
        $boardInstanceID = $this->request->request->get('boardInstanceID');
        if ($boardInstanceID) {
            $instance = $entityManager->find(InstanceEntity::class, $boardInstanceID);
        }

        if ($instance && $this->canEditSlot($instance, $this->request->request->get('slot'))) {
            $command = new PinSlotToBoardCommand();
            $command->setBlockID($this->request->request->get('bID'));
            $command->setInstance($instance);
            $command->setSlot($this->request->request->get('slot'));
            $this->app->executeCommand($command);

            $renderedSlotCollectionFactory = $this->app->make(RenderedSlotCollectionFactory::class);
            $renderedSlotCollection = $renderedSlotCollectionFactory->createCollection($instance);

            return new JsonResponse($renderedSlotCollection->getRenderedSlot($this->request->request->get('slot')));
        }

        throw new Exception(t('Access Denied.'));
    }

    protected function canEditSlot(InstanceEntity $instance, $slot)
    {
        $rules = $instance->getRules();
        $board = $instance->getBoard();
        $checker = new Checker($board);

        foreach($rules as $rule) {
            if ($rule->getSlot() == $slot) {
                return $this->canEditSlotRule($rule);
            }
        }
        
        return $checker->canEditBoardContents();
    }

    public function clearSlot()
    {
        $entityManager = $this->app->make(EntityManager::class);
        $boardInstanceID = $this->request->request->get('boardInstanceID');
        if ($boardInstanceID) {
            $instance = $entityManager->find(InstanceEntity::class, $boardInstanceID);
        }

        $rule = $entityManager->find(InstanceSlotRule::class, $this->request->request->get('boardInstanceSlotRuleID'));
        if ($instance && $rule && $this->canEditSlotRule($rule)) {
            $command = new DeleteBoardInstanceSlotRuleCommand($rule);
            $this->app->executeCommand($command);

            $renderedSlotCollectionFactory = $this->app->make(RenderedSlotCollectionFactory::class);
            $renderedSlotCollection = $renderedSlotCollectionFactory->createCollection($instance);

            return new JsonResponse($renderedSlotCollection->getRenderedSlot($rule->getSlot()));
        }

        throw new Exception(t('Access Denied.'));
    }
}
