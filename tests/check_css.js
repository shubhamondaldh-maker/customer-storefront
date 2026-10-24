async function check() {
  const res = await fetch('http://localhost:3000');
  const text = await res.text();
  const links = text.match(/<link[^>]+stylesheet[^>]*>/g) || [];
  console.log('Stylesheet links found in HTML:', links);
  for (const link of links) {
    const hrefMatch = link.match(/href="([^"]+)"/);
    if (hrefMatch) {
      const href = hrefMatch[1];
      const cssRes = await fetch('http://localhost:3000' + href);
      const css = await cssRes.text();
      console.log('CSS URL:', href, 'Length:', css.length);
      console.log('CSS snippet:', css.slice(0, 500));
    }
  }
}
check();
