<?php
/**
 * Kosova Travel API - Destinations Endpoint
 * 
 * GET /api/destinations.php              → All destinations
 * GET /api/destinations.php?city_id=1    → Destinations for a specific city
 * GET /api/destinations.php?id=1         → Single destination by ID
 */

require_once __DIR__ . '/../config.php';

$db = getDB();

try {
    if (isset($_GET['id'])) {
        // Get single destination
        $stmt = $db->prepare('
            SELECT d.*, c.name as city_name 
            FROM destinations d 
            JOIN cities c ON d.city_id = c.id 
            WHERE d.id = :id
        ');
        $stmt->execute(['id' => (int) $_GET['id']]);
        $dest = $stmt->fetch();
        
        if ($dest) {
            echo json_encode(['success' => true, 'data' => $dest]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'error' => 'Destination not found']);
        }
    } elseif (isset($_GET['city_id'])) {
        // Get destinations by city
        $stmt = $db->prepare('
            SELECT d.*, c.name as city_name 
            FROM destinations d 
            JOIN cities c ON d.city_id = c.id 
            WHERE d.city_id = :city_id 
            ORDER BY d.id ASC
        ');
        $stmt->execute(['city_id' => (int) $_GET['city_id']]);
        $destinations = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $destinations]);
    } else {
        // Get all destinations
        $stmt = $db->query('
            SELECT d.*, c.name as city_name 
            FROM destinations d 
            JOIN cities c ON d.city_id = c.id 
            ORDER BY d.city_id, d.id ASC
        ');
        $destinations = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $destinations]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
}
?>
