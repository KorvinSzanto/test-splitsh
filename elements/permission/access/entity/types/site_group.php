<?php defined('C5_EXECUTE') or die("Access Denied."); ?>
<?php $url = $type->getAccessEntityTypeToolsURL(); ?>

<script type="text/javascript">
    ccm_choosePermissionAccessEntitySiteGroup = function() {
        $.fn.dialog.open({
            title: '<?=t('Choose Site Group')?>',
            href: CCM_DISPATCHER_FILENAME + '/ccm/liberta/dialogs/permission/access/entity/site_group/' + ccm_permissionObjectKeyCategoryHandle + '/' + ccm_permissionObjectID,
            width: 500,
            modal: true,
            height: 350
        });
    }
</script>