import './style.css'
import geckos from "@geckos.io/client";

const app = document.querySelector<HTMLDivElement>('#app')!

const App = {
  channel : geckos({ url: "http:localhost:4000", port: undefined }),
  init: () => {
    App.CreateConnection();
    App.HelloServer();
  },
  CreateConnection:() => {
    App.channel.onConnect((error) => console.log(error))
  },
  HelloServer: () => {
    App.channel.emit('helloServer', `Hello Server i'm ${App.channel.id}`);
  }
}

App.init()

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
