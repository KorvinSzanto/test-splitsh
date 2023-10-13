<?php defined('C5_EXECUTE') or die("Access Denied."); ?>
<!DOCTYPE html>
<html lang="<?php echo Localization::activeLanguage() ?>">
<head>
    <link rel="stylesheet" type="text/css" href="<?=$view->getThemePath()?>/main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">

<?php
$bodyClass = '';
$showLogo = true;
if (isset($c) && is_object($c)) {
    $cp = new Permissions($c);
    if ($cp->canViewToolbar()) {
        $showLogo = false;
    }

    Loader::element('header_required', array('pageTitle' => isset($pageTitle) ? $pageTitle : ''));
    if ($c->getCollectionHandle() === 'login') {
        $bodyClass = 'body-page-login';
    }
} else {
    $this->markHeaderAssetPosition();
    if (isset($pageTitle)) {
        echo '<title>' . h($pageTitle) . '</title>';
        echo '<script>var CCM_DISPATCHER_FILENAME = "' . DIR_REL . '/' . DISPATCHER_FILENAME . '";</script>';
    }
}

$request = Request::getInstance();
$showAccount = false;
if (Core::isInstalled()) {
$site = Core::make("site")->getSite();
$config = $site->getConfigRepository();
    if (is_object($site) && $config->get('user.profiles_enabled')) {
        $account = Page::getByPath('/account');
        if (is_object($account) && !$account->isError()) {
            $cp = new Permissions($account);
            if ($cp->canRead()) {
                if ($request->matches('/account*')) {
                    $showAccount = true;
                    $bodyClass = 'body-page-account';
                }
            }
        }
    }
}

if ($request->matches('/login*') || $request->matches('/oauth/*')) {
    $bodyClass = 'body-page-login';
}

?>
</head>
<body class="min-vh-100<?php if ($bodyClass !== '') { ?> <?=$bodyClass?><?php } ?>">

<div class="ccm-ui min-vh-100">
