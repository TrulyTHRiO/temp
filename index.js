import { WebSocketServer } from "ws"
import { writeFile } from "fs"
import { readFileSync } from "fs"
import { parse } from "path";

const port = 5073

const serverInstance = new WebSocketServer({ port: 5073 });

try {
    var brawlers = JSON.parse(readFileSync("./brawlers.json"))
    console.log(brawlers)
} catch {
    var brawlers = {

    }
}

serverInstance.on('connection', function connection(client) {
    console.log("connected")
    client.on('message', function message(data) {
        console.log(data)
        let parseData = JSON.parse(data).array
        console.log(parseData)
        brawlers[parseData[0]] = new brawler(...parseData)
        writeFile("brawlers.json", JSON.stringify(brawlers), (err) => {console.log(err)})
    })
})

class brawler {
    constructor(gnome, attackName, superName, rarity, _class, moveSpeed, reloadSpeed, attackRange, releaseDate, gadgets, starPowers) {
        this.gnome = gnome.toUpperCase()
        this.attackName = attackName.toUpperCase()
        this.superName = superName.toUpperCase()
        this.rarity = rarity.toUpperCase()
        this.class = _class.toUpperCase()
        this.moveSpeed = moveSpeed.toUpperCase()
        this.reloadSpeed = reloadSpeed.toUpperCase()
        this.attackRange = attackRange.toUpperCase()
        this.releaseDate = new Date(releaseDate)
        this.gadgets = gadgets
        this.starPowers = starPowers
    }
}

// class gadget {
//     constructor(name) {
//         this.name = name
//     }
// }

// class starPower {
//     constructor(name) {
//         this.name = name
//     }
// }



