// function connectToMetaMask() {
//     ethereum.enable().then(result => {
//         console.log("Account: ",result);
//         document.getElementById("Connected").innerHTML=result;
//     })
// }

function connectToMetaMask() {
    // Add the script tag for web3.js
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js';
    script.onload = function() {
      // Web3 library is loaded, proceed with the code
  
      if (typeof ethereum !== 'undefined') {
        ethereum.enable().then(accounts => {
          if (accounts.length > 0) {
            const address = accounts[0];
            console.log("Connected account:", address);
            document.getElementById("Connected").innerHTML = address.slice(0, 7) + "...." + address.slice(-5);
            // document.getElementById("eth-balance").innerHTML = balance;
            // Initialize web3 using the current provider
            const web3 = new Web3(ethereum);

            const contractAddress = '0x5691a4c27C4cff4F043347B693be15C4fcbDe5CE';
const contractABI =  [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

myContract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("Contract Object: ",myContract);

  



    window.addEventListener('load', function () {
        if (typeof window.ethereum !== 'undefined') {
          // Request account access if needed
          window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(function (accounts) {
              const connectedAddress = accounts[0];
      
              // Replace 'myContract' with your ERC20 token contract instance
              myContract.methods.balanceOf(connectedAddress).call()
                .then(function (balance) {
                  console.log('Token Balance:', balance);
                  // Add any additional handling logic for the token balance
      
                  // Update the token balance on the website
                  document.getElementById('Token-balance').innerText = 'Token Balance: ' + balance;
                })
                .catch(function (error) {
                  console.error('Token Balance Error:', error);
                  // Add any error handling logic
                });
            })
            .catch(function (error) {
              console.error('Account Error:', error);
              // Add any error handling logic for retrieving accounts
            });
        } else {
          console.error('Ethereum provider not found');
          // Add handling logic for when Ethereum provider is not available
        }
      });
      



      window.addEventListener('load', function () {
        getBalance();
      });
      
      function getBalance() {
        if (typeof window.ethereum !== 'undefined') {
          // Request account access if needed
          window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(function (accounts) {
              const connectedAddress = accounts[0];
            
      
              // Get the balance of the connected address
              myContract.methods.balanceOf(connectedAddress).call()
                .then(function (balance) {
                  console.log('Balance:', balance);
      
                  document.getElementById('balance').innerText = 'Balance of Account: ' + balance;
                  // Add any additional handling logic for the balance
                })
                .catch(function (error) {
                  console.error('Balance Error:', error);
                  // Add any error handling logic
                });
            })
            .catch(function (error) {
              console.error('Account Error:', error);
              // Add any error handling logic for retrieving accounts
            });
        } else {
          console.error('Ethereum provider not found');
          // Add handling logic for when Ethereum provider is not available
        }
      }
      

  ////////////////////////////////////working
            web3.eth.getBalance(address)
              .then(balance => {
                console.log("Account balance:", web3.utils.fromWei(balance, 'ether'), "ETH");
                // document.getElementById("eth-balance").innerHTML = "Balance : "+balance+" you have ";
                document.getElementById("eth-balance").innerHTML = "Account balance:"+ web3.utils.fromWei(balance, 'ether')+ " ETH"

              })
              .catch(error => {
                console.error("Error getting account balance:", error);
              });
          } else {
            console.log("No connected accounts found");
          }
        })
        .catch(error => {
          console.error("Error connecting to MetaMask:", error);
        });
      } else {
        console.log("MetaMask extension not detected");
      }
    };
    document.head.appendChild(script);
  }
  
  // Rest of your code remains the same
  

  ethereum.on('disconnect', function(error) {
    // Handle the disconnect event
    if (error) {
      console.error("Error disconnecting from MetaMask:", error);
    } else {
      console.log("Disconnected from MetaMask");
    }
  });
  



