<?php

header('content-type: application/json');
echo json_encode(['data' => ['date' => time()]]);
