// Array to store items added to the table
let table = [];

// Function to update the table when quantities change
function updatetable() {
    table = [];
    const items = document.querySelectorAll('.items');
    items.forEach(item => {
        const quantity = parseInt(item.querySelector('input').value);
        if (quantity > 0) {
            const name = item.querySelector('h2').textContent;
            const price = parseFloat(item.getAttribute('price'));
            table.push({ name, quantity, price });
        }
    });
    updateOrderTable();
}

// Function to update the order summary table and total price
function updateOrderTable() {
    const tableBody = document.querySelector('#orderTable tbody');
    const totalPriceElement = document.getElementById('total-price');

    // Clear the table
    tableBody.innerHTML = '';

    let total = 0;
    table.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.quantity*item.price).toFixed(2)}</td>
        `;
        tableBody.appendChild(row);

        total += item.quantity * item.price;
    });

    // Update total price
    if (totalPriceElement) {
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Function to handle the "Buy Now" button
function buyNow() {
    if (table.length === 0) {
        alert('Your table is empty. Please add items to proceed.');
        return;
    }

    // Navigate to the new page (mockup action here)
    const orderDetails = JSON.stringify(table);
    localStorage.setItem('orderDetails',orderDetails);
    window.location.href='payment.html';
}

// Function to save the table to favorites
function saveToFavorites() {
    if (table.length === 0) {
        alert('Your table is empty. Add items to save as favorites.');
        return;
    }

    localStorage.setItem('favoritetable', JSON.stringify(table));
    alert('Favorites saved successfully!');
}

// Function to apply favorites to the table
function applyFavorites() {
    const favoritetable = localStorage.getItem('favoritetable');
    if (!favoritetable) {
        alert('No favorites found. Please save a favorite order first.');
        return;
    }

    table = JSON.parse(favoritetable);
    updateOrderTable();
    alert('Favorites applied successfully!');
}

// Attach event listeners to quantity inputs for automatic updates
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.items input');
    inputs.forEach(input => {
        input.addEventListener('input', updatetable);
    });
    updatetable(); // Initial update to populate table if quantities are pre-filled
});
