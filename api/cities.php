<?php
/**
 * Kosova Travel API - Cities Endpoint
 * 
 * GET /api/cities.php          → All cities
 * GET /api/cities.php?id=1     → Single city by ID
 */

require_once __DIR__ . '/../config.php';

$db = getDB();

try {
    if (isset($_GET['id'])) {
        // Get single city
        $stmt = $db->prepare('SELECT * FROM cities WHERE id = :id');
        $stmt->execute(['id' => (int) $_GET['id']]);
        $city = $stmt->fetch();
        
        if ($city) {
            echo json_encode(['success' => true, 'data' => $city]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'City not found']);
        }
    } else {
        // Get all cities
        $stmt = $db->query('SELECT * FROM cities ORDER BY id ASC');
        $cities = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $cities]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>
