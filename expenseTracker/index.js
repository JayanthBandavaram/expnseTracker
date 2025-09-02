let updateBalance = document.getElementById('balance');
let incomeInput = document.getElementById('income');
let expenseInput = document.getElementById('expense');
let trackerForm = document.getElementById('form');
let trackerType = document.getElementById('type');
let textEntered = document.getElementById('text');
let amountEntered = document.getElementById('amount');
let transactionsList = document.getElementById('history');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];


function generateID() {
    return Math.floor(Math.random() * 1000);
}

trackerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const transaction = {
        id: generateID(),
        text: textEntered.value,
        amount: trackerType.value === 'expense' ? -Math.abs(Number(amountEntered.value)) : Number(+amountEntered.value)
    };
    transactions.push(transaction);
    textEntered.value = "";
    amountEntered.value = "";
    rendertransaction();
    updateLocalStorage();
});

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2); 
    const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);

    updateBalance.innerText = `₹${total}`;
    incomeInput.innerText = `₹${income}`;
    expenseInput.innerText = `₹${expense}`;

}

function rendertransaction() {
    transactionsList.innerHTML = "";
    transactions.forEach(transaction => {
        const list = document.createElement('li');
        list.classList.add(transaction.amount > 0 ? "income" : "expense");
        list.innerHTML = `
    ${transaction.text} <span>${transaction.amount}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
  `;
        transactionsList.appendChild(list);
    });
    updateValues();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    rendertransaction();
    updateLocalStorage();
}

rendertransaction();