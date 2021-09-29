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

var cidObj = {
  'PENNY': 1.01,
  'NICKEL': 2.05,
  'DIME': 3.1,
  'QUARTER': 4.25,
  'ONE': 90,
  'FIVE': 55,
  'TEN': 20,
  'TWENTY': 200,
  'ONE HUNDRED': 200
}

let cashRemainder = 57.42;
let cashReturn = []

for (let key of Object.keys(currencyGlobal).reverse()) {
  console.log(key);
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
    console.log(cashRemainder)
  }
}

console.log(cashReturn)

/*
if (cashRemainder / 20 > 0) {
    let twentDollar = parseInt(cashRemainder / 20);
    console.log(twentDollar);
    let avaliableCash = cidObj['TWENTY'] / 20;
    console.log(avaliableCash);
    if (avaliableCash < twentDollar) {
      twentDollar = avaliableCash;
    }
    console.log(twentDollar);
    let twentRecord = ['TWENTY', twentDollar * 20];
    console.log(twentRecord)
    if (twentRecord[1] !== 0) {
      cashReturn.push(twentRecord)
    }
    console.log(20 * twentDollar)
    console.log(cashRemainder)
    cashRemainder = parseFloat((cashRemainder - (20 * twentDollar)).toFixed(2));
    console.log(cashRemainder)
  }
  */