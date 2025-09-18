<script setup >
import { ref } from 'vue'

</script>

<template>
  <div class="titulo">
    <h1>CABELO</h1>
  </div>

  <div class="filtragem">
    <div class="filtros">
      <div class="filtro"><i class="fa-solid fa-pump-soap"></i> Hidratação</div>
      <div class="filtro"><i class="fa-solid fa-spray-can-sparkles"></i> Shampool</div>
      <div class="filtro"><i class="fa-solid fa-soap"></i> Condicionador</div>
      <div class="filtro"><i class="fa-solid fa-pump-soap"></i> Óleo capilar</div>
      <div class="filtro"><i class="fa-solid fa-pump-soap"></i>Creme de pentear</div>
      <div class="filtro"><i class="fa-solid fa-spray-can-sparkles"></i>Protetor térmico</div>
    </div>
  </div>

  <div class="card-container">
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Poppy</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/poppy-cabelo.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Shampool</div>
        <div class="descricao-card">higienização profunda</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><router-link to="/especificacao"><button>COMPRAR</button></router-link></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Poppy</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/poppy-cabelo2.png" alt="Normal" class="normal">
          <img src="/public/imagem/hidratação-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Hidratação</div>
        <div class="descricao-card">Máscara Super Inteligente</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Poppy</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/poppy-cabelo3.png" alt="Normal" class="normal">
          <img src="/public/imagem/oleo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Óleo Capilar</div>
        <div class="descricao-card">Óleo Capilar Super Perfumado</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">35.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Poppy</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/poppy-cabelo4.png" alt="Normal" class="normal">
          <img src="/public/cabelo/poppy-cabelo4.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Spray termoprotetor</div>
        <div class="descricao-card">proteção a fonte de calor</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">55.96</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Poppy</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/poppy-cabelo6.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Condicionador</div>
        <div class="descricao-card">Desembaraçante</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Poppy</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/poppy-cabelo5.png" alt="Normal" class="normal">
          <img src="/public/imagem/pentear-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Creme de Pentear</div>
        <div class="descricao-card">cabelos secos e com frizz. </div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">89.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="banner1">
      <img src="/public/cabelo/poppy-juntos.png" alt="">
    </div>
  </div>


  <div class="card-container">
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Tulipa</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/tulipa-cabelo.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Shampool</div>
        <div class="descricao-card">higienização profunda</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Tulipa</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/tulipa-cabelo2.png" alt="Normal" class="normal">
          <img src="/public/imagem/hidratação-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Hidratação</div>
        <div class="descricao-card">Máscara Super Inteligente</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Tulipa</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/tulipa-cabelo3.png" alt="Normal" class="normal">
          <img src="/public/imagem/oleo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Óleo Capilar</div>
        <div class="descricao-card">Óleo Capilar Super Perfumado</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">35.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Tulipa</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/tulipa-cabelo4.png" alt="Normal" class="normal">
          <img src="/public/cabelo/tulipa-cabelo4.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Spray termoprotetor</div>
        <div class="descricao-card">proteção a fonte de calor</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">55.96</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Tulipa</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/tulipa-cabelo5.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Condicionador</div>
        <div class="descricao-card">Desembaraçante</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Tulipa</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/tulipa-cabelo6.png" alt="Normal" class="normal">
          <img src="/public/imagem/pentear-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Creme de Pentear</div>
        <div class="descricao-card">cabelos secos e com frizz. </div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">89.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="banner1">
      <img src="/public/cabelo/tulipa-juntos.png" alt="">
    </div>
  </div>

  <div class="card-container">
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Sunshine</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/sunshine-cabelo.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Shampool</div>
        <div class="descricao-card">higienização profunda</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Tulipa</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/sunshine-cabelo2.png" alt="Normal" class="normal">
          <img src="/public/imagem/hidratação-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Hidratação</div>
        <div class="descricao-card">Máscara Super Inteligente</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Sunshine</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/sunshine-cabelo3.png" alt="Normal" class="normal">
          <img src="/public/imagem/oleo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Óleo Capilar</div>
        <div class="descricao-card">Óleo Capilar Super Perfumado</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">35.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Sunshine</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/sunshine-cabelo4.png" alt="Normal" class="normal">
          <img src="/public/cabelo/sunshine-cabelo4.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Spray termoprotetor</div>
        <div class="descricao-card">proteção a fonte de calor</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">55.96</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Sunshine</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/sunshine-cabelo5.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Condicionador</div>
        <div class="descricao-card">Desembaraçante</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Sunshine</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/sunshine-cabelo6.png" alt="Normal" class="normal">
          <img src="/public/imagem/pentear-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Creme de Pentear</div>
        <div class="descricao-card">cabelos secos e com frizz. </div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">89.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="banner1">
      <img src="/public/cabelo/sunshine-juntos.png" alt="">
    </div>
  </div>

  <div class="card-container">
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Brat</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/brat-cabelo.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Shampool</div>
        <div class="descricao-card">higienização profunda</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Brat</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/brat-cabelo2.png" alt="Normal" class="normal">
          <img src="/public/imagem/hidratação-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Hidratação</div>
        <div class="descricao-card">Máscara Super Inteligente</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Brat</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/brat-cabelo3.png" alt="Normal" class="normal">
          <img src="/public/imagem/oleo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Óleo Capilar</div>
        <div class="descricao-card">Óleo Capilar Super Perfumado</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">35.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Brat</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/brat-cabelo4.png" alt="Normal" class="normal">
          <img src="/public/cabelo/brat-cabelo4.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Spray termoprotetor</div>
        <div class="descricao-card">proteção a fonte de calor</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">55.96</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Brat</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/brat-cabelo5.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Condicionador</div>
        <div class="descricao-card">Desembaraçante</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Brat</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/brat-cabelo6.png" alt="Normal" class="normal">
          <img src="/public/imagem/pentear-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Creme de Pentear</div>
        <div class="descricao-card">cabelos secos e com frizz. </div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">89.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="banner1">
      <img src="/public/cabelo/brat-juntos.png" alt="">
    </div>
  </div>

  <div class="card-container">
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Ariel</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/ariel-cabelo.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Shampool</div>
        <div class="descricao-card">higienização profunda</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Ariel</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/ariel-cabelo2.png" alt="Normal" class="normal">
          <img src="/public/imagem/hidratação-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Hidratação</div>
        <div class="descricao-card">Máscara Super Inteligente</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Ariel</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/ariel-cabelo3.png" alt="Normal" class="normal">
          <img src="/public/imagem/oleo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Óleo Capilar</div>
        <div class="descricao-card">Óleo Capilar Super Perfumado</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">35.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Ariel</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/ariel-cabelo4.png" alt="Normal" class="normal">
          <img src="/public/cabelo/ariel-cabelo4.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Spray termoprotetor</div>
        <div class="descricao-card">proteção a fonte de calor</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">55.96</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Ariel</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/ariel-cabelo5.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Condicionador</div>
        <div class="descricao-card">Desembaraçante</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Ariel</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/ariel-cabelo6.png" alt="Normal" class="normal">
          <img src="/public/imagem/pentear-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Creme de Pentear</div>
        <div class="descricao-card">cabelos secos e com frizz. </div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">89.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="banner1">
      <img src="/public/cabelo/ariel-juntos.png" alt="">
    </div>
  </div>

  <div class="card-container">
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Valentine</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/valentine-cabelo.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Shampool</div>
        <div class="descricao-card">higienização profunda</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Valentine</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/valentine-cabelo2.png" alt="Normal" class="normal">
          <img src="/public/imagem/hidratação-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Hidratação</div>
        <div class="descricao-card">Máscara Super Inteligente</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Valentine</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/valentine-cabelo3.png" alt="Normal" class="normal">
          <img src="/public/imagem/oleo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Óleo Capilar</div>
        <div class="descricao-card">Óleo Capilar Super Perfumado</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">35.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Valentine</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/valentine-cabelo4.png" alt="Normal" class="normal">
          <img src="/public/cabelo/valentine-cabelo4.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Spray termoprotetor</div>
        <div class="descricao-card">proteção a fonte de calor</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">55.96</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Valentine</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/valentine-cabelo5.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Condicionador</div>
        <div class="descricao-card">Desembaraçante</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Valentine</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/valentine-cabelo6.png" alt="Normal" class="normal">
          <img src="/public/imagem/pentear-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Creme de Pentear</div>
        <div class="descricao-card">cabelos secos e com frizz. </div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">89.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="banner1">
      <img src="/public/cabelo/valentine-juntos.png" alt="">
    </div>
  </div>


  <div class="card-container">
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Bluebbery</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/bluebbery-cabelo.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Shampool</div>
        <div class="descricao-card">higienização profunda</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Bluebbery</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/bluebbery-cabelo2.png" alt="Normal" class="normal">
          <img src="/public/imagem/hidratação-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Hidratação</div>
        <div class="descricao-card">Máscara Super Inteligente</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Bluebbery</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/bluebbery-cabelo3.png" alt="Normal" class="normal">
          <img src="/public/imagem/oleo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Óleo Capilar</div>
        <div class="descricao-card">Óleo Capilar Super Perfumado</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">35.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Bluebbery</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/bluebbery-cabelo4.png" alt="Normal" class="normal">
          <img src="/public/cabelo/bluebbery-cabelo4.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Spray termoprotetor</div>
        <div class="descricao-card">proteção a fonte de calor</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">55.96</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Bluebbery</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/bluebbery-cabelo5.png" alt="Normal" class="normal">
          <img src="/public/imagem/shampoo-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Condicionador</div>
        <div class="descricao-card">Desembaraçante</div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">79.90</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="card">
      <div class="informacoes">
        <div class="colecao">
          <h2>Bluebbery</h2>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="imagem-card">
          <img src="/public/cabelo/bluebbery-cabelo6.png" alt="Normal" class="normal">
          <img src="/public/imagem/pentear-conteudo.png" alt="Molhado" class="hover">
        </div>
        <div class="estrelas">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="titulo-card">Creme de Pentear</div>
        <div class="descricao-card">cabelos secos e com frizz. </div>
        <div class="valor-card">
          <div class="escrita-valor">R$</div>
          <div class="numero-valor">89.99</div>
        </div>
        <div class="botao-card"><button>COMPRAR</button></div>
      </div>
    </div>
    <div class="banner1">
      <img src="/public/cabelo/bluebbery-juntos.png" alt="">
    </div>
  </div>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
    integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');

.banner1 img {
  width: 145vh;
  height: 430px;
  z-index: 1;
  border-radius: 20px;
  margin-left: 30px;
}

.escrita-valor {
  font-size: 1.1rem;
  margin-top: 16.5px;
}

.descricao-card {
  width: 220px;
}

.numero-valor {
  font-size: 2rem;
  font-weight: 600;
}

.valor-card {
  display: flex;
  margin-left: 100px;
  margin-top: 2px;
}

.botao-card button {
  width: 120px;
  height: 35px;
  text-decoration: none;
  border: none;
  box-shadow: 0 3px 10px rgba(0, 0, 0, .20);
  margin-top: 5px;
  background-color: transparent;
  border-radius: 40px;
  margin-left: 40px;
  font-size: .9rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;

}

.botao-card button:hover {
  background-color: #84827e;
  border: #84827e;
  transition: ease 1s;
  color: #ffffff;

}



.titulo-card {
  font-size: 1.1rem;
  margin-top: 3px;
  font-weight: 700;
}

.descricao-card {
  font-size: .9rem;
}

.imagem-card {
  position: relative;
  width: 180px;
  height: 180px;
}

.imagem-card img {
  position: absolute;
  top: 0;
  left: 0;
  width: 180px;
  height: 180px;
  transition: opacity 0.5s ease;
  margin-left: 10px;
}

.imagem-card img.hover {
  opacity: 0;
}

.imagem-card:hover img.normal {
  opacity: 0;
}

.imagem-card:hover img.hover {
  opacity: 1;
}



.colecao {
  display: grid;
  grid-template-columns: 168px 80px;
}

.colecao i {
  font-size: 1.7rem;
  margin-top: 20px;

}

.informacoes {
  margin-left: 20px;
  font-family: "Poppins", sans-serif;

}

.card {
  box-shadow: 0 6px 20px rgba(0, 0, 0, .40);
  height: 430px;
  border-radius: 20px;
}

.card-container {
  display: grid;
  grid-template-columns: 250px 250px 250px 250px 250px;
  gap: 30px;
  font-family: "Poppins", sans-serif;
  margin-top: 50px;
  margin-left: 75px;
}

.titulo {
  background-color: black;
  width: 200vh;
  height: 130px;
  border-radius: 20px;
  margin-left: 65px;
}

.titulo h1 {
  font-size: 4rem;
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  justify-content: center;
  /* Centraliza horizontalmente */
  display: flex;

}

/*FILTRAGEM*/

.filtragem {
  font-family: 'Poppins', sans-serif;
  margin-top: 50px;
  text-align: center;
  font-size: 1rem;
  margin-left: 140px;
  font-weight: 600;
}

.filtros {
  display: flex;
  margin-top: 40px;
  gap: 10px;

}

.filtro {
  box-shadow: 0 6px 20px rgba(0, 0, 0, .40);
  border-radius: 40px;
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  /* Centraliza horizontalmente */
  align-items: center;
}

.filtro:hover {
  background-color: #84827e;
  transition: ease .5s;
  color: #ffffff;
}

.filtro i {
  margin-right: 10px;
  margin-top: -5px;
}


</style>