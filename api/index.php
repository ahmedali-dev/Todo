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

$_ENV['key'] = "todoListKeySecurity";
$_ENV['-'] = "--||--";
$_ENV['hashing'] = function ($value) {
    return password_hash($value, PASSWORD_BCRYPT, ['cost' => 13]);
};

function random($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}

function verifyUser($token): bool
{
    $dataToken = base64_decode($token);
    $dataToken = json_decode($dataToken);
    if (!$dataToken) {
        echo json_encode([
            'status' => 'request de',
            'message' => "token not valid"
        ]);
        return false;
    }

    $checkToken = function () use ($dataToken) {
        $name = $dataToken->name;
        $email = $dataToken->email;
        $id = $name . $_ENV['-'] . $email;
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

//    var_dump($checkValidToken);
    $count = count($checkValidToken);
    if ($count == 0) {
        echo json_encode([
            'status' => 'request de',
            'message' => "token not valid"
        ]);
        return false;
    }

    if (!password_verify($checkToken(), $checkValidToken[0]->id)) {
        echo json_encode([
            'status' => 'request de',
            'message' => "token not valid"
        ]);
        return false;
    }

    return true;
}

function parseingToken($token): object
{
    $dataToken = base64_decode($token);
    $dataToken = json_decode($dataToken);
    return $dataToken;
}

Router::post('/signup', function () {
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


    $hash = function ($value) {
        return password_hash($value, PASSWORD_BCRYPT, ['cost' => 13]);
    };
    $passwordHashing = $hash($request->value('password'));
    $id = $request->value('name') . "--||--" . $request->value('email');
    $idHashing = $hash($id);
    DB::crud()->insert("signup_todo", [
        'id_user' => $idHashing,
        'name' => $request->value('name'),
        'email' => $request->value('email'),
        'password' => $passwordHashing,
        'ip' => $_SERVER['REMOTE_ADDR']
    ]);
    echo json_encode([
        'status' => 200,
        'userImage' => 'image/av.png',
        'token' => base64_encode(json_encode(
            [
                'token' => $idHashing,
                "name" => $request->value('name'),
                "email" => $request->value('email')
            ]
        )),
        'message' => 'SignUp successfully'
    ]);
});

Router::post('/signin', function () {

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
            'email,image, name, id_user as id',
            "email='{$request->value('email')}'",
            null,
            "1"
        )[0];


    echo json_encode([
        'status' => 200,
        'userImage' => 'image/' . $getUser->image,
        'token' => base64_encode(json_encode(
            [
                'token' => $getUser->id,
                "name" => $getUser->name,
                "email" => $getUser->email
            ]
        )),
        'message' => 'SignUp successfully'
    ]);
});

Router::post('/collections', function () {
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


    if (!verifyUser($request->value('token'))) {
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

Router::post("/addCollections", function () {
    sleep(1);
    $data = [
        'collection.string' => 'required|min:3|max:20',
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


    if (!verifyUser($request->value('token'))) {
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

    if (!$addCollection) {
        echo json_encode([
            'status' => 'request re',
            'message' => 'add collection failed'
        ]);
        return;
    }

    echo json_encode([
        'status' => 200,
        'message' => 'collection added'
    ]);
});

Router::post('/collections/{id}', function ($id) {
    sleep(1);
    $data = [
        'token.string' => "required|min:10"
    ];

    $request = Request::CheckInput('POST', $data);


    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 'request de',
            'error' => $request->getAllError()
        ]);
        return;
    }


    if (!verifyUser($request->value('token'))) {
        return;
    }


    $tokenParse = parseingToken($request->value('token'));
    $getTodos = DB::crud()
        ->select(
            'collections_todo',
            'todos, collection',
            'id_collection="' . $id . '" and id_user="' . $tokenParse->token . '"'
        );

    $count = count($getTodos);
    if ($count > 1) {
        echo json_encode([
            'status' => 'request de',
            'message' => "something wrong"
        ]);
        return;
    }


    echo json_encode([
        'status' => 200,
        'data' => [
            'collection' => $getTodos[0]->collection,
            'item' => json_decode($getTodos[0]->todos, true)
        ]
    ]);

});

Router::post('/collections/{id}/add', function ($id) {
//    sleep(1);
    $data = [
        'todo.string' => 'required|min:3|max:50',
        'token.string' => "required|min:10"
    ];

    $request = Request::CheckInput('POST', $data);


//    $request->print($request->value('todo'));
    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 'request de',
            'error' => $request->getAllError()
        ]);
        return;
    }


    if (!verifyUser($request->value('token'))) {
        return;
    }


    $tokenParse = parseingToken($request->value('token'));
    $getTodos = DB::crud()
        ->select(
            'collections_todo',
            'todos, collection',
            'id_collection="' . $id . '" and id_user="' . $tokenParse->token . '"'
        );

    $count = count($getTodos);
    if ($count > 1) {
        echo json_encode([
            'status' => 'request de',
            'message' => "something wrong"
        ]);
        return;
    }

    $todos = json_decode($getTodos[0]->todos, true);
    $todo = [
        'id' => random(32),
        'task' => $request->value('todo'),
        'status' => false
    ];
    $todos[] = $todo;

    $update = DB::crud()->update('collections_todo', ['todos' => json_encode($todos)], 'id_collection="' . $id . '" and id_user="' . $tokenParse->token . '"');

    if ($update) {
        echo json_encode([
            'status' => 200,
            'message' => 'task added'
        ]);
    }

});

Router::post('/collections/{id}/update', function ($id) {
    $data = [
        'todoId.string' => 'required|min:8|max:50',
        'token.string' => "required|min:10"
    ];

    $request = Request::CheckInput('POST', $data);


    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 'request de',
            'error' => $request->getAllError()
        ]);
        return;
    }


    if (!verifyUser($request->value('token'))) {
        return;
    }


    $tokenParse = parseingToken($request->value('token'));
    $getTodos = DB::crud()
        ->select(
            'collections_todo',
            'todos, collection',
            'id_collection="' . $id . '" and id_user="' . $tokenParse->token . '"'
        );

    $count = count($getTodos);
    if ($count > 1) {
        echo json_encode([
            'status' => 'request de',
            'message' => "something wrong"
        ]);
        return;
    }

    $todos = json_decode($getTodos[0]->todos, true);
    $status = false;
    if (isset($todos)) {
    }
    foreach ($todos as $todo => $value) {
        if ($value['id'] === $request->value('todoId')) {
            $status = true;
            $todos[$todo]['status'] = !$value['status'];
        }
    }

    if (!$status) {
        echo json_encode([
            'status' => 'request de',
            'message' => "something wrong"
        ]);
        return;
    }

    $update = DB::crud()->update('collections_todo', ['todos' => json_encode($todos)], 'id_collection="' . $id . '" and id_user="' . $tokenParse->token . '"');

    if ($update) {
        echo json_encode([
            'status' => 200,
            'message' => 'task added'
        ]);
    }
});

Router::post('/account', function () {
    $data = [
        'token.string' => "required|min:10"
    ];

    $request = Request::CheckInput('POST', $data);


    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 'request de',
            'error' => $request->getAllError()
        ]);
        return;
    }


    if (!verifyUser($request->value('token'))) {
        return;
    }


    $tokenParse = parseingToken($request->value('token'));
    $getUser = DB::crud()
        ->select(
            'signup_todo',
            'name,email,image',
            "id_user='$tokenParse->token'",
            null,
            '1'
        );

    $count = count((array)$getUser);
    if ($count > 1) {
        echo json_encode([
            'status' => 'request de',
            'message' => "something wrong"
        ]);
        return;
    }
    $getUser = $getUser[0];
    echo json_encode([
        'status' => 200,
        'data' => [
            "userImage" => "image/{$getUser->image}",
            "name" => $getUser->name,
            "email" => $getUser->email
        ]
    ]);

});

Router::post('/account/update', function () {
    $data = [
        'token.string' => "required|min:10",
        'name.string' => 'required|min:8|max:50',
        'email.email' => 'required|min:8|max:50|ex:gmail.com'
    ];



    $request = Request::CheckInput('POST', $data);
    $fileRequest = Request::CheckFiles("POST", [
        'image' => "required|min:0.5|max:5|ex:png,jpg"
    ]);

//    $request->print($request->getRequests());


    if ($request->getAllError() !== true) {
        echo json_encode([
            'status' => 'request de',
            'error' => [$request->getAllError()]
        ]);
        return;
    }
//
    if ($fileRequest->getAllError() !== true) {
        echo json_encode([
            'status' => 'request de',
            'error' => [$fileRequest->getAllError()]
        ]);
        return;
    }


    if (!verifyUser($request->value('token'))) {
        return;
    }


    $tokenParse = parseingToken($request->value('token'));


    $imageValue = $fileRequest->value('image');


    if (!is_string($imageValue['name'])) {
        echo json_encode(['status' => 'request rejected', 'message' => 'image not valid please check and try again']);
        return;
    }

    $getUser = DB::crud()
        ->select(
            'signup_todo',
            'name,email,image',
            "id_user='$tokenParse->token'",
            null,
            '1'
        );

    $count = count((array)$getUser);
    if ($count > 1 || $count == 0) {
        echo json_encode([
            'status' => 'request de',
            'message' => "something wrong"
        ]);
        return;
    }
    $getUser = $getUser[0];

    $name = $request->value('name') == $getUser->name;
    $email = $request->value('email') == $getUser->email;
    $image = $getUser->image == $imageValue['name'];
    $imageName = $getUser->image;
    if (!$name || !$email || !$image) {


        if (!$image) {
            if ($imageName !== 'av.png') {
                unlink(__DIR__ . '/image/' . $imageName);
            }

            $imageExtension = explode('.', $imageValue['name']);
            $imageName = random(32) . "." . end($imageExtension);
            $fullimagename = __DIR__ . '/image/' . $imageName;
            if (!move_uploaded_file($imageValue['tmp_name'], $fullimagename)) {
                echo json_encode([
                    'status'=>'request rejected',
                    'message' => 'uploading file error'
                ]);
                return;
            }

        }

        if (!$email) {
            $checkEmail = $request->value('email');
            $getUser = DB::crud()
                ->select(
                    'signup_todo',
                    'email',
                    "email='{$checkEmail}'",
                    null,
                    '1'
                );

            $count = count((array)$getUser);
            if ($count >= 1) {
                echo json_encode([
                    'status' => 'request de',
                    'message' => "something wrong"
                ]);
                return;
            }
//            return;
        }

        $id = $request->value('name') . "--||--" . $request->value('email');
        $idHashing = $_ENV['hashing']($id);
        $updateUser = DB::crud()->update(
            'signup_todo',
            [
                'image' => $imageName,
                'id_user' => $idHashing,
                'name' => $request->value('name'),
                "email" => $request->value('email'),

            ], 'id_user="' . $tokenParse->token . '"');

        if (!$updateUser) {
            echo json_encode(['status' => 'request rejacted']);
            return;
        }

        echo json_encode([
            'status' => 200,
            'userImage' => 'image/' . $imageName,
            'token' => base64_encode(json_encode(
                [
                    'token' => $idHashing,
                    "name" => $request->value('name'),
                    "email" => $request->value('email')
                ]
            )),
            'message' => 'update successfully'
        ]);

//        $id = $request->value('name') . "--||--" . $request->value('email');
//        $idHashing = $_ENV['hashing']($id);
//        $updateUser = DB::crud()->update(
//            'signup_todo',
//            [
//                'id_user' => $idHashing,
//                'name' => $request->value('name'),
//                'email' => $request->value('email')
//            ]);
//
//        echo json_encode([
//            'status' => 200,
//            'userImage' => 'image/av.png',
//            'token' => base64_encode(json_encode(
//                [
//                    'token' => $idHashing,
//                    "name" => $request->value('name'),
//                    "email" => $request->value('email')
//                ]
//            )),
//            'message' => 'update successfully'
//        ]);

        return;
    }

    echo json_encode([
        'status' => 200,
        'message' => 'normal'
    ]);
//    $updateUser = DB::crud()->update(
//        'signup_todo',
//        [
//            'name' => $request->value('name'),
//            'email' => $request->value('email'),
//        ]
//    );
});


Router::Dispatch();