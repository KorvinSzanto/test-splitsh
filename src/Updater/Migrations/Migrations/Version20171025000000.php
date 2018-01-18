<?php

namespace Concrete\Core\Updater\Migrations\Migrations;

use Concrete\Core\Block\BlockType\BlockType;
use Concrete\Core\Support\Facade\Package;
use Concrete\Core\Updater\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

class Version20171025000000 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        $pkg = Package::getByHandle('document_library');
        if ($pkg) {
            // First, we update the block type record that we have from the document library
            // add-on so that it's using the core code base.
            $this->connection->executeQuery('update BlockTypes set pkgID = 0 where pkgID = ?', [$pkg->getPackageID()]);

            // Now we uninstall the package.
            $pkg->uninstall();
        } else {
            $bt = BlockType::getByHandle('document_library');
            if (!$bt) {
                $bt = BlockType::installBlockType('document_library');

                $multimediaSet = \Concrete\Core\Block\BlockType\Set::getByHandle('multimedia');
                if ($multimediaSet) {
                    $multimediaSet->addBlockType($bt);
                }
            }
        }
    }

    public function down(Schema $schema)
    {
    }
}
