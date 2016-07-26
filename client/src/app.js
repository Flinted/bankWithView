var Bank = require('./bank/bank.js');
var BankView = require('./bank/bank_view.js');
var sampleAccounts =  require('./sample.json');
var Account = require('./bank/account.js');

var state={
  bankView: null
}

window.onload = function(){
  state.bankView =  new BankView(new Bank())
  state.bankView.initialise(sampleAccounts);
}

