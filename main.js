const SHA256 = require("crypto-js/sha256");

// serving the file
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');


const express = require('express');
const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//static file serving

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
// end of serving
//html
app.get('/', function (req, res) {
    const htmlfilepath = path.join(__dirname, 'views', 'index.html')
    res.sendfile(htmlfilepath)
    //res.render('confirm');
})
app.get('/voter', function (req, res) {
    const htmlfilepath = path.join(__dirname, 'views', 'pages/voting.html')
    res.sendfile(htmlfilepath)
    //res.render('confirm');
})
app.get('/thank', function (req, res) {
    const htmlfilepath = path.join(__dirname, 'views', 'pages/final.html')
    res.sendfile(htmlfilepath)
    //res.render('confirm');
})
//block convering
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();

    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

    }
}
class Blockchain {
    constructor() {
        this.vote = [this.createGenesisBlock()];

    }
    createGenesisBlock() {
        return new Block(0, "28/11/2022", "genesisBlock", "0");
    }
    getLatestBlock() {
        return this.vote[this.vote.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.vote.push(newBlock);

    }
}

let voting = new Blockchain();
voting.addBlock(new Block(1, "28/11/2022", { amount: 1 }))
voting.addBlock(new Block(2, "28/11/2022", { amount: 1 }))

console.log(JSON.stringify(voting, null, 4));

//app lisean
app.listen(3000);