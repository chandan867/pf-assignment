const data = {
  expenseData: [
    {
      amount: 20,
      startDate: "2020-05-01T00:00:00.000Z",
    },
    {
      amount: 30,
      startDate: "2020-03-01T00:00:00.000Z",
    },
  ],
  revenueData: [
    {
      amount: 60,
      startDate: "2020-03-01T00:00:00.000Z",
    },
    {
      amount: 0,
      startDate: "2020-02-01T00:00:00.000Z",
    },
    {
      amount: 10,
      startDate: "2020-03-01T00:00:00.000Z",
    },
    {
      amount: 40,
      startDate: "2020-01-01T00:00:00.000Z",
    },
  ],
};

// function to check if a date is already present in any one of the array
function checkIfAlready(array, date) {
  entered_date = date.split("-")[0] + date.split("-")[1];
  for (let i = 0; i < array.length; i++) {
    let checkingDate =
      array[i].startDate.split("-")[0] + array[i].startDate.split("-")[1];
    if (checkingDate == entered_date) return i;
  }
  return -1;
}

//to combine expenditure of same months and year
let modified_expenditure = [];
for (let j = 0; j < data.expenseData.length; j++) {
  let returned_index = checkIfAlready(
    modified_expenditure,
    data.expenseData[j].startDate
  );
  if (returned_index != -1) {
    modified_expenditure[returned_index].amount += data.expenseData[i].amount;
  } else {
    //enter status as zero
    modified_expenditure.push({
      amount: data.expenseData[j].amount,
      startDate: data.expenseData[j].startDate,
      included: false,
    });
  }
}

//to combine income of same months and year
let modified_income = [];
for (let k = 0; k < data.revenueData.length; k++) {
  let returned_index = checkIfAlready(
    modified_income,
    data.revenueData[k].startDate
  );
  if (returned_index != -1) {
    modified_income[returned_index].amount += data.revenueData[k].amount;
  } else {
    modified_income.push({
      amount: data.revenueData[k].amount,
      startDate: data.revenueData[k].startDate,
      // included: false,
    });
  }
}

//subtracting income and expenditure to get the balance

let ans = [];
for (let i = 0; i < modified_income.length; i++) {
  let returned_index = checkIfAlready(
    modified_expenditure,
    modified_income[i].startDate
  );
  if (returned_index != -1) {
    ans.push({
      amount:
        modified_income[i].amount - modified_expenditure[returned_index].amount,
      startDate: modified_income[i].startDate,
    });
    modified_expenditure[returned_index].included = true;
  } else {
    ans.push(modified_income[i]);
  }
}
//including the remaining expenses with negative sign
// let largestYearMonth=
for (let i = 0; i < modified_expenditure.length; i++) {
  if (modified_expenditure[i].included == false)
    ans.push({
      amount: -modified_expenditure[i].amount,
      startDate: modified_expenditure[i].startDate,
    });
}

ans.sort(function (a, b) {
  return new Date(a.startDate) - new Date(b.startDate);
});

console.log(ans);


//this code can be optimized if we use some database to store data because we can query using aggregate functions. Like in MongoDB there is
// timeSeries data collection which can be used for such purposes

//will try to add 0 to the missing months in coming git commits
