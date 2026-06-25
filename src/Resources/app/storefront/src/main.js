function addPaymentNotice() {
 let paymentCardEl = document.querySelector('.confirm-payment-shipping .card.checkout-card .card-body');
 
 if (paymentCardEl) {
   let infoDiv = document.createElement('div');
   infoDiv.innerHTML = 'Sofort-Zahlung und Kreditkarten-Zahlung ist im Moment nur via Klarna möglich. Wir entschuldigen uns für die Umstände.';
   infoDiv.style.cssText = `
     background: #fff3cd;
     color: #856404;
     border: 1px solid #ffeaa7;
     border-radius: 4px;
     padding: 12px 16px;
     font-size: 14px;
     font-family: inherit;
     margin-top: 15px;
     line-height: 1.4;
   `;
   
   paymentCardEl.appendChild(infoDiv);
 }
}

document.addEventListener('DOMContentLoaded', addPaymentNotice);
