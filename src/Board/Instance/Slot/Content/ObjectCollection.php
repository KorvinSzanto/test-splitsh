<?php
namespace Concrete\Core\Board\Instance\Slot\Content;

use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Normalizer\DenormalizableInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizableInterface;

class ObjectCollection implements \JsonSerializable, DenormalizableInterface
{

    /**
     * @var ArrayCollection
     */
    protected $contentObjects;

    public function __construct()
    {
        $this->contentObjects = new ArrayCollection();
    }

    public function addContentObject(int $slot, ObjectInterface $object)
    {
        $this->contentObjects->set($slot, $object);
    }

    public function getContentObjects()
    {
        return $this->contentObjects->toArray();
    }
    
    public function jsonSerialize()
    {
        return [
            'objects' => $this->getContentObjects()
        ];
    }

    public function denormalize(DenormalizerInterface $denormalizer, $data, $format = null, array $context = [])
    {
        foreach($data['objects'] as $slot => $object) {
            $object = $denormalizer->denormalize($object, $object['class'], 'json', $context);
            $this->addContentObject($slot, $object);
        }
    }

}
