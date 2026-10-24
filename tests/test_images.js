const products = require('../data/products.json');

async function testImages() {
  console.log(`Checking ${products.length} images...`);
  for (const p of products) {
    try {
      const res = await fetch(p.image, { method: 'HEAD' });
      if (!res.ok) {
        console.log(`Product ${p.id} (${p.name}): HTTP ${res.status} -> ${p.image}`);
      }
    } catch (e) {
      console.log(`Product ${p.id} (${p.name}): ERROR ${e.message} -> ${p.image}`);
    }
  }
  console.log('Finished testing all product images.');
}

testImages();
