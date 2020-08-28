//Question 1-4
const employees = []
const createEmployee = (name, age, salary, hobbies) => {
    const employee = {
        name,
        age,
        salary,
        hobbies
    }
    employees.push(employee)
    return employee
}

const josh = createEmployee('josh', 24, 70000, ['eating', 'coding'])
console.log(josh)

const charles = createEmployee('charles', 22, 45000, ['sleeping', 'shopping'])
console.log(charles)

const mark = createEmployee('mark', 34, 142000, ['dancing', 'shopping'])
console.log(mark)

console.log('Employees:', employees)

//while loop
let i = 0
let sum = 0
while(i<employees.length){
    sum += employees[i].salary
    i++
}
console.log('Using While loop, Total Salary:', sum)

//for loop
let total = 0
for(let i = 0; i < employees.length; i++){
    total += employees[i].salary
}
console.log('Using For loop, Total Salary:', total)

const displayEmployeeInformation = (employees) => {
    console.table(employees)
}

displayEmployeeInformation(employees)


//Question 5
const createEmployeeAsync = (name, age, salary, hobbies) => {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            const employee = {
                name,
                age,
                salary,
                hobbies
            }
            resolve(employee)
        },3000)
    })
    
}

console.log('code started');

(async()=>{
    //peter
    const peter = await createEmployeeAsync('peter', 34, 142000, ['dancing', 'shopping'])
    employees.push(peter)
    console.log(peter)
    //paul
    const paul = await createEmployeeAsync('paul', 22, 45000, ['sleeping', 'shopping'])
    employees.push(paul)
    console.log(paul)
    //ben
    const ben = await createEmployeeAsync('ben', 24, 70000, ['eating', 'coding'])
    employees.push(ben)
    console.log(ben)

    console.log('Employees:', employees)

    displayEmployeeInformation(employees)


})();