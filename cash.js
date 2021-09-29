var currencyGlobal = {
  'PENNY':	.01,
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

let totalCashCid = 0;
let cidObj = {} // a mutable copy of cid; we will not manipulate cid param after vals are copied

tallyCid = (cid) => {
  for (let c of cid) {
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
  
  let cashRemainder = cashDiff; // we will increment this var; we leave cashDiff as an immutable var
  
  tallyCid(cid); // updates totalCashCid and cidObj
  (cidObj);
  
  totalCashCid = parseFloat((totalCashCid).toFixed(2));
  
  if (checkExactChange(cashRemainder) === true) {
    return {'status' : 'CLOSED', 'change' :  cid}
  }
  else if (checkInsufficentFunds1(cashRemainder) === true) {
    return {'status' : 'INSUFFICIENT_FUNDS', 'change' :  []}
  }

 
  for (let key of Object.keys(currencyGlobal).reverse()) {
  if (cashRemainder / currencyGlobal[key] > 0) {
    let amount = parseInt(cashRemainder / currencyGlobal[key])
    let avaliableCash = cidObj[key] / currencyGlobal[key];
    if (avaliableCash < amount) {
      amount = avaliableCash;
    }
    let record = [key, amount * currencyGlobal[key]];
    if (record[1] !== 0) {
      cashReturn.push(record)
    }
    cashRemainder = parseFloat((cashRemainder - (currencyGlobal[key] * amount)).toFixed(2));
  }
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
    checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
  )
  