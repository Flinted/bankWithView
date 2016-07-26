/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Bank = __webpack_require__(1);
	var BankView = __webpack_require__(2);
	var sampleAccounts =  __webpack_require__(3);
	var Account = __webpack_require__(4);
	
	var state={
	  bankView: null
	}
	
	window.onload = function(){
	  state.bankView =  new BankView(new Bank())
	  state.bankView.initialise(sampleAccounts);
	}
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Bank = function(){
	  this.accounts = [];
	}
	
	Bank.prototype = {
	  addAccount: function(account){
	    this.accounts.push(account);
	  },
	  findAccountByOwnerName:function(ownerName){
	    var foundAccount = null;
	    for (account of this.accounts) {
	      if(account.owner === ownerName){
	        foundAccount = account;
	      }
	    }
	    return foundAccount;
	  },
	  filteredAccounts: function(type){
	    if(!type) return this.accounts
	      var filteredAccounts = [];
	    for (account of this.accounts) {
	      if(type === account.type)
	        filteredAccounts.push(account);
	    }
	    return filteredAccounts;
	  },
	  totalCash:function(type){
	    var total = 0;
	    for (account of this.filteredAccounts(type)) {
	      total += account.amount;
	    }
	    return total;
	  },
	  accountAverage:function(){
	    return this.totalCash()/this.accounts.length;
	  },
	  addInterest: function(){
	    for(account of this.accounts){
	      if(account.type === 'business'){ account.amount = account.amount * 1.1;
	      }else{
	        account.amount = account.amount * 1.05;
	      }
	    }
	  }
	}
	
	
	module.exports = Bank;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Account = __webpack_require__(4);
	
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = [
	  { "owner": "jay",
	    "amount": 125.50,
	    "type": "personal"
	  },
	  { "owner": "val",
	    "amount": 55125.10,
	    "type": "personal"
	  },
	  { "owner": "marc",
	    "amount": 400.00,
	    "type": "personal"
	  },
	  { "owner": "keith",
	    "amount": 220.25,
	    "type": "business"
	  },
	  { "owner": "rick",
	    "amount": 1.00,
	    "type": "business"
	  },
	]


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Account = function(params){
	  this.owner = params.owner;
	  this.amount = params.amount;
	  this.type = params.type;
	};
	
	module.exports = Account;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map