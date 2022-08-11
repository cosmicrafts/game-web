const fs = require("fs");
const data = require("./input.js");

let minted = JSON.parse(fs.readFileSync("./minted.json"));
let codes = JSON.parse(fs.readFileSync("./giftcodes.json"));

let reg = '(vec{';
for(let i = 0; i < data.length; i++){
    let faction = (data[i].attributes.Faction === 1) ? "Alliance" : "Spirats";
    let code = codes[i].split("/");
    code = (code.length > 0) ? code[code.length - 1] : code[0];
    reg += 'record{batch=1;faction=\\"' + faction + '\\";shipName=\\"' + data[i].tags[0] + '\\";code=record{id=' + minted[i] + ';code=\\"' + code + '\\";};};';
}
reg += '})';

fs.writeFileSync("./codes.txt", reg);