const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const prodListTemplate = require("./prodListTemplate");

app.get("/", (req, res) => res.type('html').send(html));
app.get("/list_products", async (req, res) => {
  try {
    // 1. Call the external API
    const response = await fetch('https://simple20260520-repo-simple20260515.onrender.com/products');
    const data = await response.json();

    // 2. Send the data back to the client as JSON
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
app.get("/format_products", async (req, res) => {
  try {
    // 1. Call the external API
    const response = await fetch('https://simple20260520-repo-simple20260515.onrender.com/products');
    const data = await response.json();

    // 2. integrate with HTML template
    res.type('html').send(renderTemplate(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});
app.get("/format_products2", async (req, res) => {
  try {
    // 1. Call the external API
    const response = await fetch('https://simple20260520-repo-simple20260515.onrender.com/products');
    const products = await response.json();

    // 2. integrate with HTML template
    console.log('--->>> products.data=', products.data);
    res.type('html').send(prodListTemplate(products.data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;


function renderTemplate(products) {
  // Note: products is an object.  products.data is an array
  const listItems = products.data.map(product => `
    <li style="padding: 10px; margin: 10px 0; border: 1px solid #ddd; list-style: none;">
      <strong>Name:</strong> ${product.name} <br>
      <strong>SKU:</strong> ${product.sku} <br>
      <strong>Qty:<strong> ${product.qty || 0 }
    </li>
  `).join('');
  console.log('--->>> listItems=', listItems);
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="/prodListStyle.css">
      </head>
      <body>
        <h1> The final API Results 2026-05-22</h1>
        <ul style="padding: 0;">
          ${listItems.length > 0 ? listItems : '<p>No products found in the database.</p>'}
        </ul>
      </body>
    </html>
  `;
}
  
const htmlProdList = `
<!DOCTYPE html>
<html>
<body>
    <h1>API Data Integration</h1>
    <div id="content">Loading...</div>

    <script>
        // 3. Frontend Integration
        async function loadData() {
            const res = await fetch('/list_products');
            const data = await res.json();
            document.getElementById('content').innerText = JSON.stringify(data, null, 2);
        }
        loadData();
    </script>
</body>
</html>
`;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`
