import './style.css'
import geckos from "@geckos.io/client";

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
<div class="flex h-screen">
  <div class="m-auto border-2 text-center">
    <button id="submit" class="rounded-sm bg-green-600 py-2 px-4 text-white hover:bg-green-400">Hello Server</button>
    <p class="m-auto py-2 font-bold"></p>
  </div>
</div>
`;

const App : any = {
  channel: geckos({ url: "http://localhost", port: 4000 }),
  init: () => {
    App.CreateConnection();
    App.HelloServer();
    App.helloClient();
  },
  CreateConnection: () => {
    App.channel.onConnect((error: any) => {
      if (error) console.log(error)
    })
  },
  HelloServer: () => {
    const button = document.querySelector<HTMLButtonElement>('#submit')!;
    button.addEventListener('click', (e: Event) => {
      e.preventDefault();
      App.channel.emit('helloServer', `Hello Server i'm ${App.channel.id}`);
    })
  }
}

App.helloClient = () => {
  App.channel.on('helloClient', (data: any) => {
    const response = document.querySelector<HTMLParagraphElement>('p')!;
    response.textContent = data.message;
  })
}

App.init()