<?php
// Токен телеграм бота
$tg_bot_token = "7632341419:AAH6elhZXZLBGSsWGg5lKd5IjLq08tPtCSk";
// ID Чата
$chat_id = "-4650948466";

// Масив полів, які треба обробити
$fields = ['firstName', 'phone'];

$text = "Новий запит з форми:\n";

// Проходимо по визначених полях
foreach ($fields as $field) {
    if (!empty($_POST[$field])) {
        $text .= ucfirst($field) . ": " . htmlspecialchars($_POST[$field]) . "\n";
    }
}

$text .= "\nЧас: " . date('d.m.y H:i:s');

// Параметри запиту
$param = [
    "chat_id" => $chat_id,
    "text" => $text
];

// Відправка повідомлення в Telegram
$url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendMessage?" . http_build_query($param);

$response = file_get_contents($url);

// Логування відповіді
if ($response === false) {
    error_log("Помилка відправки в Telegram");
}

// Якщо є файли, обробляємо їх
if (!empty($_FILES)) {
    foreach ($_FILES as $file) {
        if (!empty($file['tmp_name'])) {
            $url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendDocument";

            move_uploaded_file($file['tmp_name'], $file['name']);

            $document = new \CURLFile($file['name']);

            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, ["chat_id" => $chat_id, "document" => $document]);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

            $out = curl_exec($ch);

            curl_close($ch);

            unlink($file['name']);
        }
    }
}

die('1');
