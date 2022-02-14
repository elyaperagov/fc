<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

include('Route.php');

Route::add('/', function () {
  echo 'api';
}, 'get');

Route::add('/send', function () {
  // $ch = curl_init('https://m101.az-studio.net/api/request');
  // curl_setopt($ch, CURLOPT_POST, 1);
  // curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);
  // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  // curl_setopt($ch, CURLOPT_HEADER, false);
  // $result = curl_exec($ch);
  // curl_close($ch);

  $to = "test@gmail.com";
  $subject = "complete form on formal crypto website";
  $message = "Name: " . $_POST['name'] . "\nE-mail: " . $_POST['email'] . "\nMessage: " . $_POST['message'];
  $headers = "From: test@gmail.com";

  mail($to, $subject, $message, $headers);
}, 'post');

// Route::add('/payssionsig', function () {
//   $API_KEY = 'live_8a8e8f269cc20253';
//   $API_SECRET = 'StjSZ5BEdA5pJa9UNdAaz6YgFUVs8C30';

//   $amount = (int)$_POST['amount'] ?? 1;
//   $order_id = $_POST['order_id'] ??  1;

//   $msg = implode('|', [$API_KEY, $amount, 'USD', $order_id, $API_SECRET]);

//   $response = json_encode(['api_sig' => md5($msg), 'amount' => $amount, 'order_id' => $order_id]);

//   echo $response;
// }, 'post');

// Route::add('/foo/([0-9]*)/bar', function ($var) {
// });

Route::run('/api');
