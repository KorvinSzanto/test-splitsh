<?php
namespace Concrete\Controller\SinglePage\Dashboard\System\Files;

use Concrete\Core\File\Image\Thumbnail\Type\Type;
use Concrete\Core\Page\Controller\DashboardPageController;
use Loader;
use Request;

class Thumbnails extends DashboardPageController
{
    public function view()
    {
        $list = Type::getList();
        $this->set('types', $list);

    }

    public function edit($ftTypeID = false)
    {
        $type = Type::getByID($ftTypeID);
        $this->set('type', $type);

        $this->get_sizing_values();
    }

    public function add()
    {
        $this->get_sizing_values();
    }

    public function get_sizing_values()
    {
        $sizingModes = array(
            Type::getSizingOptions()[0] => 'Resize Proportionally',
            Type::getSizingOptions()[1] => 'Resize and Crop to the Exact Size',
            Type::getSizingOptions()[2] => 'Crop only',
        );
        $this->set('sizingModes', $sizingModes);

        $sizingModeHelp = array(
            Type::getSizingOptions()[0] => t("The original image will be scaled down so it is fully contained within the thumbnail dimensions. The specified width and height will be considered maximum limits. Unless the given dimensions are equal to the original image's aspect ratio, one dimension in the resulting thumbnail will be smaller than the given limit."),
            Type::getSizingOptions()[1] => t("The thumbnail will be scaled so that its smallest side will equal the length of the corresponding side in the original image. Any excess outside of the scaled thumbnail's area will be cropped, and the returned thumbnail will have the exact width and height specified. Both width and height mst be specified."),
            Type::getSizingOptions()[2] => t("The original image will be cropped without resizing it first. If the width or height specified are greater than the orignal image's, that dimension will be ignored."),
        );
        $this->set('sizingModeHelp', $sizingModeHelp);

        $this->set('ftTypeSizingMode', Type::getSizingOptions()[3]);

    }

    public function thumbnail_type_added()
    {
        $this->set('success', t('Thumbnail type added.'));
        $this->view();
    }

    public function thumbnail_type_updated()
    {
        $this->set('success', t('Thumbnail type updated.'));
        $this->view();
    }

    protected function validateThumbnailRequest()
    {
        $request = \Request::getInstance();
        $valStrings = Loader::helper('validation/strings');
        $valNumbers = Loader::helper('validation/numbers');

        if (!$valStrings->notempty($request->request->get('ftTypeName'))) {
            $this->error->add(t("Your thumbnail type must have a name."));
        }

        if (!$valStrings->handle($request->request->get('ftTypeHandle'))) {
            $this->error->add(t("Your thumbnail type handle must only contain lowercase letters and underscores."));
        }

        $width = intval($request->request->get('ftTypeWidth'));
        $height = intval($request->request->get('ftTypeHeight'));
        if ($width < 1 && $height < 1) {
            $this->error->add(t("Width and height can't both be empty or less than zero."));
        }

        if ($request->request->get('ftTypeSizingMode') === Type::getSizingOptions()[1] && ($width < 1 || $height < 1)) {
            $this->error->add(t("With the 'Exact' sizing mode (with cropping), both width and height must be specified and greater than zero."));
        }

        if ($valStrings->notempty($request->request->get('ftTypeWidth'))) {
            if (!$valNumbers->integer($request->request->get('ftTypeWidth'))) {
                $this->error->add(t("If used, width can only be an integer, with no units."));
            } else {
                if ($width < 1) {
                    $this->error->add(t("If used, width must be greater than zero."));
                }
            }

        }

        if ($valStrings->notempty($request->request->get('ftTypeHeight'))) {
            if (!$valNumbers->integer($request->request->get('ftTypeHeight'))) {
                $this->error->add(t("If used, height can only be an integer, with no units."));
            } else {
                if ($height < 1) {
                    $this->error->add(t("If used, height must be greater than zero."));
                }
            }

        }

        return $request;
    }

    public function thumbnail_type_deleted()
    {
        $this->set('message', t('Thumbnail type removed.'));
        $this->view();
    }

    public function delete()
    {
        $request = \Request::getInstance();

        if (!Loader::helper('validation/token')->validate('delete')) {
            $this->error->add(Loader::helper('validation/token')->getErrorMessage());
        }
        $type = Type::getByID($request->request->get('ftTypeID'));
        if (!is_object($type)) {
            $this->error->add(t('Invalid thumbnail type object.'));
        }
        if ($type->isRequired()) {
            $this->error->add(t('You may not delete a required thumbnail type.'));
        }

        if (!$this->error->has()) {
            $type->delete();
            $this->redirect('/dashboard/system/files/thumbnails', 'thumbnail_type_deleted');
        }
        $this->edit($request->request->get('ftTypeID'));
    }

    public function update()
    {
        $request = $this->validateThumbnailRequest();

        $type = Type::getByID($request->request->get('ftTypeID'));
        if (!Loader::helper('validation/token')->validate('update')) {
            $this->error->add(Loader::helper('validation/token')->getErrorMessage());
        }
        if (!is_object($type)) {
            $this->error->add(t('Invalid thumbnail type object.'));
        }
        if (!$this->error->has()) {
            
            $height = intval($request->request->get('ftTypeHeight'));
            $width = intval($request->request->get('ftTypeWidth'));
            if ($height > 0) {
                $type->setHeight($request->request->get('ftTypeHeight'));
            } else {
                $type->setHeight(null);
            }
            if ($width > 0) {
                $type->setWidth($request->request->get('ftTypeWidth'));
            } else {
                $type->setWidth(null);
            }
            $type->setName($request->request->get('ftTypeName'));
            $type->setHandle($request->request->get('ftTypeHandle'));
            $type->setSizingMode($request->request->get('ftTypeSizingMode'));
            $type->save();
            $this->redirect('/dashboard/system/files/thumbnails', 'thumbnail_type_updated');
        }

        $this->edit($request->request->get('ftTypeID'));
    }

    public function do_add()
    {
        $request = $this->validateThumbnailRequest();
        if (!Loader::helper('validation/token')->validate('do_add')) {
            $this->error->add(Loader::helper('validation/token')->getErrorMessage());
        }
        $thumbtype = Type::getByHandle($request->request->get('ftTypeHandle'));
        if(is_object($thumbtype)){
            $this->error->add(t('That handle is in use.'));
        }
        if (!$this->error->has()) {
            $type = new \Concrete\Core\Entity\File\Image\Thumbnail\Type\Type();
            $height = intval($request->request->get('ftTypeHeight'));
            $width = intval($request->request->get('ftTypeWidth'));
            if ($height > 0) {
                $type->setHeight($request->request->get('ftTypeHeight'));
            }
            if ($width > 0) {
                $type->setWidth($request->request->get('ftTypeWidth'));
            }
            
            $type->setName($request->request->get('ftTypeName'));
            $type->setHandle($request->request->get('ftTypeHandle'));
            $type->setSizingMode($request->request->get('ftTypeSizingMode'));
            $type->save();
            $this->redirect('/dashboard/system/files/thumbnails', 'thumbnail_type_added');
        }

        $this->set('type', $type);
        $this->get_sizing_values();
    }
}
