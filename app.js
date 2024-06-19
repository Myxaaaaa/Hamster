const storageKey = 'humster-coins'
const energyStorageKey = 'humster-energy'
const maxEnergy = 5000
const energyDecrement = 5
const energyIncrement = 3

const coinsPerHour = 100000
let currentCoinsPerHour = 0

let humsterButton = document.querySelector("#humster-button")
let coinsValue = document.getElementById("coins-value")
let tapValue = document.querySelector("#tap-value")
let energyValue = document.getElementById("energy-value")
let floatContainer = document.getElementById("float-container")

// функци при клике на хомячка)))
function humsterTapHandler() {
    let coinsUp = parseInt(tapValue.innerText)
    let totalCoins = parseInt(coinsValue.innerText)
    let currentEnergy = parseInt(energyValue.innerText.split('/')[0])
//здесь условие если мы кликнули по хомячку у нас обновляется значение и убавляется энергия)
    if (currentEnergy >= energyDecrement) {
        let newTotalCoins = totalCoins + coinsUp
        coinsValue.innerText = newTotalCoins
        localStorage.setItem(storageKey, newTotalCoins)

        let newEnergy = currentEnergy - energyDecrement
        energyValue.innerText = `${newEnergy}/${maxEnergy}`
        localStorage.setItem(energyStorageKey, newEnergy)

        createFloatText(`+${coinsUp}`)
        //если кончилась энергия выходит всплывающее окно что недостаточно энергии
    } else {
        alert("У вас недостаточно энергии для этого действия!")
    }
}

// Функция для увеличения энергии каждую секунду, каждую секунду будет прибавляться +3 энергии если он меньше 5000
function increaseEnergy() {
    let currentEnergy = parseInt(energyValue.innerText.split('/')[0])
    if (currentEnergy < maxEnergy) {
        let newEnergy = currentEnergy + energyIncrement
        if (newEnergy > maxEnergy) {
            newEnergy = maxEnergy
        }
        energyValue.innerText = `${newEnergy}/${maxEnergy}`
        localStorage.setItem(energyStorageKey, newEnergy)
    }
}

// Функция для создания плавающего текста
function createFloatText(text) {
    let floatText = document.createElement("div")
    floatText.classList.add("float-text")
    floatText.innerText = text

    // Установка случайного направления движения
    let floatDirection = Math.random() < 0.5 ? -1 : 1
    floatText.style.setProperty('--float-direction', floatDirection)

    floatContainer.appendChild(floatText)

    setTimeout(() => {
        floatText.remove()
    }, 1000)
}


humsterButton.addEventListener("click", humsterTapHandler)

// функция для добавления монеток, случайное количество добавляется т.к у нас прибыль в час 100к то в течении 60 минут он будет добавлять рандом число пока не достигнет через час 100к
function addRandomCoins() {
    if (currentCoinsPerHour < coinsPerHour) {
        let randomCoins = Math.floor(Math.random() * 10) + 1 // добавлениев случайного числа от 1 до 10
        let currentCoins = parseInt(coinsValue.innerText)
        let newCoins = currentCoins + randomCoins
        coinsValue.innerText = newCoins
        localStorage.setItem(storageKey, newCoins)
        currentCoinsPerHour += randomCoins
    }
}

setInterval(increaseEnergy, 1000)

setInterval(addRandomCoins, 2000)

// это код евгения для инициализации приложения
function initApp() {
    let currentCoins = localStorage.getItem(storageKey)
    coinsValue.innerText = currentCoins ? currentCoins : '0'

    let currentEnergy = localStorage.getItem(energyStorageKey)
    energyValue.innerText = currentEnergy ? `${currentEnergy}/${maxEnergy}` : `${maxEnergy}/${maxEnergy}`
}

initApp()
