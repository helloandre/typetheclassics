<?php
// Routes

$app->get('/', function ($request, $response, $args) {
    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/texts', function ($request, $response, $args) {
    // Render index view
    return $response->withHeader('Content-type', 'application/json')->write(file_get_contents('./texts/texts.json'));
});


$app->get('/text/{text}/{block}', function ($request, $response, $args) {
    $text = $request->getAttribute('text');
    $block = $request->getAttribute('block');

    $file = './texts/' . $text . '/block-' . $block . '.txt';

    if (strpos($text, '.') !== false || strpos($block, '.') !== false || !file_exists($file)) {
        return $response->withStatus(405);
    }

    $text = file_get_contents($file);

    return $response->withHeader('Content-type', 'application/json')->write(json_encode(compact('text')));
});


