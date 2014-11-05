<?php
  session_start();
  $logged_in = false;
  $title="Login";
  if(isset($_SESSION['user_Id'])) {
    $logged_in = true;
    $title = "Foyer";
  }
?>
<?php require_once "./_includes/head.php"; ?>
<?php
  if ($logged_in === false) {
    include "./login/index.php";
  }else{
    require_once "./_includes/nav.php";
    include "./foyer/foyer.php";
  }
?>
