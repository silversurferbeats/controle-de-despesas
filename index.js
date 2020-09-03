const transactionsUl = document.querySelector("#transactions")
const incomeDisplay = document.querySelector("#money-plus")
const expenseDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")


const form = document.querySelector("#form")
const inputTransactionName = document.querySelector("#text")
const inputTransactionAmount = document.querySelector("#amount")



/*** TRANSACCIONES*/
/**
let dummyTransactions = [
    {id: 1, name: "bolo de brigadeiro", amount: -20},
    {id: 2, name: "salario", amount: 300},
    {id: 3, name: "torta de frango", amount: -10},
    {id: 4, name: "violao", amount: 150}
]
*/


/**LOCALSTORAGE */

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))

let transactions = localStorage 
    .getItem ('transactions') !== null ? localStorageTransactions : []  



/**FUNCION PARA ELIMINAR LA TRANSACCION CON "X" */

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage ()
    init ()
}

const addTransactionsIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? "-" : "+"
    const CSSClass = transaction.amount < 0 ? "minus" : "plus"
    const amountWithoutOperator = Math.abs (transaction.amount)
    const li = document.createElement("li")
    
    li.classList.add (CSSClass)
    li.innerHTML = `
    ${transaction.name} 
    <span>${operator} R$ ${amountWithoutOperator}</span>

    <button class="delete-btn" onClick = "removeTransaction(${transaction.id})">
      x
    </button>   
    `

    transactionsUl.append(li)
}


const updateBalanceValues = () => {
    const transactionAmounts = dummyTransactions
        .map(transaction => transaction.amount)
    const total  = transactionAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactionAmounts
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs (transactionAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)   

        

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}



const init = () => {
    transactionsUl.innerHTML = ''
    dummyTransactions.forEach (addTransactionsIntoDOM)
    updateBalanceValues()
}

/** invoco evento para adicionar transaccion */


init()

/* TRANSACCION AL LOCALSTORAGE */
const updateLocalStorage = () => {
    localStorage.setItem ('transactions', JSON.stringify(transactions))

}


const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener ('submit', event => {
    event.preventDefault()



    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()



    if (transactionName === '' || transactionAmount === '') {
        alert("por favor, prencha tanto o nome quanto o valor da transacao")
        return
    }


    /** los imput tienen que estar prendido si no se acciona el alert
     * con esta funcion:
     */

    const transaction = { 
        id:generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount) 
    }


    dummyTransactions.push(transaction)
    init()
    updateLocalStorage()


    inputTransactionName.value = ''
    inputTransactionAmount.value = ''


})