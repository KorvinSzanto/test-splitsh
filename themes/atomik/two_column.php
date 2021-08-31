<?php
defined('C5_EXECUTE') or die("Access Denied.");
use Concrete\Core\Area\Area;
$view->inc('elements/header.php');
?>

<?php
$a = new Area('Header');
$a->enableGridContainer();
$a->display($c);
?>

<div class="container">
    <div class="row">
        <div class="col-md-6">
        <?php
            $a = new Area('Main Left');
            $a->display($c);
        ?>
        </div>
        <div class="col-md-6">
            <?php
            $a = new Area('Main Right');
            $a->display($c);
            ?>
        </div>
    </div>
</div>

<?php
$view->inc('elements/footer.php');