const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

/*
* connect to ethereum node
*/ 
const ethereumUri = 'http://192.168.1.106:8540';
const address = '0x007802C7D8247c09a459030830223B61a7C90Ba1';

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));

if(!web3.isConnected()){
    throw new Error('unable to connect to ethereum node at ' + ethereumUri);
}else{
    console.log('connected to ehterum node at ' + ethereumUri);

let source = fs.readFileSync("./contracts/BasicToken.sol", 'utf8');
console.log('compiling contract...');
let compiledContract = solc.compile(source);
console.log('done');
for (let contractName in compiledContract.contracts) {
    // code and ABI that are needed by web3 
    // console.log(contractName + ': ' + compiledContract.contracts[contractName].bytecode);
    // console.log(contractName + '; ' + JSON.parse(compiledContract.contracts[contractName].interface));
    var bytecode = compiledContract.contracts[contractName].bytecode;
    var abi = JSON.parse(compiledContract.contracts[contractName].interface);
}

let coinbase = web3.eth.coinbase;
    console.log('coinbase:' + coinbase);
    let balance = web3.eth.getBalance(coinbase);
    console.log('balance:' + web3.fromWei(balance, 'ether') + " ETH");
    let accounts = web3.eth.accounts;
    console.log(accounts);
    
    if (web3.personal.unlockAccount(address, 'node1')) {
        console.log(`${address} is unlocaked`);
    }else{
        console.log(`unlock failed, ${address}`);
    }

console.log(JSON.stringify(abi, undefined, 2));
}
