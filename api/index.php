<?php

header('Access-Control-Allow-Origin: *');

//header('Content-Type: application/json; charset=UTF-8');

header("Access-Control-Allow-Methods: POST,DELETE");

header("Access-Control-Max-Age:3600");

header("Access-Control-Allow-Headers:*");

require_once __DIR__ . '/app/bootstrap.php';

Router::$controllerNotFound = function () {
    echo 'page not found';
};

$_ENV['key']= "todoListKeySecurity";
$_ENV['-'] = "--||--";

function random($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}
function verifyUser($token):bool {
    $dataToken = base64_decode($token);
    $dataToken = json_decode($dataToken);
    if(!$dataToken) {
        echo json_encode([
            'status' => 'request de',
            'message' => "token not valid"
        ]);
        return false;
    }

    $checkToken = function() use ($dataToken) {
        $name = $dataToken->name;
        $email = $dataToken->email;
        $id = $name . $_ENV['-']. $email;
        return $id;
    };

    $checkValidToken = DB::crud()
        ->select(
            'signup_todo',
            'email,id_user as id',
            "email='{$dataToken->email}'",
            null,
            "1"
        );

    $count = count($checkValidToken);
    if ($count <= 0) {
        echo json_encode([
            'status' => 'request de',
            'message' => "token not valid"
        ]);
        return false;
    }

    if (!password_verify($checkToken(), $checkValidToken[0]->id)){
        echo json_encode([
            'status' => 'request de',
            'message' => "token not valid"
        ]);
        return false;
    }

    return true;
}
function parseingToken($token):object {
    $dataToken = base64_decode($token);
    $dataToken = json_decode($dataToken);
    return $dataToken;
}

Router::post('/signup', function (){
    sleep(1);
    $data = [
        'name.string' => "required|min:10|max:50",
        'email.email' => "required|min:10|max:50|ex:gmail.com",
        'password.string' => "required|min:10|max:50"
    ];

    $request = Request::CheckInput('POST', $data);

    //check request empty error
    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 'request de',
            'error' => $request->getAllError()
        ]);
        return;
    }

    //check email is not found
    $getEmail = DB::crud()
        ->select(
            'signup_todo',
            'email',
            "email='{$request->value('email')}'",
            null,
            "1"
        );

    $count = count($getEmail);


    if ($count > 0) {
        echo json_encode([
            'status' => 'request de',
            'error' => 'SignUp Failed'
        ]);
        return;
    }


    $hash = function ($value){
        return password_hash($value, PASSWORD_BCRYPT, ['cost' => 13]);
    };
    $passwordHashing = $hash($request->value('password'));
    $id = $request->value('name')."--||--".$request->value('email');
    $idHashing = $hash($id);
    DB::crud()->insert("signup_todo", [
        'id_user'=> $idHashing,
        'name' => $request->value('name'),
        'email' => $request->value('email'),
        'password' => $passwordHashing,
        'ip' => $_SERVER['REMOTE_ADDR']
    ]);
    echo json_encode([
        'status' => 200,
        'token' => base64_encode(json_encode(
            [
                'token' => $idHashing,
                "name" => $request->value('name'),
                "email"=>$request->value('email')
            ]
        )),
        'message' => 'SignUp successfully'
    ]);
});

Router::post('/signin', function (){

    sleep(1);
    $data = [
        'email.email' => "required|min:10|max:50|ex:gmail.com",
        'password.string' => "required|min:10|max:50"
    ];

    $request = Request::CheckInput('POST', $data);

    //check request empty error
    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 'request de',
            'error' => $request->getAllError()
        ]);
        return;
    }

    //check email is not found
    $isLoagin = DB::crud()
        ->select(
            'signup_todo',
            'email, password',
            "email='{$request->value('email')}'",
            null,
            "2"
        );

    $count = count($isLoagin);


    if ($count >= 2 || $count == 0) {
        echo json_encode([
            'status' => 'request de',
            'error' => 'SignUp Failed'
        ]);
        return;
    }


    $checkPassword = password_verify($request->value('password'), $isLoagin[0]->password);
    if (!$checkPassword) {
        echo json_encode([
            'status' => 'request de',
            'error' => 'SignUp Failed'
        ]);
        return;
    }

    $getUser = DB::crud()
        ->select(
            'signup_todo',
            'email, name, id_user as id',
            "email='{$request->value('email')}'",
            null,
            "1"
        )[0];


    echo json_encode([
        'status' => 200,
        'token' => base64_encode(json_encode(
            [
                'token' => $getUser->id,
                "name" => $getUser->name,
                "email"=> $getUser->email
            ]
        )),
        'message' => 'SignUp successfully'
    ]);
});

Router::post('/collections', function() {
    sleep(1);
    $data = [
        'token.string' => "required|min:10"
    ];

    $request = Request::CheckInput('POST', $data);

//    $request->print($request->getRequests());
    //check request empty error
    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 'request de',
            'error' => $request->getAllError()
        ]);
        return;
    }



    if (!verifyUser($request->value('token'))){
        return;
    }


    $tokenParse = parseingToken($request->value('token'));
    $fetchCollection = DB::crud()
        ->select(
            'collections_todo',
            'collection,todos, id_collection as id',
            "id_user='{$tokenParse->token}'",
            null,
            null
        );



    $fetchTodos = DB::crud()
        ->select(
            'todos_todo',
            'todo, status',
            "id_user='{$tokenParse->token}'"
        );

//    $request->print($fetchTodos);

        echo json_encode([
            'status' => 200,
            'data' => $fetchCollection
        ]);



});

Router::post("/addCollections", function (){
    sleep(1);
    $data = [
        'collection.string' => 'required|min:8|max:20',
        'token.string' => "required|min:10"
    ];

    $request = Request::CheckInput('POST', $data);

//    $request->print($request->getRequests());
    //check request empty error
    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 'request de',
            'error' => $request->getAllError()
        ]);
        return;
    }



    if (!verifyUser($request->value('token'))){
        return;
    }


    $tokenParse = parseingToken($request->value('token'));
    $addCollection = DB::crud()->insert('collections_todo',
        [
            'id_user' => $tokenParse->token,
            'id_collection' => random(100),
            'collection' => $request->value('collection')
        ]
    );

    if (!$addCollection){
        echo json_encode([
            'status' => 'request re',
           'message' => 'add collection failed'
        ]);
        return;
    }

    echo json_encode([
        'status'=>200,
        'message'=>'collection added'
    ]);
});

Router::post('/collections/{id}', function ($id){


});





Router::Dispatch();