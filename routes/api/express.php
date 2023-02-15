<?php

defined('C5_EXECUTE') or die('Access Denied.');

/**
 * @var Concrete\Core\Application\Application $app
 * @var Concrete\Core\Routing\Router $router
 */

try {
    $objects = Express::getEntities();
} catch (\Exception $e) {
    // Note - this might happen if proxies need to be rebuilt and this is the cleanest way to do it, although
    // not ideal.
    $objects = [];
}

foreach ($objects as $object) {

    $router->get('/' . $object->getPluralHandle(), '\Concrete\Core\Api\Controller\Express::listItems')
        ->setScopes($object->getPluralHandle() . ':read')
        ->setDefaults(['objectHandle' => $object->getHandle()])
    ;

    $router->post('/' . $object->getPluralHandle(), '\Concrete\Core\Api\Controller\Express::add')
        ->setScopes($object->getPluralHandle() . ':add')
        ->setDefaults(['objectHandle' => $object->getHandle()])
    ;


    $router->get('/' . $object->getPluralHandle() . '/{entryID}', '\Concrete\Core\Api\Controller\Express::read')
        ->setScopes($object->getPluralHandle() . ':read')
        ->setDefaults(['objectHandle' => $object->getHandle()])
    ;

    $router->put('/' . $object->getPluralHandle() . '/{entryID}', '\Concrete\Core\Api\Controller\Express::update')
        ->setScopes($object->getPluralHandle() . ':update')
        ->setDefaults(['objectHandle' => $object->getHandle()])
    ;


    $router->delete('/' . $object->getPluralHandle() . '/{entryID}', '\Concrete\Core\Api\Controller\Express::delete')
        ->setScopes($object->getPluralHandle() . ':delete')
        ->setDefaults(['objectHandle' => $object->getHandle()])
    ;



}