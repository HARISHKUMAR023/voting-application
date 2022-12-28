
let p1 = 0;
let p2 = 0;
let p3 = 0;
let p4 = 0;
let d = '<%-vote.name %>'
let nominee = '<%-voting.nominee %>';
for (i = 0; i <= '<%voting.length %>'; i++) {
    if (nominee == 1) {
        p1 = p1 + 1
        console.log(p1)
    }
    else if (nominee == 2) {
        p2 = p2 + 1
        console.log(p2)
    }
    else if (nominee == 3) {
        p3 = p3 + 1
        console.log(p3)
    }
    else if (nominee == 4) {
        p4 = p4 + 1
        console.log(p4)
    }
    else {
        console.log("no one is voted")
    }

}
let text1 = document.getElementById('total1');
let text2 = document.getElementById('total2');
let text3 = document.getElementById('total3');
let text4 = document.getElementById('total4');
text1.innerText = d;
text2.innerText = p2;
text3.innerText = p3;
text4.innerText = p4;