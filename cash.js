// global var for hardcoded values of bills and currency

var currencyGlobal = {
  'PENNY': .01,
  'NICKEL': .05,
  'DIME': 0.10,
  'QUARTER':	0.25,
  'ONE'	: 1.00,
  'FIVE' : 5.00,
  'TEN' : 10.00,
  'TWENTY' : 20.00,
  'ONE HUNDRED' : 100
}

// declare both as global var

let totalCashCid = 0; // sum of all cash in the cid parameter
let cidObj = {} // a mutable copy of cid; we will not manipulate cid param after vals are copied

tallyCid = (cid) => {
  for (let c of cid) { // for each type of cash
    totalCashCid += c[1]; // add up all bills and coins in the cid and store in a global var
    cidObj[c[0]] = c[1]; // copy cid to cidObj
  }
}

// checks if exact change due and amount in register (bussiness logic requires seperate status)
checkExactChange = (cashRemainder) => {
  if (cashRemainder == totalCashCid) {
    return true;
  }
  return false
}

// checks if change due is greater than available amount in cash register
checkInsufficentFunds1 = (cashRemainder) => {
   if (cashRemainder > totalCashCid) {
     return true;
  }
  return false;
}

checkCashRegister = (price, cash, cid) => {
  let cashReturn = []; // this arr to be returned after operations
  const cashDiff = cash - price; // the amount of change due
  
  let cashRemainder = cashDiff; // we will manipulate this mutable var; we leave cashDiff as an immutable var
  
  tallyCid(cid); // updates totalCashCid and cidObj
  
  totalCashCid = parseFloat((totalCashCid).toFixed(2)); // currency has 2 decimal places
  
  if (checkExactChange(cashRemainder) === true) {  // see function documentation
    return {'status' : 'CLOSED', 'change' :  cid}
  }
  else if (checkInsufficentFunds1(cashRemainder) === true) { // see function documentation
    return {'status' : 'INSUFFICIENT_FUNDS', 'change' :  []}
  }
 
  // divisible by hundred's bill
  if (cashRemainder / 100 > 0) {
    let hundredDollar = parseInt(cashRemainder / 100); // get number of one hundred bills that divide into the remaining cash (cashRemainder)
    let avaliableCash = cidObj['ONE HUNDRED'] / 100; // get the number of one hundred bills available to use base on # of one hundred bills in cid param
    if (avaliableCash < hundredDollar) { // the one hundred bill fits in, but not enough bills in register to give full amount ie. 300 % 3 One Hundred bills gives 3 One Hundred bills, but only 2 One Hundred bills avaliable, so simply give 2 One hundred bills, because its as close as we can get to close the negative balance
      hundredDollar = avaliableCash; // there are less one hundred bills in cid than can divide into cashRemainder
    }
    let hundredRecord = ['ONE HUNDRED', hundredDollar * 100]; // record the # of one hundred bills that can fit and are available to reduce the balance of cashRemainder
    if (hundredRecord[1] !== 0) { // only record bills with at least 1 bill; ignore bills with 0 qty
      cashReturn.push(hundredRecord)
    }
    // decr the cashRemainder value by # of one hundred bills times the value of the one hundred bills
    cashRemainder = parseFloat((cashRemainder - (100 * hundredDollar)).toFixed(2));; // b/c in this if statement, assume at least 1 One hundred bill was added to the cashReturn arr
  }
  
  // compare rest to one hundred bill documentation
  // divisible by twenty's bill
  if (cashRemainder / 20 > 0) {
    let twentDollar = parseInt(cashRemainder / 20);
    let avaliableCash = cidObj['TWENTY'] / 20;
    if (avaliableCash < twentDollar) {
      twentDollar = avaliableCash;
    }
    let twentRecord = ['TWENTY', twentDollar * 20];
    if (twentRecord[1] !== 0) {
      cashReturn.push(twentRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (20 * twentDollar)).toFixed(2));
  }

  // divisible by ten's bill
  if (cashRemainder / 10 > 0) {
    let tenDollar = parseInt(cashRemainder / 10);
    let avaliableCash = cidObj['TEN'] / 10;
    if (avaliableCash < tenDollar) {
      tenDollar = avaliableCash;
    }
    let tenRecord = ['TEN', tenDollar * 10];
    if (tenRecord[1] !== 0) {
      cashReturn.push(tenRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (10 * tenDollar)).toFixed(2));
  }

  // divisible by five's bill
  if (cashRemainder / 5 > 0) {
    let fiveDollar = parseInt(cashRemainder / 5);
    let avaliableCash = cidObj['FIVE'] / 5;
    if (avaliableCash < fiveDollar) {
      fiveDollar = avaliableCash;
    }
    let fiveRecord = ['FIVE', fiveDollar * 5];
    if (fiveRecord[1] !== 0) {
      cashReturn.push(fiveRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (5 * fiveDollar)).toFixed(2));
  }

  // divisible by one's bill
  if (cashRemainder / 1 > 0) {
    let oneDollar = parseInt(cashRemainder / 1);
    let avaliableCash = cidObj['ONE'] / 1;
    if (avaliableCash < oneDollar) {
      oneDollar = avaliableCash;
    }
    let oneRecord = ['ONE', oneDollar * 1];
    if (oneRecord[1] !== 0) {
      cashReturn.push(oneRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (1 * oneDollar)).toFixed(2));
    (cashRemainder)
  }

  // divisible by quarter
  if (cashRemainder / .25 > 0) {
    let numQuart = parseInt(cashRemainder / .25);
    let avaliableCash = cidObj['QUARTER'] / .25;
    if (avaliableCash < numQuart) {
      numQuart = avaliableCash;
    }
    let quarterRecord = ['QUARTER', numQuart * .25];
    if (quarterRecord[1] !== 0) {
      cashReturn.push(quarterRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (.25 * numQuart)).toFixed(2));
    
  }
  // divisible by dime
  if (cashRemainder / .10 > 0) {
    let numDime = parseInt(cashRemainder / .10);
    let avaliableCash = cidObj['DIME'] / .10;
    if (avaliableCash < numDime) {
      numDime = avaliableCash;
    }
    let dimeRecord = ['DIME', numDime * .10];
    if (dimeRecord[1] !== 0) {
      cashReturn.push(dimeRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (.10 * numDime)).toFixed(2));
  }

  // divisible by nickel's
  if (cashRemainder / .05 > 0) {
    let numNick = parseInt(cashRemainder / .05);
    let avaliableCash = cidObj['NICKEL'] / .05;
    if (avaliableCash < numNick) {
      numNick = avaliableCash;
    }
    let nickRecord = ['NICKEL', numNick * .05];
    if (nickRecord[1] !== 0) {
      cashReturn.push(nickRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (.05 * numNick)).toFixed(2));
  }
  // divisible by pennie's
  if (cashRemainder / .01 > 0) {
    let numPenn = parseInt(cashRemainder / .01);
    let avaliableCash = cidObj['PENNY'] / .01;
    if (avaliableCash < numPenn) {
      numPenn = avaliableCash;
    }
    let pennRecord = ['PENNY', (numPenn * .01)]; // +.04 account for rounding error
    if (pennRecord[1] !== 0) {
      cashReturn.push(pennRecord)
    }
    cashRemainder = parseFloat((cashRemainder - (.01 * numPenn)).toFixed(2));
  }
  // * calc new cashRemainder ie. cashRemainder % 100

  // surgecal site
  let totalInCashReturn = 0;
  for (let cash of cashReturn) {
    totalInCashReturn += cash[1];
  }

  totalInCashReturn = parseFloat((totalInCashReturn).toFixed(2));
  if (cashDiff % totalInCashReturn !== 0 ){
    ("Insufficent 2!")
    return {'status' : 'INSUFFICIENT_FUNDS', 'change' :  []}
  }
  return {status: "OPEN", change: cashReturn}
}


console.log(
    checkCashRegister(17.59, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
  )
  
