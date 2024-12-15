document.addEventListener('DOMContentLoaded',()=>{
    // Load order details from localStorage
    const orderDetails=JSON.parse(localStorage.getItem('orderDetails'));
    if (orderDetails) {
        const tableBody=document.getElementById('order-table-body');
        let totalPrice=0;

        orderDetails.forEach(item=>{
            const row=document.createElement('tr');
            row.innerHTML=`
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${(item.quantity*item.price).toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
            totalPrice+=item.quantity*item.price;
        });

        // Update total price
        document.getElementById('total-price').textContent=totalPrice.toFixed(2);
    }

    // Show/hide card details based on selected payment method
    const cashOnDeliveryRadio=document.getElementById('cash-on-delivery');
    const cardPaymentRadio=document.getElementById('card-payment');
    const cardDetailsDiv=document.getElementById('card-details');

    cashOnDeliveryRadio.addEventListener('change',()=>{
        if(cashOnDeliveryRadio.checked){
            cardDetailsDiv.style.display='none';
        }
    });

    cardPaymentRadio.addEventListener('change',()=>{
        if(cardPaymentRadio.checked){
            cardDetailsDiv.style.display='block';
        }
    });

    // Handle payment submission
    const payButton=document.getElementById('pay-button');
    payButton.addEventListener('click',()=> {
        const name=document.getElementById('name').value;
        const address=document.getElementById('address').value;
        const email=document.getElementById('email').value;

        // Simple form validation
        if (!name || !address || !email) {
            alert('Please fill out all fields.');
            return;
        }

        // Handle Cash on Delivery
        if (cashOnDeliveryRadio.checked) {
            const deliveryDate=new Date();
            deliveryDate.setDate(deliveryDate.getDate()+7); // 7 days delivery
            alert(`Thank you for your purchase, ${name}!\nYour order will be delivered to ${address} by ${deliveryDate.toDateString()}.\nA confirmation email has been sent to ${email}.`);
    
            localStorage.setItem('deliveryDate', deliveryDate.toDateString());
            localStorage.removeItem('orderDetails'); // Clear order after payment
            window.location.href = 'thankyou.html'; // Redirect to thank you page
        } 

        // Handle Card Payment
        else if(cardPaymentRadio.checked) {
            const cardNumber=document.getElementById('card-number').value;
            const expiryDate=document.getElementById('expiry-date').value;
            const cvv=document.getElementById('cvv').value;

            // Simple card details validation
            if(!cardNumber || !expiryDate || !cvv) {
                alert('Please fill out all card details.');
                return;
            }

            const deliveryDate=new Date();
            deliveryDate.setDate(deliveryDate.getDate()+7); // 7 days delivery
            alert(`Thank you for the purchase, ${name}!\nOrder will be delivered to ${address} by ${deliveryDate.toDateString()}.\nA confirmation email has been sent to ${email}.`);
    
            localStorage.setItem('deliveryDate',deliveryDate.toDateString());
            localStorage.removeItem('orderDetails'); // Clear order after payment
            window.location.href='thankyou.html'; // Redirect to thank you page
             
        }
    });
});



document.getElementById('card-number').addEventListener('input', function(event) {
    // Allow only digits and limit to 12 characters
    this.value=this.value.replace(/\D/g, '').slice(0, 16);
});

document.getElementById('cvv').addEventListener('input', function(event) {
    // Allow only digits and limit to 3 characters
    this.value = this.value.replace(/\D/g, '').slice(0, 3);
});