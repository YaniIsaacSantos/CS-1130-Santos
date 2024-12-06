document.addEventListener("DOMContentLoaded", () => {

    const setupConversion = (inputId, resultId, conversionFunc, unitLabel) => {
        const input = document.getElementById(inputId);
        const result = document.getElementById(resultId);

        if (input && result) {
            input.addEventListener("input", () => {
                const value = parseFloat(input.value);
                if (isNaN(value)) {
                    result.innerText = ''; 
                } else {
                    result.innerText = `${conversionFunc(value).toFixed(2)} ${unitLabel}`;
                }
            });
        }
    };

    const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
    const toCelsius = (fahrenheit) => (fahrenheit - 32) * 5 / 9;
    const toFeet = (meters) => meters * 3.28084;
    const toMeters = (feet) => feet / 3.28084;

    setupConversion("celsius-value", "celsius-result", toFahrenheit, "°F");
    setupConversion("fahrenheit-value", "fahrenheit-result", toCelsius, "°C");
    setupConversion("meters-value", "meters-result", toFeet, "ft");
    setupConversion("feet-value", "feet-result", toMeters, "m");

    // Income tax calculator
    const taxableIncomeInput = document.getElementById("taxable-income");
    const taxResult = document.getElementById("tax-result");

    if (taxableIncomeInput && taxResult) {
        taxableIncomeInput.addEventListener("input", () => {
            const income = parseFloat(taxableIncomeInput.value);

            const calculateTax = (income) => {
                if (income <= 250000) return 0;
                if (income <= 400000) return (income - 250000) * 0.2;
                return 30000 + (income - 400000) * 0.25;
            };

            if (isNaN(income) || income < 0) {
                taxResult.textContent = "Please enter a valid income.";
            } else {
                taxResult.textContent = `Calculated Tax: PHP ${calculateTax(income).toFixed(2)}`;
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    function calculate() {
      let n = document.getElementById('number').value;
      n = parseInt(n); 
  
      if (isNaN(n) || n <= 0) {
        document.getElementById('factorial-result').innerHTML = "";
        document.getElementById('sum-result').innerHTML = "";
        document.getElementById('average-result').innerHTML = "";
        return;
      }
  
      let factorial = 1;
      let i = 1;
      while (i <= n) {
        factorial *= i;
        i++;
      }
  
      let sum = 0;
      let j = 1;
      do {
        sum += j;
        j++;
      } while (j <= n);
  
      let total = 0;
      for (let k = 1; k <= n; k++) {
        total += k;
      }
      let average = total / n;
  
      document.getElementById('factorial-result').innerHTML = `Factorial of ${n} is: ${factorial}`;
      document.getElementById('sum-result').innerHTML = `Sum of first ${n} numbers is: ${sum}`;
      document.getElementById('average-result').innerHTML = `Average of first ${n} numbers is: ${average.toFixed(2)}`;
    }
  

    document.getElementById('number').addEventListener('input', calculate);
  });
  
  // PAYROLL
let employeeList = [];

function addEmployee() {
    const name = document.getElementById("employee-name").value;
    const daysWorked = parseInt(document.getElementById("days-worked").value);
    const dailyRate = parseFloat(document.getElementById("daily-rate").value);
    const deduction = parseFloat(document.getElementById("deduction-amount").value);

    if (!name || isNaN(daysWorked) || isNaN(dailyRate) || isNaN(deduction)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const grossPay = daysWorked * dailyRate;
    const netPay = grossPay - deduction;

    const employee = {
        name,
        daysWorked,
        dailyRate,
        grossPay,
        deduction,
        netPay
    };

    employeeList.push(employee);

    document.getElementById("employee-name").value = "";
    document.getElementById("days-worked").value = "";
    document.getElementById("daily-rate").value = "";
    document.getElementById("deduction-amount").value = "";

    updatePayrollTable();

    alert(`${name} has been added to the payroll.`);
}

function updatePayrollTable() {
    const tableBody = document.querySelector("#payroll-table tbody");
    tableBody.innerHTML = ""; 

    employeeList.forEach((employee, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.daysWorked}</td>
            <td>${employee.dailyRate.toFixed(2)}</td>
            <td>${employee.grossPay.toFixed(2)}</td>
            <td>${employee.deduction.toFixed(2)}</td>
            <td>${employee.netPay.toFixed(2)}</td>
        `;

        tableBody.appendChild(row);
    });
}

function deleteEmployee() {
    const lineNumber = parseInt(document.getElementById("delete-line").value);

    if (isNaN(lineNumber) || lineNumber < 1 || lineNumber > employeeList.length) {
        alert("Please enter a valid line number.");
        return;
    }

    employeeList.splice(lineNumber - 1, 1);

    updatePayrollTable();

    alert(`Employee at line ${lineNumber} has been deleted.`);
}
