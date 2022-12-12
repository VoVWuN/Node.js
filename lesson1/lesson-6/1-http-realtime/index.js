<html>
  <head>
    <title>Mfc logs</title>
  </head>

  <body>
    <h1>Elecronic queue</h1>
    <div id="app"></div>
  </body>
  <script type="text/javascript">
    setInterval(() => {
      fetch("http://localhost:3001/api", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          const app = document.getElementById("app");
          app.innerHTML = "";
          for (const mess of response) {
            var str = document.createElement("p");
            str.innerHTML = `${mess.type} - ${mess.payload}`;
            app.appendChild(str);
          }
        });
    }, 1000);
  </script>
</html>