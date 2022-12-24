const SHA256 = require("crypto-js/sha256");
const bodyParser = require("Body-Parser");


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
    res.sendFile(htmlfilepath)
    //res.render('confirm');
})
app.get('/voter', function (req, res) {
  
    const htmlfilepath = path.join(__dirname, 'views', 'pages/voting.html')
    res.sendFile(htmlfilepath)
    //res.render('confirm');
    app.post("/voter", function (req,res){
        const divya = [1,1];
        const karthi =[1,1];
        const harish =[];
        const akshaya =[];
        const vote1 = req.body.nominee;
        const name = req.body.name;
        const voterid = req.body.voterid;
        const composed = "voterName : "+ name + ", voter ID: " + voterid + ", Voting nominee : " + vote1;
        console.log(composed);

        if (vote1 == 1){
            const push1 = divya.push(1);
            const voter1 = divya.length;
            console.log("total votes for Akshaya " + voter1);
        }else if(vote1 == 2){
            const push2 = karthi.push(1);
            const voter2 = karthi.length;
            console.log("Total vote for Karthi " + voter2);
        }else if (vote1 == 3 ){
            const push3 = harish.push(1);
            const voter3 = harish.length;
            console.log("Total vote for Divya " + voter3);
        }
        else if (vote1 == 4){
            const push4 = akshaya.push(1);
            const voter4 = akshaya.length;
            console.log("Total votes for Aruna "+voter4);
        } else{
            console.log("enter the valid vote");
        }


    })
    
})
app.get('/thank', function (req, res) {
    const htmlfilepath = path.join(__dirname, 'views', 'pages/final.html')
    res.sendFile(htmlfilepath)
    

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
app.listen(4000);