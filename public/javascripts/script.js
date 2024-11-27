document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    document.getElementById('discounted-btn').addEventListener('click', () => {
        products.forEach(product => {
            const discountStatus = product.querySelector('.discount-status').innerText.trim();
            if (discountStatus === 'false') {
                product.style.display = 'none';
            } else {
                product.style.display = 'block';
            }
        });
    });
});
