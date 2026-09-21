<?php
require_once 'ApiClient.php';
$api = new ApiClient();
$resultado = $api->testarConexao();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gerenciador de Projetos</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="container">
    <h1>Gerenciador de Projetos</h1>
<?php if ($resultado): ?>
  <p class="status ok">API online: <?= htmlspecialchars($resultado['mensagem']) ?></p>
<?php else: ?>
  <p class="status falha">Falha. O servidor Node está rodando?</p>
<?php endif; ?>
    <div id="alerta" class="alerta oculto"></div>

    <form id="form-projeto">
      <input type="text" id="nome" placeholder="Nome do projeto">
      <textarea id="descricao" placeholder="Descrição (opcional)"></textarea>
      <button type="submit">Salvar</button>
    </form>

    <ul id="lista"></ul>
  </main>
  <script src="app.js"></script>
</body>
</html>