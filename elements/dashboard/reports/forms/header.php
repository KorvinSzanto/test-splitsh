<?php
defined('C5_EXECUTE') or die("Access Denied.");
?>

<?php if ($exportURL): ?>
    <a class="btn btn-default" href="<?=$exportURL?>"><i class="fa fa-download"></i> <?=t('Export to CSV') ?></a>
<?php endif ?>

<?php if ($supportsLegacy): ?>
    <a href="<?=URL::to('/dashboard/reports/forms/legacy')?>" class="btn btn-default"><?=t('Legacy Forms')?></a>
<?php endif ?>