<?php
// Routes

function build_filename($text, $block) {
    return './texts/' . $text . '/block-' . $block . '.txt';
}

$app->get('/', function ($request, $response, $args) {
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/about', function ($request, $response, $args) {
    return $this->renderer->render($response, 'about.phtml', $args);
});

$app->get('/texts', function ($request, $response, $args) {
    return $response->withHeader('Content-type', 'application/json')->write(file_get_contents('./texts/texts.json'));
});

$app->get('/randomtext', function ($request, $response, $args) {
    $all_texts = json_decode(file_get_contents('./texts/texts.json'), true);

    // pick a random text, block
    // but always have an offset of 0
    $keys = array_keys($all_texts);
    $text_key = $keys[array_rand($keys)];
    $text = $all_texts[$text_key];
    $block = rand(0, $text['blocks'] - 1);
    $content = file_get_contents(build_filename($text_key, $block));

    return $response->withHeader('Content-type', 'application/json')->write(json_encode(array('text' => $text_key, 'block' => $block, 'offset' => 0, 'content' => $content)));
});

$app->get('/text/{text}/{block}', function ($request, $response, $args) {
    $text = $request->getAttribute('text');
    $block = $request->getAttribute('block');

    $file = build_filename($text, $block);

    if (strpos($text, '.') !== false || strpos($block, '.') !== false || !file_exists($file)) {
        return $response->withStatus(405);
    }

    $content = file_get_contents($file);

    return $response->withHeader('Content-type', 'application/json')->write(json_encode(compact('content')));
});


