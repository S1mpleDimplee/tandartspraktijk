<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
$conn = mysqli_connect("localhost", "root", "", "tandartspraktijk");

// Check connection
if (!$conn) {
    die(json_encode(["success" => false, "message" => "Connection failed"]));
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Get the function name from the request
$function = $data['function'] ?? '';

// Route to the appropriate function
switch($function) {
    case 'addUser':
        addUser($data, $conn);
        break;
    
    case 'loginUser':
        loginUser($data, $conn);
        break;
    
    default:
        echo json_encode(["success" => false, "message" => "Function not found"]);
        break;
}

// FUNCTIONS

function addUser($data, $conn) {
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert user into database
    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashedPassword')";
    
    if (mysqli_query($conn, $sql)) {
        echo json_encode([
            "success" => true,
            "message" => "User registered successfully",
            "userId" => mysqli_insert_id($conn)
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Registration failed"
        ]);
    }
}

function loginUser($data, $conn) {
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    // Get user from database
    $sql = "SELECT id, name, email, password FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            echo json_encode([
                "success" => true,
                "message" => "Login successful",
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['name'],
                    "email" => $user['email']
                ]
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Wrong password"
            ]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "User not found"
        ]);
    }
}

mysqli_close($conn);
?>