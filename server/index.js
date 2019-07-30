const http = require("http");
const express = require("express");
const cors = require("cors");

const colyseus = require("colyseus");
const socialRoutes = require("@colyseus/social/express").default;
const ChatRoom = require('./chat_room');
const ChatRoomSchema = require('./chat_room_schema');

const PORT = process.env.PORT || 2567;

process.on('unhandledRejection', r => console.log(r));

const app = new express();
const gameServer = new colyseus.Server({
  server: http.createServer(app)
});

// allow CORS
app.use(cors());

// bind @colyseus/social
app.use("/", socialRoutes);

// Register ChatRoom as "chat"
gameServer.register("chat", ChatRoom);
gameServer.register("chat_schema", ChatRoomSchema);

app.get("/something", function (req, res) {
    console.log("something!", process.pid);
    res.send("Hey!");
});

// Attach to port
gameServer.listen(PORT);

console.log("Listening on ws://localhost:" + PORT);
