<template>
       <footer class="my-footer">
        <div class="my-container">
            <div class="my-row">
                <div class="my-footer-col">
                    <h4>Sobre a Roma Beauty</h4>
                    <ul>
                        <li><router-link to="#">Nossa história</router-link></li>
                        <li><router-link to="#">Missão e valores</router-link></li>
                        <li><router-link to="#">Política de privacidade</router-link></li>
                        <li><router-link to="#">Afiliados</router-link></li>
                    </ul>
                </div>

                <div class="my-footer-col">
                    <h4>Ajuda</h4>
                    <ul>
                        <li><router-link to="#">FAQ</router-link></li>
                        <li><router-link to="#">Envio</router-link></li>
                        <li><router-link to="#">Status do pedido</router-link></li>
                        <li><router-link to="#">Formas de pagamento</router-link></li>
                    </ul>
                </div>

                <div class="my-footer-col">
                    <h4>Produtos</h4>
                    <ul>
                        <li><router-link to="#">Cabelo</router-link></li>
                        <li><router-link to="#">Maquiagem</router-link></li>
                        <li><router-link to="#">skincare</router-link></li>
                    </ul>
                </div>

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
</template>

<style scoped>


/*footer*/
.my-footer {
    background-color: #202020;
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
    background-color: #ffffff;
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


</style>