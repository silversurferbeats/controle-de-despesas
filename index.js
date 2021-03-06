const transactionsUl = document.querySelector("#transactions")
const incomeDisplay = document.querySelector("#money-plus")
const expenseDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")


const form = document.querySelector("#form")
const inputTransactionName = document.querySelector("#text")
const inputTransactionAmount = document.querySelector("#amount")



/*** TRANSACCIONES
 
 let transacciones = [
     
]

*/

/********************************************* */
/**LOCALSTORAGE */

const localStorageTransaccions = JSON.parse (localStorage
    .getItem ('transacciones')) 
let transacciones =  localStorage
    .getItem ('transacciones') !== null ? localStorageTransaccions : []
 

/*********************************** */


/**FUNCION PARA ELIMINAR LA TRANSACCION CON "X" */

const removeTransaction = ID => {
    transacciones = transacciones.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage()
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
    const transactionAmounts = transacciones
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
    transacciones.forEach (addTransactionsIntoDOM)
    updateBalanceValues()
}
/******************************************************************* */
/** invoco evento para adicionar transaccion */


init()

/* TRANSACCION AL LOCALSTORAGE */
const updateLocalStorage = () => {
    localStorage.setItem ('transactions', JSON.stringify(transacciones))

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


    transacciones.push(transaction)
    init()
    updateLocalStorage()


    inputTransactionName.value = ''
    inputTransactionAmount.value = ''


})