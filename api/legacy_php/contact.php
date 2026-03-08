<?php
/**
 * Kosova Travel API - Contact Endpoint
 * 
 * POST /api/contact.php → Submit contact form
 */

require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Use POST.']);
    exit();
}

$db = getDB();

try {
    // Get input data (JSON or form-encoded)
    $contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
    
    if (strpos($contentType, 'application/json') !== false) {
        $input = json_decode(file_get_contents('php://input'), true);
    } else {
        $input = $_POST;
    }

    // Extract and sanitize fields
    $name = isset($input['name']) ? trim($input['name']) : '';
    $email = isset($input['email']) ? trim($input['email']) : '';
    $subject = isset($input['subject']) ? trim($input['subject']) : '';
    $message = isset($input['message']) ? trim($input['message']) : '';

    // Validation
    $errors = [];
    if (empty($name)) $errors[] = 'Emri është i detyrueshëm.';
    if (empty($email)) $errors[] = 'Email është i detyrueshëm.';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email nuk është i vlefshëm.';
    if (empty($message)) $errors[] = 'Mesazhi është i detyrueshëm.';

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit();
    }

    // Insert into database
    $stmt = $db->prepare('
        INSERT INTO contacts (name, email, subject, message) 
        VALUES (:name, :email, :subject, :message)
    ');
    $stmt->execute([
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message,
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Faleminderit! Mesazhi juaj u ruajt me sukses.',
        'id' => $db->lastInsertId()
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>
