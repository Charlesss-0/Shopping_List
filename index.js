import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://my-first-project-7504f-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')

const inputFieldEl = document.getElementById('input-field')
const addBtnEl = document.getElementById('add-button')
const shoppingListEl = document.getElementById('shopping-list')


addBtnEl.addEventListener('click', function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputField(inputValue)
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingList(itemsArray)

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingList(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = 'No items here... yet'
    } 
})


addBtnEl.addEventListener('keydown', function() {
    
})

function clearShoppingList(item) {
    shoppingListEl.innerHTML = ''
}

function clearInputField() {
    inputFieldEl.value = ''
}

function appendItemToShoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement('li')

    newEl.textContent += itemValue

    newEl.addEventListener('click', function() {
        let itemLocationInDB = ref(database, `shoppingList/${itemID}`)

        remove(itemLocationInDB)
    })

    shoppingListEl.append(newEl)
}