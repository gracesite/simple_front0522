function prodListTemplate(productsArray = []) {
  // Defensive check: Ensure productsArray is an array before using .map()
  const items = Array.isArray(productsArray) ? productsArray : [];

  const listItems = items.map(product => `
    <li style="padding: 12px; margin: 8px 0; border: 1px solid #e0e0e0; border-radius: 4px; list-style: none; background: #fff;">
      <strong>Name:</strong> ${product.name} <br>
      <strong>SKU:</strong> <code style="background: #f4f4f4; padding: 2px 6px; border-radius: 3px;">${product.sku}</code> <br>
      <strong>Qty:</strong> ${product.qty || 0}
    </li>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Product Catalog</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; background: #fafafa; color: #333;">
      <h1 style="border-bottom: 2px solid #333; padding-bottom: 10px;">Inventory List</h1>
      <ul style="padding: 0;">
        ${listItems.length > 0 ? listItems : '<p style="color: #666;">No products found in the database.</p>'}
      </ul>
    </body>
    </html>
  `;
}

// Export the function so app.js can use it
module.exports = prodListTemplate;
