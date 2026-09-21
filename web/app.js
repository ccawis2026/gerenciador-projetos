const API = 'http://localhost:3000/api/projetos';
const lista = document.getElementById('lista');
const form = document.getElementById('form-projeto');
const alerta = document.getElementById('alerta');

function mostrarAlerta(msg, tipo = 'erro') {
  alerta.textContent = msg;
  alerta.className = `alerta ${tipo}`;
  setTimeout(() => alerta.classList.add('oculto'), 4000);
}

async function carregar() {
  const res = await fetch(API);
  const projetos = await res.json();
  lista.innerHTML = '';
  projetos.forEach(p => {
    const li = document.createElement('li');
    li.dataset.id = p.id;
    li.innerHTML = `
      <div>
        <strong></strong>
        <p></p>
      </div>
      <button class="btn-excluir">Excluir</button>`;
    li.querySelector('strong').textContent = p.nome;
    li.querySelector('p').textContent = p.descricao || '';
    li.querySelector('button').addEventListener('click', () => excluir(p.id, li));
    lista.appendChild(li);
  });
}

async function excluir(id, li) {
  const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
  if (res.ok) li.remove();
  else mostrarAlerta('Não foi possível excluir.');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, descricao })
  });
  const dados = await res.json();

  if (!res.ok) return mostrarAlerta(dados.erro);

  form.reset();
  mostrarAlerta('Projeto salvo com sucesso!', 'sucesso');
  carregar();
});

carregar();