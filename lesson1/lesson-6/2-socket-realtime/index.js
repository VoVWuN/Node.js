<html>
  <head>
    <title>Mfc logs</title>
    <script
      src="https://cdn.socket.io/4.5.4/socket.io.min.js"
      integrity="sha384-/KNQL8Nu5gCHLqwqfQjA689Hhoqgi2S84SNUxC3roTe4EhJ9AfLkp8QiQcU8AMzI"
      crossorigin="anonymous"
    ></script>
  </head>

  <body>
    <h1>Elecronic queue</h1>
    <div id="app"></div>
  </body>
  <script type="text/javascript">
    const socket = io("localhost:3001");
    socket.on("connect", () => {
      console.log("Connection with localhost:3001 created");
    });

    socket.on("server-msg", (mess) => {
      const app = document.getElementById("app");
      const str = document.createElement("p");
      str.innerHTML = `${mess.type} - ${mess.payload}`;
      app.appendChild(str);
    });
  </script>
</html>