<?php

defined('C5_EXECUTE') or die("Access Denied.");

/**
 * @var $router \Concrete\Core\Routing\Router
 * @var $app \Concrete\Core\Application\Application
 */

use Concrete\Core\Application\UserInterface\Sitemap\StandardSitemapProvider;

$router->get('/site/trees', function() use ($app) {
    $provider = $app->make(StandardSitemapProvider::class);
    $collection = $provider->getTreeCollection();
    return $collection;
});

