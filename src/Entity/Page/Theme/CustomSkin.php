<?php
namespace Concrete\Core\Entity\Page\Theme;

use Concrete\Core\StyleCustomizer\Skin\SkinInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(
 *     name="PageThemeCustomSkins"
 * )
 */
class CustomSkin implements \JsonSerializable, SkinInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    protected $skinID;

    /**
     * @ORM\Column(type="string")
     */
    protected $skinIdentifier = '';

    /**
     * @ORM\Column(type="integer", options={"unsigned": true})
     */
    protected $pThemeID;

    /**
     * @ORM\Column(type="string")
     * @ORM\OrderBy({"skinName" = "ASC"})
     */
    protected $skinName = '';

    /**
     * @ORM\Column(type="string")
     */
    protected $presetSkinStartingPoint = '';

    /**
     * @ORM\ManyToOne(targetEntity="\Concrete\Core\Entity\User\User")
     * @ORM\JoinColumn(name="uID", referencedColumnName="uID")
     */
    protected $author;

    /**
     * @ORM\Column(type="integer", options={"unsigned": true})
     */
    protected $dateCreated;

    /**
     * @ORM\Column(type="integer", options={"unsigned": true})
     */
    protected $dateUpdated;

    /**
     * @ORM\Column(type="json")
     */
    protected $variableCollection;

    /**
     * @return mixed
     */
    public function getSkinID()
    {
        return $this->skinID;
    }

    /**
     * @param mixed $skinID
     */
    public function setSkinID($skinID): void
    {
        $this->skinID = $skinID;
    }

    /**
     * @return string
     */
    public function getSkinIdentifier(): string
    {
        return $this->skinIdentifier;
    }

    /**
     * @param string $skinIdentifier
     */
    public function setSkinIdentifier(string $skinIdentifier): void
    {
        $this->skinIdentifier = $skinIdentifier;
    }

    /**
     * @return string
     */
    public function getSkinName(): string
    {
        return $this->skinName;
    }

    /**
     * @param string $skinName
     */
    public function setSkinName(string $skinName): void
    {
        $this->skinName = $skinName;
    }

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param mixed $author
     */
    public function setAuthor($author): void
    {
        $this->author = $author;
    }

    /**
     * @return mixed
     */
    public function getDateCreated()
    {
        return $this->dateCreated;
    }

    /**
     * @param mixed $dateCreated
     */
    public function setDateCreated($dateCreated): void
    {
        $this->dateCreated = $dateCreated;
    }

    /**
     * @return mixed
     */
    public function getDateUpdated()
    {
        return $this->dateUpdated;
    }

    /**
     * @param mixed $dateUpdated
     */
    public function setDateUpdated($dateUpdated): void
    {
        $this->dateUpdated = $dateUpdated;
    }

    /**
     * @return mixed
     */
    public function getVariableCollection()
    {
        return $this->variableCollection;
    }

    /**
     * @param mixed $variableCollection
     */
    public function setVariableCollection($variableCollection): void
    {
        $this->variableCollection = $variableCollection;
    }

    /**
     * @return mixed
     */
    public function getThemeID()
    {
        return $this->pThemeID;
    }

    /**
     * @param mixed $pThemeID
     */
    public function setThemeID($pThemeID): void
    {
        $this->pThemeID = $pThemeID;
    }

    public function jsonSerialize()
    {
        return [
            'skinID' => $this->getSkinID(),
            'skinIdentifier' => $this->getSkinIdentifier(),
            'skinName' => $this->getSkinName(),
        ];
    }

    public function getIdentifier(): string
    {
        return $this->getSkinIdentifier();
    }

    public function getName(): string
    {
        return $this->getSkinName();
    }

    /**
     * @return string
     */
    public function getPresetSkinStartingPoint(): string
    {
        return $this->presetSkinStartingPoint;
    }

    /**
     * @param string $presetSkinStartingPoint
     */
    public function setPresetSkinStartingPoint(string $presetSkinStartingPoint): void
    {
        $this->presetSkinStartingPoint = $presetSkinStartingPoint;
    }


}
