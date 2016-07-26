var Account = require('./account.js');

var BankView = function(bank){
  this.bank = bank
}

BankView.prototype = {
  initialise: function(sampleAccounts){
    for(accountData of sampleAccounts) {
      this.bank.addAccount(new Account(accountData));
    } 
    this.updateDisplay(this.bank.accounts);
    this.setListeners();
  },

  setListeners: function(){
    var goInterest = document.getElementById('addInterest');
    var accountList = document.getElementById('accountType');
    accountList.addEventListener("change", function(event){
      this.showFilter(event.target.value);
    }.bind(this));

    goInterest.onclick = function(){
      this.bank.addInterest();
      this.updateDisplay(this.bank.accounts);
    }.bind(this);
  },

  showFilter: function(type){
    var filtered = [];
    if(type === "all"){
      filtered = this.bank.accounts;
      this.updateDisplay(filtered);
    }else{
      this.updateDisplay(this.bank.filteredAccounts(type));
    }
  },

  updateDisplay: function(accounts){
    if(!accounts){ var data = this.bank.accounts}else{
      var data= accounts;
    }
    var total = document.getElementById('total');
    total.innerText = "Total funds: £" + this.bank.totalCash().toFixed(2);
    var average = document.getElementById('average');
    average.innerText= "Avg funds: £" + this.bank.accountAverage().toFixed(2);
    var ul = document.getElementById('accounts');
    ul.innerHTML="";
    for (account of data){
      var li = document.createElement('li');
      li.innerText = account.owner + ": £" + account.amount.toFixed(2);
      ul.appendChild(li);
    }
  }
}


module.exports = BankView;