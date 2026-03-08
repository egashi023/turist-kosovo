<?php
/**
 * Kosova Travel API - Authentication Endpoint
 * 
 * POST /api/auth.php?action=register  → Register new user
 * POST /api/auth.php?action=login     → Login
 * GET  /api/auth.php?action=me        → Get current user
 * POST /api/auth.php?action=logout    → Logout
 */

require_once __DIR__ . '/../config.php';

session_start();

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'register':
        handleRegister();
        break;
    case 'login':
        handleLogin();
        break;
    case 'me':
        handleMe();
        break;
    case 'logout':
        handleLogout();
        break;
    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid action. Use: register, login, me, logout']);
}

function handleRegister() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Use POST method']);
        return;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $name = isset($input['name']) ? trim($input['name']) : '';
    $email = isset($input['email']) ? trim($input['email']) : '';
    $password = isset($input['password']) ? $input['password'] : '';
    $confirmPassword = isset($input['confirmPassword']) ? $input['confirmPassword'] : '';

    // Validation
    $errors = [];
    if (empty($name)) $errors[] = 'Emri është i detyrueshëm.';
    if (empty($email)) $errors[] = 'Email është i detyrueshëm.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email nuk është i vlefshëm.';
    if (strlen($password) < 6) $errors[] = 'Fjalëkalimi duhet të ketë së paku 6 karaktere.';
    if ($password !== $confirmPassword) $errors[] = 'Fjalëkalimet nuk përputhen.';

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => $errors]);
        return;
    }

    $db = getDB();

    // Check if email exists
    $stmt = $db->prepare('SELECT id FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => ['Ky email është i regjistruar tashmë.']]);
        return;
    }

    // Create user
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $db->prepare('INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :hash)');
    $stmt->execute(['name' => $name, 'email' => $email, 'hash' => $hash]);

    echo json_encode(['success' => true, 'message' => 'Regjistrimi u krye me sukses!']);
}

function handleLogin() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Use POST method']);
        return;
    }

    $input = json_decode(file_get_contents('php://input'), true);
    $email = isset($input['email']) ? trim($input['email']) : '';
    $password = isset($input['password']) ? $input['password'] : '';

    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => ['Email dhe fjalëkalimi janë të detyrueshëm.']]);
        return;
    }

    $db = getDB();
    $stmt = $db->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'errors' => ['Email ose fjalëkalimi nuk është i saktë.']]);
        return;
    }

    // Set session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['user_email'] = $user['email'];

    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email']
        ]
    ]);
}

function handleMe() {
    if (isset($_SESSION['user_id'])) {
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $_SESSION['user_id'],
                'name' => $_SESSION['user_name'],
                'email' => $_SESSION['user_email']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Not authenticated']);
    }
}

function handleLogout() {
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Logged out']);
}
?>
