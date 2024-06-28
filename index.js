import { createServer } from "wsnet-server"

const counter = 0
const clients = []

createServer({ port: 8080 }, async client => {
    
    clients.push(client)

    client.say("set-counter", ++counter)

    client.onSay("increase-counter", () => {
        counter++
        clients.forEach(client => client.say("set-counter", counter));
    })

    client.onclose = () => {
        clients = clients.filter(c => c != client)
    }

})