document.addEventListener('DOMContentLoaded', () => {
    const deliveryDate = localStorage.getItem('deliveryDate');
    if (deliveryDate) {
        document.getElementById('delivery-date').textContent = deliveryDate;
    } else {
        document.getElementById('delivery-date').textContent = 'N/A';
    }
});
