const web3 = new Web3(window.ethereum);

// Function to check if MetaMask is available
async function checkMetaMaskAvailability() {
	if (window.ethereum) {
		try {
			// Request access to MetaMask accounts
			await window.ethereum.request({ method: "eth_requestAccounts" });
			return true;
		} catch (err) {
			console.error("Failed to connect to MetaMask:", err);
			return false;
		}
	} else {
		console.error("MetaMask not found");
		return false;
	}
}

// Event listener for MetaMask button
document.getElementById("metamask").addEventListener("click", async () => {
	const metaMaskAvailable = await checkMetaMaskAvailability();
	if (metaMaskAvailable) {
		await ConnectWallet();
	} else {
		// MetaMask not available
		console.error("MetaMask not found");
		// Update status
		document.getElementById("status1").innerText = "MetaMask not found";
		// document.getElementById("status1").style.color = "red";
	}
});

// ConnectWallet();


//Function to connect to MetaMask
async function ConnectWallet() {
	try {
		// Request access to MetaMask accounts
		await window.ethereum.request({ method: "eth_requestAccounts" });
		// Update status
		document.getElementById("metamask").innerText = "Connected to MetaMask";
		document.getElementById("metamask").style.backgroundColor = "green";
		document.getElementById("metamask").style.border = "green";

		document.getElementById("thankyou").innerText = "You have connected to Metamask wallet";
		// document.getElementById("thankyou2").style.backgroundColor="green";


		// Create a new button element
		const newButton = document.createElement("button");

		// Set attributes and text for the button
		newButton.setAttribute("type", "button");
		newButton.setAttribute("class", "btn btn-info");
		newButton.innerText = "Buy/Sell";

		// Get the container element where you want to append the button
		const buttonContainer = document.getElementById("buttonContainer");

		// Append the new button to the container


		// setTimeout(() => {
		// 	window.location.href = 'buysell.html';
		// }, 4000);
		// buttonContainer.appendChild(newButton);

		const countdownSeconds = 5;
		const redirectUrl = 'buysell.html';
		countdownRedirect(countdownSeconds, redirectUrl);


	} catch (err) {
		// Handle error
		// console.error("Failed to connect to MetaMask:", err);
		// Update status
		// document.getElementById("status1").innerText ="Failed to connect to MetaMask";
		// document.getElementById("status1").style.color = "red";
	}
}

/// This function for redirect to buy and sell page after connected to wallet
// if wallet is not conncted to the frontenf this will not redirect to buy and sell page
function countdownRedirect(seconds, url) {
	let timeLeft = seconds;

	const interval = setInterval(() => {
		// Show time on the frontend
		document.getElementById('countdown').innerText = timeLeft;

		timeLeft--;

		if (timeLeft < 0) {
			clearInterval(interval);
			window.location.href = url; // Redirect to 'buysell.html' page after the countdown finishes
		}
	}, 1000);
}






// Call ConnectWallet() when the page finishes loading
window.onload = async function () {
	const metaMaskAvailable = await checkMetaMaskAvailability();
	if (metaMaskAvailable) {
		await ConnectWallet();
		await AccountInformation();
		await getTokenPrice();
		await getTokenBalance();
		document.getElementById("metamask").innerText = "Connected to MetaMask";
		document.getElementById("metamask").style.backgroundColor = "green";
		document.getElementById("metamask").style.border = "green";
	} else {
		// MetaMask not available
		console.error("MetaMask not found");
		// Update status
		//   document.getElementById("status1").innerText = "MetaMask not found";
		//   document.getElementById("status1").style.color = "red";
	}
};

// Event Listener for Account Information
document.getElementById("accountbutton").addEventListener("click", async () => {
	const metaMaskAvailable = await checkMetaMaskAvailability();
	if (metaMaskAvailable) {
		await AccountInformation();
	}
});




//Function to call the Account Information
async function AccountInformation() {
	const account = await web3.eth.getAccounts();
	const from = account[0];
	const balanceInWei = await web3.eth.getBalance(from);
	const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
	const gasPrice = await web3.eth.getGasPrice();
	const gasPriceInEth = web3.utils.fromWei(gasPrice, "ether");

	// Display the account information
	// document.getElementById("status2").innerText =
	//   "Account Address: " +
	//   from +
	//   "\nBalance: " +
	//   balanceInEth +
	//   " ETH" +
	//   "\nGas Price: " +
	//   gasPriceInEth;

	// document.getElementById("status2").style.color = "white";

	const shortenEthereumAddress = (address) => address.slice(0, 5) + '....' + address.slice(-3);

	document.getElementById("address").innerText = shortenEthereumAddress(from);



	// document.getElementById("address").innerText = from;
	// document.getElementById("tokenbalance").innerText= "";
	document.getElementById("polygonbala").innerText = balanceInEth;
}

// Event Listener for Send Transaction
document.getElementById("sendButton").addEventListener("click", async () => {
	const metaMaskAvailable = await checkMetaMaskAvailability();
	if (metaMaskAvailable) {
		await SendFunction();
	}
});

//Function to call the Send Function
async function SendFunction() {
	// Get input values
	const to = document.getElementById("addressinput").value;
	const amount = document.getElementById("amountinput").value;

	// Check if both to and amount are provided
	if (!to || !amount) {
		console.error("To and amount are required");
		return;
	}

	// Convert amount to wei (1 ether = 10^18 wei)
	const amountWei = web3.utils.toWei(amount, "ether");

	// Get the selected account from MetaMask
	const accounts = await web3.eth.getAccounts();
	const from = accounts[0];

	// Create the transaction object
	const transaction = {
		from: from,
		to: to,
		value: amountWei,
	};

	// Send the transaction
	try {
		const result = await web3.eth.sendTransaction(transaction);
		console.log("Transaction result:", result);
		// Update status
		document.getElementById("status2").innerText =
			"Transaction sent successfully";
		document.getElementById("status2").style.color = "green";
	} catch (err) {
		// Handle error
		console.error("Failed to send transaction:", err);
		// Update status
		document.getElementById("status2").innerText = "Failed to send transaction";
		document.getElementById("status2").style.color = "red";
	}
}

// Event Listener for Mint Button
document.getElementById("mintbutton").addEventListener("click", async () => {
	const metaMaskAvailable = await checkMetaMaskAvailability();
	if (metaMaskAvailable) {
		await mintNFT();
	}
});



// ***********************************************************************************************


// Request access to the user's accounts (you can do this inside an async function)
// const accounts = await web3.eth.getAccounts();
// const userAccount = accounts[0]; // Assuming the user has at least one account

// Contract Details
const contractAddress = "0x8cD50a5b21F31764628e3466b34D530EDC65ab68"; // Hardcoded contract address

// 0x8cD50a5b21F31764628e3466b34D530EDC65ab68   sepoliya testnet

const contractAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "InvalidShortString",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"name": "StringTooLong",
		"type": "error"
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
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "buyTokens",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimRedeemedGold",
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
				"name": "delegatee",
				"type": "address"
			}
		],
		"name": "delegate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "delegatee",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "nonce",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expiry",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "delegateBySig",
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
				"name": "delegator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "fromDelegate",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "toDelegate",
				"type": "address"
			}
		],
		"name": "DelegateChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "delegate",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "previousBalance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newBalance",
				"type": "uint256"
			}
		],
		"name": "DelegateVotesChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "EIP712DomainChanged",
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
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "deadline",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "permit",
		"outputs": [],
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
		"name": "redeemGold",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "sellTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "setTokenPrice",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "pos",
				"type": "uint32"
			}
		],
		"name": "checkpoints",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint32",
						"name": "fromBlock",
						"type": "uint32"
					},
					{
						"internalType": "uint224",
						"name": "votes",
						"type": "uint224"
					}
				],
				"internalType": "struct ERC20Votes.Checkpoint",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "clock",
		"outputs": [
			{
				"internalType": "uint48",
				"name": "",
				"type": "uint48"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CLOCK_MODE",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "delegates",
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
		"name": "DOMAIN_SEPARATOR",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "eip712Domain",
		"outputs": [
			{
				"internalType": "bytes1",
				"name": "fields",
				"type": "bytes1"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "version",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "chainId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "verifyingContract",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "salt",
				"type": "bytes32"
			},
			{
				"internalType": "uint256[]",
				"name": "extensions",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "timepoint",
				"type": "uint256"
			}
		],
		"name": "getPastTotalSupply",
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
			},
			{
				"internalType": "uint256",
				"name": "timepoint",
				"type": "uint256"
			}
		],
		"name": "getPastVotes",
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
		"name": "getTokenPrice",
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
		"name": "getVotes",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "nonces",
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
		"name": "numCheckpoints",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
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

// Get the contract instance
const contract = new web3.eth.Contract(contractAbi, contractAddress);




// ... (previous code)

// Function to handle the "Buy Tokens" button click
async function handleBuyTokens() {
	const amountToBuyInput = document.getElementById('amountToBuyInput');
	const amountToBuy = amountToBuyInput.valueAsNumber; // Convert the user input to a number

	if (isNaN(amountToBuy) || amountToBuy <= 0) {
		// If the user input is not a valid positive number, show an error message
		alert('Please enter a valid amount greater than 0.');
		return;
	}

	try {
		// Calculate the amount of Ether required to buy the specified amount of tokens
		const tokenPrice = await contract.methods.getTokenPrice().call();
		const ethAmount = amountToBuy * tokenPrice;

		// get account
		const account = await web3.eth.getAccounts();
		const userAccount = account[0]

		// Send the transaction to the contract's "buyTokens" function
		const transaction = await contract.methods.buyTokens(amountToBuy).send({
			from: userAccount,
			value: ethAmount,
		});
		console.log('Transaction successful:', transaction);

		// setTimeout(() => {
		// 	window.location.href = 'buysell.html';

		// 		console.log('website will be redirect after 5 sec');
		// 	  }, 5000);

		window.location.href = 'completetransaction.html';



		// Transaction successful, do something here (e.g., show a success message)

	} catch (error) {
		// Handle errors (e.g., user rejected the transaction or other issues)
		console.error('Error:', error);
		window.location.href = 'failedtrx.html';
	}
}

// Attach the click event listener to the "Buy Tokens" button
const buyTokensButton = document.getElementById('buyTokensButton');
buyTokensButton.addEventListener('click', handleBuyTokens);

// ... (remaining code)





async function getTokenPrice() {
	try {
		const tokenPrice = await contract.methods.getTokenPrice().call();
		console.log('Token Price:', tokenPrice);
		document.getElementById('tokenprice').innerText = tokenPrice + " Matic ";
		return tokenPrice;
	} catch (error) {
		console.error('Error getting token price:', error);
		return null;
	}
}



// Call the function to get the token price
getTokenPrice();




async function getTokenBalance() {
	try {
		//   const currentAccount = await getCurrentAccount();

		const account = await web3.eth.getAccounts();
		const currentAccount = account[0];

		if (!currentAccount) {
			console.error('No account connected.');
			return null;
		}

		// Call the balanceOf function of your ERC20 token contract
		const tokenBalance = await contract.methods.balanceOf(currentAccount).call();
		console.log('Token Balance:', tokenBalance);
		document.getElementById("tokenbalance").innerText = "Token Balance :" + tokenBalance;
		return tokenBalance;
	} catch (error) {
		console.error('Error getting token balance:', error);
		return null;
	}
}

// Call the function to get the token balance of the current connected account
getTokenBalance();



// ... (previous code)

// Function to display the token price on the HTML page
// function displayTokenPrice(price) {
//   const tokenPriceDisplay = document.getElementById('tokenPriceDisplay');
//   tokenPriceDisplay.textContent = `Token Price: ${price} ETH`;
// }

// Function to handle the "Get Token Price" button click
// async function handleGetPrice() {
//   try {
//     const tokenPrice = await getTokenPrice();
//     if (tokenPrice !== null) {
//       displayTokenPrice(tokenPrice);
//     }
//   } catch (error) {
//     console.error('Error getting token price:', error);
//   }
// }

// Attach the click event listener to the "Get Token Price" button
// const getPriceButton = document.getElementById('getPriceButton');
// getPriceButton.addEventListener('click', handleGetPrice);

// ... (remaining code)
