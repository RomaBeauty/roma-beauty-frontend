<script setup>
import { ref } from 'vue'

const menuAberto = ref(false)
const opcaoSelecionada = ref(null)

function toggleMenu() {
    menuAberto.value = !menuAberto.value
    opcaoSelecionada.value = null
}

function selecionarOpcao(opcao) {
    opcaoSelecionada.value = opcao
}


const showUsuario = ref(false)
const showCompra = ref(false)
const showPesquisa = ref(false)
const showMenu = ref(false)


function toggleUsuario() {
    showUsuario.value = !showUsuario.value
}

function toggleCompra() {
    showCompra.value = !showCompra.value
}

function togglePesquisa() {
    showPesquisa.value = !showPesquisa.value
}

/*IMAGEM*/
const defaultImg = '/public/imagem/usuario4.jpg'  // coloque sua imagem padrão em /public
const preview = ref(null)

function onFileChange(event) {
    const file = event.target.files[0]
    if (!file) return

    // Criar preview da imagem
    const reader = new FileReader()
    reader.onload = (e) => {
        preview.value = e.target.result
    }
    reader.readAsDataURL(file)
}

/*pesquisa */

const search = ref("")

function doSearch() {
    alert(`Você pesquisou: ${search.value}`)
}
</script>

<template>
    <div class="inicio">
        <div class="menu-container">
            <!-- Botão do Menu -->
            <div class="menu" @click="toggleMenu">
                <i class="fa-solid fa-bars"></i>
            </div>

            <!-- Modal Lateral do Menu -->
            <div class="overlay" :class="{ show: menuAberto }" @click.self="toggleMenu">
                <div class="side-menu" :class="{ show: menuAberto }">
                    <button @click="toggleMenu"><i class="fa-solid fa-xmark"></i></button>

                    <div class="menu-content">
                        <!-- Coluna de categorias -->
                        <div class="categorias">
                            <h3>Categorias</h3>
                            <ul>
                                <li @click="selecionarOpcao('maquiagem')">Maquiagem</li>
                                <li @click="selecionarOpcao('skincare')">Skin Care</li>
                                <li @click="selecionarOpcao('corporal')">Corporal</li>
                                <li @click="selecionarOpcao('cabelo')">Cabelo</li>
                                <li @click="selecionarOpcao('perfume')">Perfume</li>
                                <li> <router-link to="/">Home</router-link></li>

                            </ul>
                        </div>

                        <!-- Coluna de submenus -->
                        <!-- Coluna de submenus -->
                        <div class="subcategorias">
                            <transition name="fade-slide" mode="out-in">
                                <div v-if="opcaoSelecionada === 'perfume'" key="perfume">
                                    <ul>
                                        <li><router-link to="">Perfume</router-link></li>
                                        <li><router-link to="">Colônia</router-link></li>                                        
                                        <li><router-link to="">Body Splash</router-link></li>

                                    </ul>
                                </div>

                                <div v-else-if="opcaoSelecionada === 'corporal'" key="corporal">
                                    <ul>
                                        <li><router-link to="">Óleo</router-link></li>                                        
                                        <li><router-link to="">Creme</router-link></li>
                                        <li><router-link to="">Esfoliante</router-link></li>
                                        <li><router-link to="">hidratante</router-link></li>

                                    </ul>
                                </div>

                                   <div v-else-if="opcaoSelecionada === 'skincare'" key="skincare">
                                    <ul>                                        
                                        <li><router-link to="">Serum</router-link></li>
                                        <li><router-link to="">Sabonete</router-link></li>
                                        <li><router-link to="">Protetor Solar</router-link></li>

                                    </ul>
                                </div>

                                   <div v-else-if="opcaoSelecionada === 'cabelo'" key="cabelo">
                                    <ul>
                                        <li><router-link to="">óleo</router-link></li>                                          
                                        <li><router-link to="">Máscara</router-link></li>                                        
                                        <li><router-link to="">Shampoo</router-link></li>                                               
                                        <li><router-link to="">Condicionador</router-link></li>
                                        <li><router-link to="">Proteto térmico</router-link></li>

                                    </ul>
                                </div>

                                <div v-else-if="opcaoSelecionada === 'maquiagem'" key="maquiagem">
                                    <ul>
                                        <li><router-link to="/cards">Pó</router-link></li>                                        
                                        <li><router-link to="">Base</router-link></li>                                       
                                        <li><router-link to="">Rímel</router-link></li>
                                        <li><router-link to="">Corretivo</router-link></li>
                                        <li><router-link to="">Iluminador</router-link></li>
                                        <li><router-link to="">Batom matte</router-link></li>
                                        <li><router-link to="">Batom Líquido</router-link></li>
                                        <li><router-link to="">Paleta de Sombra</router-link></li>
                                        <li><router-link to="">Paleta de sobrancelha</router-link></li>



                                    </ul>
                                </div>
                            </transition>
                        </div>

                    </div>
                </div>

            </div>

            <div class="nome-logo">
                <img src="/public/imagem/logo.png" alt="">
            </div>

            <div class="icons-menu">
                <i class="fa-solid fa-magnifying-glass" @click="togglePesquisa"></i>
                <i class="fa-solid fa-user" @click="toggleUsuario"></i>
                <i class="fa-solid fa-bag-shopping" @click="toggleCompra"></i>
            </div>
        </div>
        <!-- Modal Usuário -->
        <div class="overlay" :class="{ show: showUsuario }" @click.self="toggleUsuario">
            <div class="side-modal" :class="{ show: showUsuario }">
                <button @click="toggleUsuario"><i class="fa-solid fa-xmark"></i></button>
                <div class="imagem-user"></div>
                <div class="perfil-container">
                    <img :src="preview || defaultImg" alt="Foto de perfil" class="perfil-img" />
                    <input type="file" @change="onFileChange" accept="image/*" />
                </div>
            </div>
        </div>

        <!-- Modal Compra -->
        <div class="overlay" :class="{ show: showCompra }" @click.self="toggleCompra">
            <div class="side-modal" :class="{ show: showCompra }">
                <button @click="toggleCompra"><i class="fa-solid fa-xmark"></i></button>
                <div class="linhas">
                    <div class="linha1"></div>
                    <div class="linha2"></div>
                    <div class="linha3"></div>

                </div>
                <div class="linha4"></div>
                <div class="linha5"></div>
            </div>
        </div>

        <!-- Modal Pesquisa -->
        <div class="overlay" :class="{ show: showPesquisa }" @click.self="togglePesquisa">
            <div class="side-modal" :class="{ show: showPesquisa }">
                <button @click="togglePesquisa"><i class="fa-solid fa-xmark"></i></button>
                <div class="search-container">

                    <input v-model="search" type="text" placeholder="Pesquisar... " class="search-input" />
                    <button @click="doSearch" class="search-btn"></button>
                </div>
                <h2>Sugestões</h2>

            </div>
        </div>

        <div class="imagem-principal"> <img src="/public/imagem/imagem-principal.png" alt=""></div>
    </div>

    <div class="anuncio1">
        <h1>Desconto Beauty</h1>
        <p>Aproveite os descontos progressivos da Roma Beauty: quanto mais você compra, menos paga!
            Da hidratação intensa ao cuidado capilar, descubra a tecnologia que transforma sua rotina de beleza em um
            verdadeiro ritual.</p>
        <button class="botao-anuncio1">Conhecer</button>
    </div>

    <div class="anuncios-container">
        <div class="anuncio2"></div>
        <div class="anuncio3"></div>
        <div class="anuncio4"></div>
    </div>

    <div class="filtragem">
        <h1>Explore o melhor de corpo e banho</h1>
        <div class="filtros">
            <div class="filtro"><i class="fa-solid fa-prescription-bottle"></i> Desodorante</div>
            <div class="filtro"><i class="fa-solid fa-spray-can-sparkles"></i> Body Splash</div>
            <div class="filtro"><i class="fa-solid fa-soap"></i> Sabonete</div>
            <div class="filtro"><i class="fa-solid fa-pump-soap"></i> Hidratante</div>
            <div class="filtro"><i class="fa-solid fa-baby-carriage"></i> Infantil</div>
        </div>
    </div>

    <footer class="my-footer">
        <div class="my-container">
            <div class="my-row">
                <!-- Coluna 1 -->
                <div class="my-footer-col">
                    <h4>Sobre a Roma Beauty</h4>
                    <ul>
                        <li><router-link to="#">Nossa história</router-link></li>
                        <li><router-link to="#">Missão e valores</router-link></li>
                        <li><router-link to="#">Política de privacidade</router-link></li>
                        <li><router-link to="#">Afiliados</router-link></li>
                    </ul>
                </div>

                <!-- Coluna 2 -->
                <div class="my-footer-col">
                    <h4>Ajuda</h4>
                    <ul>
                        <li><router-link to="#">FAQ</router-link></li>
                        <li><router-link to="#">Envio</router-link></li>
                        <li><router-link to="#">Devoluções</router-link></li>
                        <li><router-link to="#">Status do pedido</router-link></li>
                        <li><router-link to="#">Formas de pagamento</router-link></li>
                    </ul>
                </div>

                <!-- Coluna 3 -->
                <div class="my-footer-col">
                    <h4>Produtos</h4>
                    <ul>
                        <li><router-link to="#">Perfumes</router-link></li>
                        <li><router-link to="#">Cremes</router-link></li>
                        <li><router-link to="#">Body Splash</router-link></li>
                        <li><router-link to="#">Desodorantes</router-link></li>
                    </ul>
                </div>

                <!-- Coluna 4 -->
                <div class="my-footer-col">
                    <h4>Siga-nos</h4>
                    <div class="my-social-links">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
        integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>



<style scoped>
/*footer*/
.my-footer {
    background-color: #343535;
    padding: 70px 0;
    margin-top: 150px;
    font-family: 'Poppins', sans-serif;
    border-radius: 30px;
}

.my-container {
    width: 1170px;
    margin: auto;
}

.my-row {
    display: flex;
    flex-wrap: wrap;
}

.my-footer-col {
    width: 20%;
    padding: 0 15px;
}

.my-footer-col h4 {
    font-size: 18px;
    color: #ffffff;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
}

.my-footer-col h4::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color: #feb7d9;
    height: 2px;
    width: 50px;
}

.my-footer-col ul li:not(:last-child) {
    margin-bottom: 10px;
}

.my-footer-col ul li a {
    font-size: 16px;
    text-transform: capitalize;
    color: #bbbbbb;
    text-decoration: none;
    display: block;
    transition: all 0.3s ease;
}

.my-footer-col ul li a:hover {
    color: #ffffff;
    padding-left: 8px;
}

.my-social-links a {
    display: inline-block;
    height: 40px;
    width: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 0 10px 10px 0;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    color: #ffffff;
    transition: all 0.5s ease;
}

.my-social-links a:hover {
    color: #24262b;
    background-color: #ffffff;
}

/* Responsivo */
@media(max-width: 767px) {
    .my-footer-col {
        width: 50%;
        margin-bottom: 30px;
    }
}

@media(max-width: 574px) {
    .my-footer-col {
        width: 100%;
    }
}

/*footer*/

.imagem-principal img {
    width: 100%;
    border-radius: 30px;
    height: 95%;
    margin-top: 10px;
}


/* Lateral Menu */

.menu-content {
    display: flex;
    gap: 30px;
    height: 100%;
}

.categorias {
    width: 40%;
    border-right: 2px solid #d2d0cc;
    margin-left: 50px;
}

.subcategorias {
    width: 60%;
    padding-left: 20px;
    margin-top: 100px;
}

.side-menu {
    background-color: #fff;
    width: 50%;
    border-top-left-radius: 20px;
    height: 100%;
    padding: 20px;
    box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    transform: translateX(100%);
    /* começa fora da tela */
    transition: transform 0.3s ease;
}

.side-menu.show {
    transform: translateX(0);
    /* desliza para dentro */
}



.side-menu h3 {
    font-family: 'Poppins', sans-serif;
    margin-bottom: 15px;
    font-size: 2rem;
    color: #84827e;
}

.side-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.side-menu li {
    padding: 10px 0;
    font-size: 1.2rem;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
}

.subcategorias a {
    text-decoration: none;
    color: inherit;
    /* usa a mesma cor do texto normal */
    font-family: 'Poppins', sans-serif;
    padding: 10px 0;
}

.categorias a {
    text-decoration: none;
    color: #333;
    cursor: default;
    font-weight: 500;
    transition: color 0.3s ease;
}

.categorias a:hover {
    color: #a1a3a4;
    font-weight: bold;
    transition: ease 0.5s;

}

.side-menu li:hover {
    color: #a1a3a4;
    font-weight: bold;
    transition: ease 0.5s;
}

/* Submenu dentro do menu lateral */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.fade-slide-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.fade-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}


.submenu-lateral {
    margin-top: 15px;
    padding-left: 15px;
    border-left: 2px solid #feb7d9;
}


/*pesquisa*/
.search-container {
    align-items: center;
    gap: 8px;
    margin: 20px auto;
    width: 90vh;
    margin-left: 40px;
}

.overlay h2 {
    color: #84827e;
    font-size: 1.5rem;
    font-family: 'Poppins', sans-serif;
    margin-left: 60px;
}


.search-input {
    padding: 10px 14px;
    height: 30px;
    width: 100%;
    margin-top: 40px;
    font-size: 1.2rem;
    border-radius: 20px;
    border: none;
    /* tira a borda padrão */
    background-color: #F0F0F3;
    /* cor clara de fundo */
    box-shadow:
        inset 3px 3px 6px #cfceced0,
        /* sombra interna mais escura */
        inset -3px -3px 6px #ffffff;
    /* sombra interna mais clara */

    outline: none;
    transition: all 0.3s ease;
}




.search-btn:hover {
    background: #84827e;
}

/*Usuario*/



.perfil-container input {
    font-family: 'Poppins', sans-serif;
    margin-left: 500px;
    margin-top: -90px;
    color: #84827e;
}

.perfil-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.perfil-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, .40);
    z-index: 2;
}

/*CARRINHO*/



.linhas {
    display: grid;
    grid-template-columns: 150px 150px 150px;
    margin-left: 130px;
    gap: 2px;
}

.linha1 {
    border-color: #84827e;
    background-color: transparent;
    height: 5px;
    background-color: #84827e;
    box-shadow: 0 4px 20px rgba(0, 0, 0, .40);

}

.linha2,
.linha3 {
    height: 5px;
    border-color: #84827e;
    background-color: transparent;
    box-shadow: 0 6px 20px rgba(0, 0, 0, .40);

}

.linha4 {
    width: 100%;
    margin-top: 50px;
    border-bottom: .0625rem dotted #dddedc;
}

.linha5 {
    width: 100%;
    margin-top: 50px;
    border-bottom: .0625rem dotted #dddedc;
}

/*ve*/

.overlay button {
    text-decoration: none;
    border: none;
    background-color: transparent;
    font-size: 2rem;
    margin-left: 89vh;
}

.overlay button:hover {
    color: #84827e;
    transition: ease .5s;
}

.imagem-principal {
    background-image: url(/public/imagem/principal.png);
    width: 100%;
    height: 100%;
    margin-left: 50px;
    margin-right: 50px;
    border-radius: 20px;
    background-size: cover;
    /* cobre todo o espaço, pode cortar */
    background-position: center;
    /* centraliza a imagem */
    background-repeat: no-repeat;
}


/* Fundo escuro/fosco */
/* Fundo escuro/fosco */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    /* transparente por padrão */
    display: flex;
    justify-content: flex-end;
    z-index: 999;
    pointer-events: none;
    /* evita clicar quando oculto */
    transition: background-color 0.3s ease;
}

.overlay.show {
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
    /* ativa cliques quando visível */
}

/* Modal lateral */
.side-modal {
    background-color: #fff;
    width: 50%;
    border-top-left-radius: 20px;
    height: 100%;
    padding: 20px;
    box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    transform: translateX(100%);
    /* começa fora da tela */
    transition: transform 0.3s ease;
}

.side-modal.show {
    transform: translateX(0);
    /* desliza para dentro */
}



/*FILTRAGEM*/

.filtragem {
    font-family: 'Poppins', sans-serif;
    margin-top: 60px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
}

.filtros {
    display: flex;
    margin-top: 40px;
    gap: 40px;
    margin-left: 250px;

}

.filtro {
    box-shadow: 0 6px 20px rgba(0, 0, 0, .40);
    border-radius: 40px;
    width: 170px;
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

/*ANUNCIO */

.anuncio1 {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    width: 190vh;
    height: 250px;
    background-color: #000;
    margin-left: 62px;
    margin-top: 40px;
    border-radius: 20px;
    border-top: 1px solid transparent;
    /* já evita colapso */

}

.anuncio1 p {
    color: #ffffff;
    margin-top: 40px;
    width: 150vh;
    margin-left: 130px;
}

.anuncio1 h1 {
    color: #ffffff;
    margin-top: 10px;
    font-size: 2.5rem;
}

.botao-anuncio1 {
    text-decoration: none;
    margin-top: 10px;
    width: 300px;
    height: 40px;
    border: none;
    border-radius: 40px;
    font-weight: 600;
    font-size: 1rem;
}

.botao-anuncio1:hover {
    background-color: #9c9d9d;
    transition: ease .5s;
    color: #ffffff;
}

.anuncios-container {
    display: grid;
    grid-template-areas:
        'anuncio2  anuncio3'
        'anuncio2  anuncio4';
    gap: 20px;
    margin-top: 70px;
    margin-right: 90px;

}

.anuncio2 {
    grid-area: anuncio2;
    background-image: url(/public/imagem/cabelo-ensaboando.jpg);
    height: 620px;
    border-radius: 30px;
    width: 500px;
    margin-left: 120px;
    background-size: cover;
    /* cobre todo o espaço, pode cortar */
    background-position: center;
    /* centraliza a imagem */
    background-repeat: no-repeat;
}



.anuncio3 {
    grid-area: anuncio3;
    background-image: url(/public/imagem/anuncio3.png);
    background-size: cover;
    /* cobre todo o espaço, pode cortar */
    background-position: center;
    /* centraliza a imagem */
    background-repeat: no-repeat;
    border-radius: 30px;
    height: 300px;
    width: 700px;
}

.anuncio4 {
    grid-area: anuncio4;
    background-image: url(/public/imagem/anuncio4.png);
    background-size: cover;
    /* cobre todo o espaço, pode cortar */
    background-position: center;
    /* centraliza a imagem */
    background-repeat: no-repeat;
    border-radius: 30px;
    height: 300px;
    width: 700px;
}

/*CAR

/*CARDS*/

/*MENU*/
.menu-container {
    position: fixed;
    top: 0;
    width: 92%;
    border-radius: 20px;
    max-width: 1535px;
    margin-top: 10px;
    height: 70px;
    display: flex;
    align-items: center;
    background-color: #dee2e5;
    z-index: 999;
    box-shadow: 2px 2px 5px #a3b1c6, -2px -2px 5px #ffffff;
}

.menu {
    margin-left: 20px;
    display: flex;
    align-items: center;
}

.menu-container>.menu:first-child {
    margin-left: 40px;
}

.menu-container i:last-child {
    margin-right: 60px;
}

.menu-container i {
    font-size: 1.5rem;
    color: #000;
    margin: 0 10px;
}

.menu-container i:hover {
    color: #858687;
    transition: ease .5s;
}

.menu-container h2 {
    font-family: "Playfair Display", serif;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
}

.nome-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
}

.nome-logo img {
    width: 140px;
    height: 80px;
}

/* INÍCIO */

.icons-menu {
    display: grid;
    grid-template-columns: 50px 50px 50px;
    margin-right: 40px;
}

.icons-menu i {
    color: #ffffff;
}

.icons-menu i:hover {
    color: #000000ad;
    transition: ease .5s;
}

.menu i {
    color: #ffffff;
}

.menu i:hover {
    color: #000000ad;
    transition: ease .5s;
}

.inicio {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}


.inicio h1 {
    font-family: "Playfair Display", serif;
    font-weight: 700;
    font-size: 12rem;
    position: relative;
    top: 40px;
    animation: primeiranimation 1s ease 0.3s forwards;
    z-index: -1;
}

@keyframes primeiranimation {
    0% {
        transform: scale(1);
    }

    100% {
        color: #feb7d9;
        opacity: 0.4;
        transition: ease 1s;
    }
}

/* Dropdown Menu */
.dropdown-menu {
    position: absolute;
    top: 70px;
    width: 400px;
    left: 0;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 10px 0;
    padding: 10px 20px;
    z-index: 1000;
}

.dropdown-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown-menu li {
    padding: 8px 0;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
}

.dropdown-menu li:hover {
    color: #feb7d9;
    font-weight: bold;
}

.dropdown-menu li.selecionado {
    background-color: #feb7d95f;
    color: #ffffff;
    font-weight: bold;
    transition: background-color 0.5s ease, color 0.5s ease;
    border-radius: 5px;
}

/* Submenu */
.submenu {
    position: absolute;
    top: 0;
    left: 100%;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 0 10px 10px 10px;
    padding: 10px 20px;
    min-width: 200px;
    z-index: 1001;
}

.submenu ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.submenu li {
    padding: 8px 0;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
}

.submenu li:hover {
    color: #feb7d9;
    font-weight: bold;
}
</style>