import cors from "cors"
import http from "http";
import express from "express"
import geckos  from "@geckos.io/server"

const app = express();
const App = {
	app: app,
	port: 4000,
	statics: "www",
	server: http.createServer(app),
	io: geckos(),
	message: "Server on port on",
	Init: () => {
		App.Middleware()
		App.Geckos()
		App.CreateServer()
	},
	Middleware: () => {
		App.app.use(cors());
		App.app.use(express.json());
		App.app.use(express.static(App.statics));
		App.app.use(express.urlencoded({ extended: true }));
	},
	Geckos: () => {
		App.io.addServer(App.server)
		App.io.onConnection((channel) => {
			console.log("New Connection", channel.id);
			channel.on('helloServer', (data) => {
				channel.emit('helloClient', { message: "Hello Client" });
			})
		})
	},
	CreateServer: () => {
		App.server.listen(App.port, () => {
			console.log(App.message, App.port);
		})
	}
}

App.Init();