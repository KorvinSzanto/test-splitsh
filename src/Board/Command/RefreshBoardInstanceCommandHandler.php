<?php

namespace Concrete\Core\Board\Command;

use Concrete\Core\Application\Application;
use Concrete\Core\Block\Block;
use Concrete\Core\Board\Instance\Slot\Content\ObjectCollection;
use Concrete\Core\Foundation\Serializer\JsonSerializer;

class RefreshBoardInstanceCommandHandler
{

    /**
     * @var Application 
     */
    protected $app;
    
    /**
     * @var JsonSerializer 
     */
    protected $serializer;

    public function __construct(Application $app, JsonSerializer $serializer)
    {
        $this->serializer = $serializer;
        $this->app = $app;
    }

    public function handle(RefreshBoardInstanceCommand $command)
    {
        $instance = $command->getInstance();
        $slots = $instance->getSlots();
        foreach($slots as $slot) {
            if ($slot->getBlockID()) {
                $block = Block::getByID($slot->getBlockID());
                if ($block && $block->getBlockTypeHandle() == BLOCK_HANDLE_BOARD_SLOT_PROXY) {
                    $blockController = $block->getController();
                    $contentObjectCollection = $this->serializer->deserialize(
                        $blockController->contentObjectCollection, ObjectCollection::class, 'json', 
                        [
                            'app' => $this->app
                        ]
                    );
                    if ($contentObjectCollection) {
                        $updatedObjectCollection = new ObjectCollection();
                        /**
                         * @var ObjectCollection $contentObjectCollection 
                         */
                        $objects = $contentObjectCollection->getContentObjects();
                        foreach($objects as $contentSlot => $object) {
                            $object->refresh($this->app);
                            $updatedObjectCollection->addContentObject($contentSlot, $object);
                        }

                        $json = $this->serializer->serialize($updatedObjectCollection, 'json');

                        $blockController->save([
                            'slotTemplateID' => $blockController->slotTemplateID,
                            'contentObjectCollection' => $json
                        ]);
                    }
                }
            }            
        }

    }

    
}
