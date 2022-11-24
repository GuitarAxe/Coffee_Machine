const input = require('sync-input')

let ingredients = {
    water: 200,
    milk: 50,
    coffee: 15
}

let states = {
    waterState: 400,
    milkState: 540,
    coffeeState: 120,
    cupsState: 9,
    moneyState: 550
}

let quit = false;

while (!quit) {
    let action = input('Write action (buy, fill, take): ');
    switch (action) {
        case 'buy':
            buyCoffee();
            break;
        case 'fill':
            fillMachine();
            break;
        case 'take':
            takeMoney();
            break;
        case 'remaining':
            printMachineState();
            break;
        case 'exit':
            quit = true;
            break;
        default:
            console.log('Unknown action');
            break;
    }
}

function checkAmounts2(water, milk, coffeeBeans) {
    let msg = undefined;
    if (water > states.waterState) {
        msg = `Sorry, not enough water!`;
    } else if (milk > states.milkState) {
        msg = `Sorry, not enough milk!`;
    } else if (coffeeBeans > states.coffeeState) {
        msg = `Sorry, not enough coffee!`;
    } else if (states.cupsState <= 0) {
        msg = `Sorry, not enough cups!`;
    }
    if (!(typeof msg === 'undefined')) {
        console.log(msg);
        return false;
    }
    return true;
}

function printMachineState() {
    console.log(`The coffee machine has:
${states.waterState} ml of water
${states.milkState} ml of milk
${states.coffeeState} g of coffee beans
${states.cupsState} disposable cups
${states.moneyState} of money`);
}

function buyCoffee() {
    let option = input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ');
    let water = 0;
    let milk = 0;
    let coffeeBeans = 0;
    let money = 0;

    switch (option) {
        //For one espresso, the coffee machine needs 250 ml of water and 16 g of coffee beans. It costs $4
        case '1':
            water = 250;
            coffeeBeans = 16;
            money = 4;
            break;
            //For a latte, the coffee machine needs 350 ml of water, 75 ml of milk, and 20 g of coffee beans. It costs $7.
        case '2':
            water = 350;
            milk = 75;
            coffeeBeans = 20;
            money = 7;
            break;
            //And for a cappuccino, the coffee machine needs 200 ml of water, 100 ml of milk, and 12 g of coffee beans. It costs $6.
        case '3':
            water = 200;
            milk = 100;
            coffeeBeans = 12;
            money = 6;
            break;
        case 'back':
            return;
    }
    if (!checkAmounts2(water, milk, coffeeBeans, money)) return;
    states.waterState -= water;
    states.milkState -= milk;
    states.coffeeState -= coffeeBeans;
    states.moneyState += money;
    states.cupsState -= 1;
    console.log('I have enough resources, making you a coffee!');
}

function fillMachine() {
    let waterAmount = parseInt(input('Write how many ml of water you want to add: '));
    let milkAmount = parseInt(input('Write how many ml of milk you want to add: '));
    let coffeeAmount = parseInt(input('Write how many grams of coffee beans you want to add: '));
    let numberOfCups = parseInt(input('Write how many disposable cups you want to add: '));

    states.waterState += waterAmount;
    states.milkState += milkAmount;
    states.coffeeState += coffeeAmount;
    states.cupsState += numberOfCups;
}

function takeMoney() {
    console.log(`I gave you ${states.moneyState}`);
    states.moneyState = 0;
}