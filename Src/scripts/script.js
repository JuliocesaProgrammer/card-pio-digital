 // Alternância entre abas
 const tabs = document.querySelectorAll('.tab');
 tabs.forEach(tab => {
   tab.addEventListener('click', function() {
     document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
     document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
     this.classList.add('active');
     document.getElementById(this.getAttribute('data-tab')).classList.add('active');
   });
 });

 // Funções para carrossel
 function nextItem(tabId) {
   const carousel = document.getElementById('carousel-' + tabId);
   const items = carousel.querySelectorAll('.carousel-item');
   let activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
   items[activeIndex].classList.remove('active');
   activeIndex = (activeIndex + 1) % items.length;
   items[activeIndex].classList.add('active');
 }
 function prevItem(tabId) {
   const carousel = document.getElementById('carousel-' + tabId);
   const items = carousel.querySelectorAll('.carousel-item');
   let activeIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
   items[activeIndex].classList.remove('active');
   activeIndex = (activeIndex - 1 + items.length) % items.length;
   items[activeIndex].classList.add('active');
 }

 // Gerenciamento do carrinho
 let cart = [];
 function addToCart(prodId) {
   const checkbox = document.getElementById(prodId);
   if (checkbox.checked) {
     const name = checkbox.getAttribute('data-name');
     const price = parseFloat(checkbox.getAttribute('data-price'));
     const quantity = parseInt(document.getElementById('qtd-' + prodId).value);
     cart.push({name, price, quantity});
     updateCart();
   } else {
     alert('Selecione o item para adicioná-lo.');
   }
 }
 function updateCart() {
   const cartItems = document.getElementById('cart-items');
   cartItems.innerHTML = '';
   let total = 0;
   cart.forEach(item => {
     total += item.price * item.quantity;
     cartItems.innerHTML += `<p>${item.name} - ${item.quantity} x R$${item.price.toFixed(2)}</p>`;
   });
   document.getElementById('total').innerText = total.toFixed(2);
 }
 function showCheckout() {
   document.getElementById('checkout').style.display = 'block';
 }
 function confirmOrder() {
   alert('Pedido confirmado! Obrigado pela preferência.');
   // Lógica de envio do pedido pode ser implementada aqui.
 }
 function cancelOrder() {
   if(confirm('Deseja cancelar o pedido?')) {
     cart = [];
     updateCart();
     document.getElementById('checkout').style.display = 'none';
   }
 }