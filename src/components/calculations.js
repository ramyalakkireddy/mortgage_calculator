export function calculatePayment(principal, years, rate, frequency) {
  let monthlyRate = Math.pow((1+(rate/200)), 1/6)-1;
  let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate), years * 12)));

  switch (frequency) {
    case 'Monthly':
      return monthlyPayment;
    case 'Semi-Monthly':
      return (monthlyPayment/2);
    case 'Bi-Weekly':
      return (monthlyPayment*12/26);
    case 'Weekly':
      return (monthlyPayment*12/52);
    case 'Accelerated Bi-Weekly':
      return (monthlyPayment/2);
    case 'Accelerated Weekly':
      return (monthlyPayment/4);
    default:
      break;
  }
}

export function calculateAmortization(principal, years, rate, frequency) {
  let monthlyRate = Math.pow((1+(rate/200)), 1/6)-1;
  let payment = calculatePayment(principal, years, rate, frequency);
  let timePeriod = '';
  let amortizationPeriod = years;
  let balance = principal;
  let amortization = [];

  switch (frequency) {
    case 'Monthly':
      timePeriod = 12;
      break;
    case 'Semi-Monthly':
      timePeriod = 24;
      monthlyRate = monthlyRate/2;
      break;
    case 'Bi-Weekly':
      timePeriod = 26;
      monthlyRate = monthlyRate*12/26;
      break;
    case 'Weekly':
      timePeriod = 52;
      monthlyRate = monthlyRate*12/52;
      break;
    case 'Accelerated Bi-Weekly':
      timePeriod = 26;
      monthlyRate = monthlyRate/2;
      break;
    case 'Accelerated Weekly':
      timePeriod = 52;
      monthlyRate = monthlyRate/4;
      break;
    default:
      break;
  }

  for (let year=1; year<=amortizationPeriod; year++) {
      let interestN = 0;  //Interest payment for year N
      let principalN = 0; //Principal payment for year N
      for (let m=1; m<=timePeriod; m++) {
        if (balance > payment) {
          let interestM = balance * (monthlyRate); //Interest payment for month m
          let principalM = (payment) - interestM; //Principal payment for month m
          interestN = interestN + interestM;
          principalN = principalN + principalM;
          balance = balance - principalM;
      } else {
        interestN = interestN+(balance * monthlyRate);
        principalN = principalN + balance;
        balance = 0;
      }
    }
    interestN > 0 && amortization.push({year, principalN, interestN, balance});
    }
  return amortization;
}
