<?php

namespace Concrete\Core\Application\UserInterface\Welcome\Modal;

use Concrete\Core\Application\UserInterface\Welcome\Modal\Slide\SlideInterface;
use Concrete\Core\Application\UserInterface\Welcome\Type\TypeInterface;

class Modal implements ModalInterface
{

    /**
     * @var SlideInterface
     */
    protected $slides = [];

    public function __construct($slides = null)
    {
        if (is_array($slides)) {
            $this->slides = $slides;
        } else if ($slides instanceof TypeInterface) {
            $this->slides = $slides->getSlides();
        }
    }

    public function addSlide(SlideInterface $slide)
    {
        $this->slides[] = $slide;
    }

    public function addSlides(array $slides)
    {
        foreach ($slides as $slide) {
            $this->addSlide($slide);
        }
    }

    /**
     * @return SlideInterface[]
     */
    public function getSlides(): array
    {
        return $this->slides;
    }

    public function jsonSerialize()
    {
        return [
            'slides' => $this->getSlides(),
        ];
    }
}
