import { createServer } from "wsnet-server";

let counter = 0;
let clients = [];

createServer({ port: 8080 }, async client => {
    
    clients.push(client);

    client.say("set-counter", ++counter);

    client.onSay("increase-counter", () => {
        counter++;
        client.say("set-counter", counter);
        // Create a copy of the clients array for safe iteration
        [...clients].forEach(_client => _client.say("set-counter", counter));
    });

    client.onclose = () => {
        clients = clients.filter(c => c !== client);
    };

});