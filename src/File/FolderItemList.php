<?php

namespace Concrete\Core\File;

use Closure;
use Concrete\Core\Attribute\Key\FileKey;
use Concrete\Core\Permission\Access\Entity\FileUploaderEntity;
use Concrete\Core\Permission\Checker as Permissions;
use Concrete\Core\Permission\Key\FileFolderKey;
use Concrete\Core\Search\ItemList\Database\AttributedItemList;
use Concrete\Core\Search\ItemList\Pager\Manager\FolderItemListPagerManager;
use Concrete\Core\Search\ItemList\Pager\PagerProviderInterface;
use Concrete\Core\Search\ItemList\Pager\QueryString\VariableFactory;
use Concrete\Core\Search\Pagination\PaginationProviderInterface;
use Concrete\Core\Search\StickyRequest;
use Concrete\Core\Support\Facade\Application;
use Concrete\Core\Tree\Node\Node;
use Concrete\Core\Tree\Node\Type\FileFolder;
use Concrete\Core\User\User;
use Pagerfanta\Adapter\DoctrineDbalAdapter;

class FolderItemList extends AttributedItemList implements PagerProviderInterface, PaginationProviderInterface
{
    protected $parent;
    protected $searchSubFolders = false;
    protected $permissionsChecker;

    protected $autoSortColumns = [
        'name',
        'dateModified',
        'type',
        'size',
        'f.fID',
        'fv.fvFilename',
    ];

    public function __construct()
    {
        $u = Application::getFacadeApplication()->make(User::class);
        if ($u->isSuperUser()) {
            $this->ignorePermissions();
        }
        parent::__construct();
    }

    public function enableSubFolderSearch()
    {
        $this->searchSubFolders = true;
    }

    /**
     * @return mixed
     */
    public function getPermissionsChecker()
    {
        return $this->permissionsChecker;
    }

    public function getPagerVariableFactory()
    {
        return new VariableFactory($this, $this->getSearchRequest());
    }

    public function getPagerManager()
    {
        return new FolderItemListPagerManager($this);
    }

    public function setPermissionsChecker(Closure $checker = null)
    {
        $this->permissionsChecker = $checker;
    }

    public function enablePermissions()
    {
        unset($this->permissionsChecker);
    }

    public function ignorePermissions()
    {
        $this->permissionsChecker = -1;
    }

    public function createQuery()
    {
        $this->query->select('distinct n.treeNodeID')
            ->addSelect('if(nt.treeNodeTypeHandle=\'file\', fv.fvTitle, n.treeNodeName) as name')
            ->addSelect('if(nt.treeNodeTypeHandle=\'file\', fv.fvDateAdded, n.dateModified) as dateModified')
            ->addSelect('case when nt.treeNodeTypeHandle=\'search_preset\' then 1 when nt.treeNodeTypeHandle=\'file_folder\' then 2 else (10 + fvType) end as type')
            ->addSelect('fv.fvSize as size')
            ->from('TreeNodes', 'n')
            ->innerJoin('n', 'TreeNodeTypes', 'nt', 'nt.treeNodeTypeID = n.treeNodeTypeID')
            ->leftJoin('n', 'TreeFileNodes', 'tf', 'tf.treeNodeID = n.treeNodeID')
            ->leftJoin('tf', 'FileVersions', 'fv', 'tf.fID = fv.fID and fv.fvIsApproved = 1')
            ->leftJoin('fv', 'Files', 'f', 'fv.fID = f.fID')
            ->leftJoin('f', 'Users', 'u', 'f.uID = u.uID')
            ->leftJoin('f', 'FileSearchIndexAttributes', 'fsi', 'f.fID = fsi.fID');
    }

    public function getTotalResults()
    {
        if (isset($this->permissionsChecker) && $this->permissionsChecker === -1) {
            $query = $this->deliverQueryObject();

            return $query->resetQueryParts(['groupBy', 'orderBy'])->select('count(distinct n.treeNodeID)')->setMaxResults(1)->execute()->fetchColumn();
        } else {
            return -1; // unknown
        }
    }

    public function getPaginationAdapter()
    {
        $adapter = new DoctrineDbalAdapter($this->deliverQueryObject(), function ($query) {
            $query->resetQueryParts(['groupBy', 'orderBy'])->select('count(distinct n.treeNodeID)')->setMaxResults(1);
        });

        return $adapter;
    }

    public function getResult($queryRow)
    {
        $f = Node::getByID($queryRow['treeNodeID']);
        if (is_object($f) && $this->checkPermissions($f)) {
            return $f;
        }
    }

    public function checkPermissions($mixed)
    {
        if (isset($this->permissionsChecker)) {
            if ($this->permissionsChecker === -1) {
                return true;
            } else {
                return call_user_func_array($this->permissionsChecker, [$mixed]);
            }
        }

        $fp = new Permissions($mixed);

        return $fp->canViewTreeNode();
    }

    public function filterByParentFolder(FileFolder $folder)
    {
        $this->parent = $folder;
    }

    public function filterByType($type)
    {
        $this->query->andWhere('fv.fvType = :fvType');
        $this->query->setParameter('fvType', $type);
    }

    /**
     * Filter the files by their extension.
     *
     * @param string|string[] $extension one or more file extensions (with or without leading dot)
     */
    public function filterByExtension($extension)
    {
        $extensions = is_array($extension) ? $extension : [$extension];
        if (count($extensions) > 0) {
            $expr = $this->query->expr();
            $or = $expr->orX();
            foreach ($extensions as $extension) {
                $extension = ltrim((string) $extension, '.');
                $or->add($expr->eq('fv.fvExtension', $this->query->createNamedParameter($extension)));
                if ($extension === '') {
                    $or->add($expr->isNull('fv.fvExtension'));
                }
            }
            $this->query->andWhere($or);
        }
    }

    /**
     * Filters the file list by file size (in kilobytes).
     *
     * @param int|float $from
     * @param int|float $to
     */
    public function filterBySize($from, $to)
    {
        if ($from > 0) {
            $this->query->andWhere('fv.fvSize >= :fvSizeFrom');
            $this->query->setParameter('fvSizeFrom', $from * 1024);
        }
        if ($to > 0) {
            $this->query->andWhere('fv.fvSize <= :fvSizeTo');
            $this->query->setParameter('fvSizeTo', $to * 1024);
        }
    }


    /**
     * Filters by "keywords" (which searches everything including filenames,
     * title, folder names, etc....
     *
     * @param string $keywords
     */

    public function filterByKeywords($keywords)
    {
        $expressions = [
            $this->query->expr()->like('fv.fvFilename', ':keywords'),
            $this->query->expr()->like('fv.fvDescription', ':keywords'),
            $this->query->expr()->like('treeNodeName', ':keywords'),
            $this->query->expr()->like('fv.fvTags', ':keywords'),
            $this->query->expr()->eq('uName', ':keywords'),
        ];
        $keys = FileKey::getSearchableIndexedList();
        foreach ($keys as $ak) {
            $cnt = $ak->getController();
            $expressions[] = $cnt->searchKeywords($keywords, $this->query);
        }

        $expr = $this->query->expr();
        $this->query->andWhere(call_user_func_array([$expr, 'orX'], $expressions));
        $this->query->setParameter('keywords', '%' . $keywords . '%');

    }

    public function deliverQueryObject()
    {
        if (!isset($this->parent)) {
            $filesystem = new Filesystem();
            $this->parent = $filesystem->getRootFolder();
        }

        if ($this->searchSubFolders) {
            // determine how many subfolders are within the parent folder.
            $subFolders = $this->parent->getHierarchicalNodesOfType('file_folder', 1, false, true);
            $subFolderIds = [];
            foreach ($subFolders as $subFolder) {
                $subFolderIds[] = $subFolder['treeNodeID'];
            }
            $this->query->andWhere(
                $this->query->expr()->in('n.treeNodeParentID', array_map([$this->query->getConnection(), 'quote'], $subFolderIds))
            );
        } else {
            $this->query->andWhere('n.treeNodeParentID = :treeNodeParentID');
            $this->query->setParameter('treeNodeParentID', $this->parent->getTreeNodeID());
        }

        return parent::deliverQueryObject();
    }

    public function finalizeQuery(\Doctrine\DBAL\Query\QueryBuilder $query)
    {
        $u = Application::getFacadeApplication()->make(User::class);
        // Super user can search any files
        if (!$u->isSuperUser()) {
            /** @var FileFolderKey $pk */
            $pk = FileFolderKey::getByHandle('search_file_folder');
            if (is_object($pk)) {
                $pk->setPermissionObject($this->parent);
                /** @var \Concrete\Core\Permission\Access\Access $pa */
                $pa = $pk->getPermissionAccessObject();
                // Check whether or not current user can search files in the current folder
                if (is_object($pa) && $pa->validate()) {
                    // Get all access entities without "File Uploader" entity
                    $accessEntitiesWithoutFileUploader = [];
                    $accessEntities = $u->getUserAccessEntityObjects();
                    foreach ($accessEntities as $accessEntity) {
                        if (!$accessEntity instanceof FileUploaderEntity) {
                            $accessEntitiesWithoutFileUploader[] = $accessEntity;
                        }
                    }
                    /*
                     * For performance reason, if the current user can not search files without "File Uploader" entity,
                     * we filter only files that uploaded by the current user or permission overridden.
                     */
                    if (!$pa->validateAccessEntities($accessEntitiesWithoutFileUploader)) {
                        $query
                            ->leftJoin('tf', 'Files', 'f', 'tf.fID = f.fID')
                            ->andWhere('(f.uID = :fileUploaderID OR f.fOverrideSetPermissions = 1) OR nt.treeNodeTypeHandle != \'file\'')
                            ->setParameter('fileUploaderID', $u->getUserID());
                    }
                }
            }
        }

        return $query;
    }

    public function sortByNodeName()
    {
        $this->sortBy('folderItemName', 'asc');
    }

    public function sortByNodeType()
    {
        $this->sortBy('folderItemType', 'asc');
    }

    protected function getAttributeKeyClassName()
    {
        return '\\Concrete\\Core\\Attribute\\Key\\FileKey';
    }
}
