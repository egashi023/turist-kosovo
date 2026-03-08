<?php
/**
 * Kosova Travel API - Photos Endpoint
 * 
 * GET  /api/photos.php            → All user photos
 * GET  /api/photos.php?user=me    → Current user's photos
 * POST /api/photos.php            → Upload a photo (requires auth)
 */

require_once __DIR__ . '/../config.php';

session_start();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    handleGetPhotos();
} elseif ($method === 'POST') {
    handleUploadPhoto();
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
}

function handleGetPhotos() {
    $db = getDB();

    try {
        if (isset($_GET['user']) && $_GET['user'] === 'me') {
            // Get current user's photos
            if (!isset($_SESSION['user_id'])) {
                http_response_code(401);
                echo json_encode(['success' => false, 'error' => 'Not authenticated']);
                return;
            }
            $stmt = $db->prepare('
                SELECT p.*, u.name as user_name 
                FROM user_photos p 
                JOIN users u ON p.user_id = u.id 
                WHERE p.user_id = :uid 
                ORDER BY p.created_at DESC
            ');
            $stmt->execute(['uid' => $_SESSION['user_id']]);
        } else {
            // Get all photos
            $stmt = $db->query('
                SELECT p.*, u.name as user_name 
                FROM user_photos p 
                JOIN users u ON p.user_id = u.id 
                ORDER BY p.created_at DESC
            ');
        }

        $photos = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $photos]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
}

function handleUploadPhoto() {
    // Check auth
    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Duhet të jeni i kyçur për të ngarkuar foto.']);
        return;
    }

    // Validate input
    $cityName = isset($_POST['city_name']) ? trim($_POST['city_name']) : '';
    $caption = isset($_POST['caption']) ? trim($_POST['caption']) : '';

    $errors = [];
    if (empty($cityName)) $errors[] = 'Zgjidhni qytetin.';
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        $errors[] = 'Zgjidhni një foto për t\'u ngarkuar.';
    }

    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => $errors]);
        return;
    }

    // Validate file type
    $file = $_FILES['image'];
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    $fileType = mime_content_type($file['tmp_name']);

    if (!in_array($fileType, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => ['Lloji i skedarit nuk lejohet. Përdorni JPG, PNG, WebP ose GIF.']]);
        return;
    }

    // Max 5MB
    if ($file['size'] > 5 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => ['Foto është shumë e madhe. Maksimumi është 5MB.']]);
        return;
    }

    // Create uploads directory if it doesn't exist
    $uploadDir = __DIR__ . '/../uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Generate unique filename
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = 'photo_' . $_SESSION['user_id'] . '_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $filepath = $uploadDir . $filename;

    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Gabim gjatë ruajtjes së fotos.']);
        return;
    }

    // Save to database
    $db = getDB();
    try {
        $stmt = $db->prepare('
            INSERT INTO user_photos (user_id, city_name, caption, image_path) 
            VALUES (:uid, :city, :caption, :path)
        ');
        $stmt->execute([
            'uid' => $_SESSION['user_id'],
            'city' => $cityName,
            'caption' => $caption,
            'path' => 'uploads/' . $filename,
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Foto u ngarkua me sukses!',
            'photo' => [
                'id' => $db->lastInsertId(),
                'city_name' => $cityName,
                'caption' => $caption,
                'image_path' => 'uploads/' . $filename,
            ]
        ]);
    } catch (PDOException $e) {
        // Clean up file if DB insert fails
        unlink($filepath);
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
