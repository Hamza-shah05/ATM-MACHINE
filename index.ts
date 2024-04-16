#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Initialize user balance and pin code  
let myBalance = 10000;
let mypin = 56789

// Print welcome message
console.log(chalk.white.bgBlue("\n \tWelcome to codee with hamza ATM-Machine\n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.green.bold("Enter your pin code:")
    }
])
if(pinAnswer.pin === mypin){
    console.log(chalk.green.bold("\n \tPin is Correct, Login Successfully\n"))
    // console.log(`Current Account Balanse is:  ${myBalance}`)

    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow.bold("Select an operation:"),
            choices: ["Withdraw Ammount", "Check Balance"]
        }
    ])

    if(operationAns.operation === "Withdraw Ammount"){
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.yellow.bold("Select a withdrawal method"),
                choices: ["FastCash", "Enter Amount" ]
            }
        ])
        if(withdrawAns.withdrawMethod ==="FastCash"){
            let fastcashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ])
            if(fastcashAns.fastCash > myBalance){
                console.log(chalk.red.bold("Insufficient Balance"))
            }
            else{
                myBalance -= fastcashAns.fastCash
                console.log(`${chalk.green.bold(fastcashAns.fastCash)} withdraw Successfully`)
                console.log(`Your Remainig Balance is: ${chalk.green.bold(myBalance)}`)
            }
        }

        else if(withdrawAns.withdrawMethod ==="Enter Amount"){
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number", 
                    message: "Enter the amount to withdraw:"
                }
            ])
            if(amountAns.amount > myBalance){
                console.log(chalk.red.bold("Insufficient Balance"));
            }
            else{
                myBalance = amountAns.amount;
                console.log(`${chalk.green.bold(amountAns.amount)} Withdraw Successfully`)
                console.log(`Your Remainig Balance is: ${chalk.green.bold(myBalance)}`)
            }
        }
        
    }
    else if(operationAns.operation === "Check Balance"){
        console.log(`Your Account Balance is: ${chalk.green.bold(myBalance)}`);
    }
}
else{
    console.log(chalk.red.bold("Pin is Incorrect, Try Again!"));
}