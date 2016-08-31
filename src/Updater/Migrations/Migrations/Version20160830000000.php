<?php
namespace Concrete\Core\Updater\Migrations\Migrations;

use Concrete\Core\Attribute\Category\CategoryInterface;
use Concrete\Core\Attribute\Category\ExpressCategory;
use Concrete\Core\Attribute\Key\Category;
use Concrete\Core\Attribute\Key\CollectionKey;
use Concrete\Core\Attribute\Type;
use Concrete\Core\Backup\ContentImporter;
use Concrete\Core\Block\BlockType\BlockType;
use Concrete\Core\Cache\Cache;
use Concrete\Core\Cache\CacheLocal;
use Concrete\Core\Entity\Attribute\Key\PageKey;
use Concrete\Core\Entity\Attribute\Key\Type\BooleanType;
use Concrete\Core\Entity\Attribute\Key\Type\NumberType;
use Concrete\Core\Entity\Express\Entity;
use Concrete\Core\Express\Attribute\AttributeKeyHandleGenerator;
use Concrete\Core\Express\EntryList;
use Concrete\Core\File\Filesystem;
use Concrete\Core\File\Set\Set;
use Concrete\Core\Job\Job;
use Concrete\Core\Page\Template;
use Concrete\Core\Permission\Access\Access;
use Concrete\Core\Permission\Access\Entity\GroupEntity;
use Concrete\Core\Permission\Access\Entity\UserEntity;
use Concrete\Core\Permission\Key\Key;
use Concrete\Core\Site\Service;
use Concrete\Core\Tree\Node\NodeType;
use Concrete\Core\Tree\Node\Type\File;
use Concrete\Core\Tree\Node\Type\FileFolder;
use Concrete\Core\Tree\TreeType;
use Concrete\Core\Tree\Type\ExpressEntryResults;
use Concrete\Core\User\Group\Group;
use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Concrete\Core\Page\Page;
use Concrete\Core\Page\Single as SinglePage;
use Concrete\Block\ExpressForm\Controller as ExpressFormBlockController;
use Concrete\Core\Support\Facade\Facade;
use Doctrine\ORM\EntityRepository;

class Version20160830000000 extends AbstractMigration
{

    protected function updateExpressEntityAttributeKeyHandles()
    {
        $em = \Database::connection()->getEntityManager();
        foreach($this->getEntities() as $entity) {
            $category = $entity->getAttributeKeyCategory();
            $keys = $category->getList();
            foreach($keys as $key) {
                $key->setAttributeKeyHandle((new AttributeKeyHandleGenerator($category))->generate($key));
                $em->persist($key);
            }
            $em->flush();
        }
    }

    protected function getEntities()
    {
        $em = \Database::connection()->getEntityManager();
        $r = $em->getRepository('Concrete\Core\Entity\Express\Entity');
        $entities = $r->findAll();
        return $entities;
    }

    protected function reindexExpressEntityAttributes()
    {
        $sm = $this->connection->getSchemaManager();
        $tables = $sm->listTables();
        foreach ($tables as $table) {
            $name = $table->getName();
            if (preg_match('/ExpressForm.*ExpressSearchIndexAttributes/', $name)) {
                $this->connection->executeQuery(sprintf('drop table %s', $name));
            }
        }

        foreach($this->getEntities() as $entity) {
            /**
             * @var $category CategoryInterface
             */
            $category = $entity->getAttributeKeyCategory();
            $indexer = $category->getSearchIndexer();
            $indexer->createRepository($category);

            $attributes = $category->getList();
            foreach($attributes as $ak) {
                $indexer->updateRepositoryColumns($category, $ak);
            }
        }
    }

    protected function reindexExpressEntityEntries()
    {
        foreach($this->getEntities() as $entity) {
            $category = $entity->getAttributeKeyCategory();
            $indexer = $category->getSearchIndexer();
            $list = new EntryList($entity);
            $list->ignorePermissions();
            $entries = $list->getResults();

            foreach($entries as $entry) {
                $values = $category->getAttributeValues($entry);
                foreach ($values as $value) {
                    $indexer->indexEntry($category, $value, $entry);
                }
            }
        }
    }


    public function up(Schema $schema)
    {
        $this->updateExpressEntityAttributeKeyHandles();
        $this->reindexExpressEntityAttributes();
        $this->reindexExpressEntityEntries();
    }

    public function down(Schema $schema)
    {
    }
}
