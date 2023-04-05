<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: aplication/json');


if (isset($_SERVER['token'])) {
  echo json_encode([
    'name' => true
  ]);
}else {

  $inputs = json_decode(file_get_contents("php://input"), true);


  sleep(1);
  echo json_encode([
    'name' => $inputs['name'],
    'email' => $inputs['email'],
    'token' => rand(1000000000, 9999999999999)
  ]);
}
