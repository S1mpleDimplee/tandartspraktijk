<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
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
    die(json_encode(["success" => false, "message" => "Connection failed: " . mysqli_connect_error()]));
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);

// Get the function name from the request
$function = isset($data['function']) ? $data['function'] : '';

// Route to the appropriate function
switch($function) {
    case 'addUser':
        addUser($data, $conn);
        break;
    
    case 'loginUser':
        loginUser($data, $conn);
        break;
    
    case 'checkEmail':
        checkEmail($data, $conn);
        break;
    
    case 'updateUser':
        updateUser($data, $conn);
        break;
    
    case 'deleteUser':
        deleteUser($data, $conn);
        break;
    
    default:
        echo json_encode(["success" => false, "message" => "Function not found"]);
        break;
}

// FUNCTIONS

function addUser($data, $conn) {
    // Extract user data
    $name = isset($data['name']) ? mysqli_real_escape_string($conn, $data['name']) : '';
    $email = isset($data['email']) ? mysqli_real_escape_string($conn, $data['email']) : '';
    $password = isset($data['password']) ? $data['password'] : '';
    
    // Validate input
    if (empty($name) || empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Alle velden zijn verplicht"]);
        return;
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Ongeldig email formaat"]);
        return;
    }
    
    // Check if user already exists
    $checkSql = "SELECT id FROM users WHERE email = '$email'";
    $checkResult = mysqli_query($conn, $checkSql);
    
    if (mysqli_num_rows($checkResult) > 0) {
        echo json_encode(["success" => false, "message" => "Email adres is al in gebruik"]);
        return;
    }
    
    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$hashedPassword')";
    
    if (mysqli_query($conn, $sql)) {
        echo json_encode([
            "success" => true, 
            "message" => "Registratie succesvol",
            "user" => [
                "id" => mysqli_insert_id($conn),
                "name" => $name,
                "email" => $email
            ]
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Registratie mislukt: " . mysqli_error($conn)]);
    }
}

function loginUser($data, $conn) {
    $email = isset($data['email']) ? mysqli_real_escape_string($conn, $data['email']) : '';
    $password = isset($data['password']) ? $data['password'] : '';
    
    // Validate input
    if (empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Email en wachtwoord zijn verplicht"]);
        return;
    }
    
    // Check if user exists
    $sql = "SELECT id, name, email, password FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);
    
    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Login successful
            echo json_encode([
                "success" => true, 
                "message" => "Login succesvol",
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['name'],
                    "email" => $user['email']
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Onjuist wachtwoord"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Gebruiker niet gevonden"]);
    }
}

function checkEmail($data, $conn) {
    $email = isset($data['email']) ? mysqli_real_escape_string($conn, $data['email']) : '';
    
    if (empty($email)) {
        echo json_encode(["success" => false, "message" => "Email is verplicht"]);
        return;
    }
    
    $sql = "SELECT id FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["success" => false, "available" => false, "message" => "Email is al in gebruik"]);
    } else {
        echo json_encode(["success" => true, "available" => true, "message" => "Email is beschikbaar"]);
    }
}

function updateUser($data, $conn) {
    $userId = isset($data['userId']) ? mysqli_real_escape_string($conn, $data['userId']) : '';
    $name = isset($data['name']) ? mysqli_real_escape_string($conn, $data['name']) : '';
    $email = isset($data['email']) ? mysqli_real_escape_string($conn, $data['email']) : '';
    
    if (empty($userId)) {
        echo json_encode(["success" => false, "message" => "User ID is verplicht"]);
        return;
    }
    
    $updates = [];
    if (!empty($name)) {
        $updates[] = "name = '$name'";
    }
    if (!empty($email)) {
        $updates[] = "email = '$email'";
    }
    
    if (empty($updates)) {
        echo json_encode(["success" => false, "message" => "Geen updates opgegeven"]);
        return;
    }
    
    $sql = "UPDATE users SET " . implode(', ', $updates) . " WHERE id = '$userId'";
    
    if (mysqli_query($conn, $sql)) {
        echo json_encode(["success" => true, "message" => "Gebruiker succesvol bijgewerkt"]);
    } else {
        echo json_encode(["success" => false, "message" => "Update mislukt: " . mysqli_error($conn)]);
    }
}

function deleteUser($data, $conn) {
    $userId = isset($data['userId']) ? mysqli_real_escape_string($conn, $data['userId']) : '';
    
    if (empty($userId)) {
        echo json_encode(["success" => false, "message" => "User ID is verplicht"]);
        return;
    }
    
    $sql = "DELETE FROM users WHERE id = '$userId'";
    
    if (mysqli_query($conn, $sql)) {
        echo json_encode(["success" => true, "message" => "Gebruiker succesvol verwijderd"]);
    } else {
        echo json_encode(["success" => false, "message" => "Verwijderen mislukt: " . mysqli_error($conn)]);
    }
}

mysqli_close($conn);
?>