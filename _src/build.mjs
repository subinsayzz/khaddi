// Generates the static KHADDI PASHMINA store mock-up pages into the project root.
// Run: node _src/build.mjs   (output is plain HTML + CSS, no runtime JS)
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = 'assets/img/products/';
const C = 'assets/img/craft/';
const I = 'assets/img/';

// Outlined logo (KHADDI over PASHMINA), drawn once into assets/logo/logo.json.
const L = JSON.parse(readFileSync(join(ROOT, 'assets/logo/logo.json'), 'utf8'));
const logo = `<svg viewBox="${L.viewBox}" role="img" aria-label="KHADDI PASHMINA"><path d="${L.d}"/></svg>`;

/* ───────── sample data (placeholder names, prices and numbers) ───────── */
const products = [
  { id: 'ravi', name: 'Ravi', kind: 'Stole', price: 260, img: ['ravi-1', 'ravi-2'], by: 'Shabnam Devi', stock: 'Four left' },
  { id: 'billawar', name: 'Billawar', kind: 'Stole, madder root', price: 340, img: ['billawar-2', 'billawar-1'], by: 'Kamlesh Kumari', stock: 'Two left' },
  { id: 'nama', name: 'Nama', kind: 'Shawl, embroidered', price: 480, img: ['nama-1', 'nama-2'], by: 'Rekha Devi' },
  { id: 'sarthal', name: 'Sarthal', kind: 'Shawl', price: 390, img: ['sarthal-1', 'sarthal-2'], by: 'Sunita Devi' },
  { id: 'purthu', name: 'Purthu', kind: 'Shawl', price: 320, img: ['purthu-1', 'purthu-2'], by: 'Pushpa Devi' },
  { id: 'kesar', name: 'Kesar', kind: 'Shawl', price: 300, img: ['kesar-1', 'kesar-2'], by: 'Kamlesh Kumari' },
  { id: 'bani', name: 'Bani', kind: 'Stole', price: 290, img: ['bani-1', 'bani-2'], by: 'Shabnam Devi' },
  { id: 'mahanpur', name: 'Mahanpur', kind: 'Shawl, embroidered', price: 520, img: ['mahanpur-1', 'mahanpur-2'], by: 'Rekha Devi' },
  { id: 'sewa', name: 'Sewa', kind: 'Shawl', price: 330, img: ['sewa-1', 'sewa-2'], by: 'Pushpa Devi' },
  { id: 'dhar', name: 'Dhar', kind: 'Stole, embroidered', price: 450, img: ['dhar-1', 'detail-bird'], by: 'Rekha Devi', stock: 'One left' },
  { id: 'ujh', name: 'Ujh', kind: 'Muffler', price: 220, img: ['ujh-2', 'ujh-1'], by: 'Sunita Devi', sold: true },
  { id: 'chanchlo', name: 'Chanchlo', kind: 'Shawl, embroidered', price: 540, img: ['chanchlo-1', 'shawl-dark'], by: 'Rekha Devi' },
];
const byId = Object.fromEntries(products.map(p => [p.id, p]));

const piece = p => `
      <a class="piece rise" href="product.html">
        <div class="plate"><img src="${P}${p.img[0]}.jpg" alt="${p.name}, ${p.kind.toLowerCase()}" loading="lazy"><img src="${P}${p.img[1]}.jpg" alt="" loading="lazy"></div>
        <div class="meta"><span>${p.name}</span><span>€${p.price}</span></div>
        <p class="by">${p.kind}${p.sold ? ' · waiting list' : ''}</p>
      </a>`;
const fig = (src, shape, alt, cap) => `<figure class="rise"><div class="plate ${shape}"><img src="${src}" alt="${alt}" loading="lazy"></div>${cap ? `<figcaption><i>${cap[0]}</i>${cap[1]}</figcaption>` : ''}</figure>`;

/* ───────── shared chrome ───────── */
const LEFT = [['shop.html', 'Shop'], ['nama.html', 'Nama'], ['story.html', 'Story']];
const RIGHT = [['#', 'Search'], ['bag.html', 'Bag (2)']];
const MORE = [['makers.html', 'The makers'], ['passport.html', 'Thread Passport'], ['contact.html', 'Contact']];
const link = active => ([h, t]) => `<a href="${h}"${active === h ? ' class="is-active"' : ''}>${t}</a>`;
const header = active => `
<header class="site-header">
  <nav class="nav" aria-label="Primary">${LEFT.map(link(active)).join('')}</nav>
  <details class="m-menu"><summary class="label" aria-label="Menu">Menu</summary><div class="sheet">${[...LEFT, ...MORE].map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</div></details>
  <a class="logo" href="index.html" aria-label="KHADDI PASHMINA — home">${logo}</a>
  <nav class="nav right" aria-label="Secondary">${RIGHT.map(link(active)).join('')}</nav>
  <a class="bag" href="bag.html">Bag (2)</a>
</header>`;

const footer = `
<footer class="site-footer">
  <img src="${I}footer-valley.jpg" alt="" loading="lazy">
  <div class="foot">
    <div><h4>Store</h4><ul><li><a href="shop.html">Shop</a></li><li><a href="nama.html">Nama — personalise</a></li><li><a href="story.html">The story</a></li><li><a href="makers.html">The makers</a></li></ul></div>
    <div><h4>Support</h4><ul><li><a href="#">Shipping, duty &amp; VAT</a></li><li><a href="#">Returns &amp; withdrawal</a></li><li><a href="#">Care, repair &amp; re-embroidery</a></li><li><a href="contact.html">Contact us</a></li></ul></div>
    <div><h4>The trust</h4><ul><li><a href="#">discoveringroots.org</a></li><li><a href="makers.html">Published pay rates</a></li><li><a href="passport.html">Thread Passport</a></li><li><a href="#">Press</a></li></ul></div>
    <div><h4>Letters from Basohli</h4><p>One letter a week from the village. What happened, what went wrong, what is on the looms.</p><form class="form"><input class="field" type="email" placeholder="you@example.com" aria-label="Email"><button class="btn solid" type="button">Follow it from the beginning</button></form></div>
  </div>
  <div class="foot-mark">
    <a class="logo" href="index.html" aria-label="KHADDI PASHMINA">${logo}</a>
    <p class="deva">खड्डी</p>
    <p class="label">Khadi-Pashmina · Basohli, Jammu</p>
    <p class="date">Craft of the 17th century. Revived 2016.</p>
  </div>
  <div class="colophon"><span>KHADDI — by the Discovering Roots Trust · Basohli, Jammu</span><span>Composition: 100% cashmere · Privacy · Terms · Cookies</span></div>
</footer>`;

const page = (file, title, desc, body, { home = false } = {}) => writeFileSync(join(ROOT, file), `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="icon" href="assets/logo/khaddi-pashmina.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Tiro+Devanagari+Hindi&family=Mrs+Saint+Delafield&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/khaddi.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body${home ? ' class="home"' : ''}>
${header(file)}
<main>
${body}
</main>
${footer}
<script src="assets/js/reveal.js" defer></script>
</body>
</html>
`);

const stitch = `<div class="stitch"><div class="latin">For Clara · 12.12.26</div><div class="dv">क्लारा के लिए</div></div>`;

const STRIP = [['craft/goats', 'I', 'The fibre'], ['craft/carding', 'II', 'Carding'], ['craft/charkha', 'III', 'Spinning'], ['craft/loom', 'IV', 'The loom'], ['craft/weaver', 'V', 'Weaving'], ['craft/embroidery', 'VI', 'Embroidery'], ['products/detail-tassel', 'VII', 'The finish'], ['products/worn-1', 'VIII', 'Worn']];
const strip = `
  <section class="strip bleed gap">
    <div class="side">
      <p class="label soft">From goat to cloth</p>
      <h2 class="title">Fifteen days, four pairs of hands.</h2>
      <a class="more" href="makers.html">Meet the makers</a>
    </div>
    <div class="track">${STRIP.map(([src, n, t]) => `<a class="tall" href="makers.html"><img src="${I}${src}.jpg" alt="${t}" loading="lazy"><span><i>${n}</i>${t}</span></a>`).join('')}</div>
  </section>`;

/* ───────── HOME ───────── */
const tile = (p, n = 0) => `
      <a class="tile reveal" style="--d:${(n % 4) * 0.12}s" href="product.html">
        <div class="plate sq"><img src="${P}${p.img[0]}.jpg" alt="${p.name}, ${p.kind.toLowerCase()}" loading="lazy"></div>
        <div class="cap"><span>${p.name}</span><span>€${p.price}</span></div>
      </a>`;
const clip = (name, alt) => `<img src="${I}clip-${name}.jpg" alt="${alt}" loading="lazy"><video autoplay muted loop playsinline preload="metadata" poster="${I}clip-${name}.jpg" aria-hidden="true"><source src="assets/video/${name}.mp4" type="video/mp4"></video>`;
const act = (label, num, unit, title, text, film, alt) => `
      <article class="act">
        <figure class="unveil"><div class="plate">${clip(film, alt)}<p class="numeral">${num}<small>${unit}</small></p></div></figure>
        <p class="label soft reveal">${label}</p>
        <h3 class="title reveal" style="--d:.1s">${title}</h3>
        <p class="reveal" style="--d:.2s">${text}</p>
      </article>`;
page('index.html', 'KHADDI PASHMINA — Basohli, Jammu', 'Pashmina spun and woven entirely by hand in Basohli, Jammu. About forty pieces a month, each signed by the people who made it.', `
  <section class="hero full bleed">
    <img src="${I}hero-poster.jpg" alt="A lake on the high plateau of Ladakh">
    <video autoplay muted loop playsinline preload="metadata" poster="${I}hero-poster.jpg" aria-hidden="true"><source src="assets/video/hero.mp4" type="video/mp4"></video>
    <div class="hero-center">
      <h1 class="hero-title" aria-label="Warmth without weight"><span style="--i:0">Warmth</span> <em style="--i:1">without</em> <span style="--i:2">weight</span></h1>
      <p class="hero-by"><span>Entirely by hand</span></p>
    </div>
    <div class="caption">
      <p class="label">Khadi-Pashmina · Basohli, Jammu</p>
      <a class="more" href="shop.html">Discover the pieces</a>
    </div>
  </section>

  <section class="manifesto room">
    <div class="mani-words">
      <p class="label soft reveal">Khadi-Pashmina · Basohli, Jammu</p>
      <h2 class="display">
        <span class="line ink reveal" style="--d:.1s">True pashmina is too fine</span>
        <span class="line ink reveal" style="--d:.25s">for any machine.</span>
        <span class="line ink reveal" style="--d:.5s"><em>So ours is made entirely by hand.</em></span>
      </h2>
      <p class="mani-note reveal" style="--d:.7s">A power loom can only hold this fibre if it is blended with nylon, then washed in acid. We spin it and weave it as it is. About forty pieces a month.</p>
    </div>
    <figure class="arch unveil"><div class="plate">${clip('tuft', 'Raw pashmina fibre drawn out by hand')}</div><figcaption>The fibre, before it is thread</figcaption></figure>
  </section>

  <div class="thread" aria-hidden="true"></div>

  <section class="acts">
    <div class="acts-head"><p class="label soft reveal">The making</p><h2 class="title reveal" style="--d:.1s">From goat to cloth, <em>in three acts.</em></h2></div>
    <div class="tri">
      ${act('I — The fibre', '12–14', 'microns', 'Combed, never shorn.', 'Each spring the goats of the Ladakh plateau let go of their winter coat. It is gathered by hand, many times finer than a human hair.', 'goats', 'Pashmina goats on the high plateau')}
      ${act('II — The hand', '9', 'days', 'One spinner, one wheel.', 'The yarn for a single shawl is drawn out by one person at a wooden charkha. It cannot be hurried. The thread breaks if you try.', 'wheel', 'A hand turning a wooden spinning wheel')}
      ${act('III — The loom', '6', 'days', 'Woven on the <em>khaddi.</em>', 'Khaddi is the word for the handloom. No power, no acid, no nylon. The cloth weighs what the fibre weighs, and nothing else.', 'loom', 'A hand at the reed of a handloom')}
    </div>
  </section>

  <section class="signature bleed">
    <svg class="s-thread" viewBox="0 0 1400 1050" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path class="yarn" pathLength="1" d="M1420 330 C1300 355 1250 305 1190 350 C1120 405 1160 470 1215 440 C1265 410 1235 345 1165 358 C1040 380 880 500 660 485 C500 472 380 395 240 440 C150 468 70 455 -20 440"/>
    </svg>
    <div class="s-head">
      <p class="label soft reveal">The signature</p>
      <h2 class="display reveal" style="--d:.1s">Every piece is signed, <em>like a work of art.</em></h2>
    </div>
    <div class="s-stage">
      <div class="s-left">
        <dl class="wall-label reveal" style="--d:.2s">
          <dt>Sarthal, 2026</dt>
          <dd>Changthangi pashmina, undyed<br>100 × 200 cm, 190 g</dd>
          <dd>Basohli, Jammu · Piece 0187</dd>
        </dl>
        <p class="reveal" style="--d:.3s">A tag stitched into the hem opens the names of the people who made your piece, and the days each of them gave to it.</p>
        <a class="more reveal" style="--d:.4s" href="passport.html">The Thread Passport</a>
      </div>
      <figure class="framed unveil">
        <div class="plate"><img src="${P}sarthal-1.jpg" alt="Sarthal, an undyed pashmina shawl" loading="lazy"></div>
        <figcaption><i class="tag"></i>Hold a phone to the hem</figcaption>
      </figure>
      <div class="s-right">
        <p class="label soft reveal">Signed by</p>
        <ul class="sigs">
          ${[['Sunita Devi', 'Spun · nine days', 0.2], ['Bishan Dass', 'Woven · six days', 0.7], ['Rekha Devi', 'Finished · two days', 1.2]].map(([n, r, d]) => `<li class="reveal" style="--d:${d}s"><span class="hand">${n}</span><span class="label">${r}</span></li>`).join('\n          ')}
        </ul>
      </div>
    </div>
  </section>

  <div class="head"><p class="label soft reveal">Forty-one this month</p><h2 class="title reveal" style="--d:.1s">The October pieces</h2></div>
  <section style="padding-bottom:0">
    <div class="tiles">${['ravi', 'billawar', 'nama', 'kesar', 'sarthal', 'purthu', 'bani', 'mahanpur'].map((i, n) => tile(byId[i], n)).join('')}
    </div>
    <p class="center" style="padding-top:clamp(44px,5vw,72px)"><a class="more" href="shop.html">View all twelve</a></p>
  </section>

  <section class="nama-art room">
    <p class="label soft reveal">Nama</p>
    <h2 class="title reveal" style="--d:.1s">Your name, in thread.</h2>
    <div class="stitched"><svg viewBox="0 0 1000 210" role="img" aria-label="For Clara, 12.12.26, stitched in thread">
      <text x="500" y="128" text-anchor="middle">For Clara · 12.12.26</text>
      <line x1="170" y1="178" x2="830" y2="178"/>
    </svg></div>
    <p class="deva reveal" style="--d:1.6s">क्लारा के लिए</p>
    <p class="small reveal" style="--d:1.8s">Any piece can be embroidered by hand with a name, a date or a short line. It takes fourteen days, and it is yours alone.</p>
    <a class="more reveal" style="--d:2s" href="nama.html">Commission a piece</a>
  </section>

  <section class="passage" style="padding-bottom:0">
    <p class="label soft reveal">Khaddi, noun</p>
    <p class="reveal" style="margin-top:22px;--d:.15s">The handloom. We named the house after the one machine we refused to replace.</p>
    <a class="more reveal" style="--d:.3s" href="story.html">Read the story</a>
  </section>
`, { home: true });

/* ───────── SHOP ───────── */
page('shop.html', 'Shop — KHADDI PASHMINA', 'Stoles, shawls and mufflers, spun and woven by hand in Basohli.', `
  <div class="page-head"><h1 class="display">The pieces</h1></div>
  <div class="shelf">
    <div class="slash"><a class="on" href="#">All</a><a href="#">Stoles</a><a href="#">Shawls</a><a href="#">Mufflers</a><a href="#">Nama</a></div>
    <p class="small">12 pieces</p>
  </div>
  <div class="cards g3 bleed">${products.map(piece).join('')}
  </div>
`);

/* ───────── PRODUCT ───────── */
page('product.html', 'Sarthal, shawl — KHADDI PASHMINA', 'Sarthal: an undyed pashmina shawl, spun and woven by hand in Basohli, Jammu.', `
  <div class="pdp">
    <div class="thumbs">${['sarthal-1', 'drape-3', 'sarthal-2', 'drape-2'].map((s, i) => `<div class="plate${i ? '' : ' on'}"><img src="${P}${s}.jpg" alt="Sarthal, view ${i + 1}"></div>`).join('')}</div>
    <div class="plate main"><img src="${P}sarthal-1.jpg" alt="Sarthal shawl draped over stone"></div>
    <div class="info">
      <h1 class="title">Sarthal</h1>
      <p class="price">€390</p>
      <p class="desc">An undyed shawl in plain weave, finished with tassels knotted by hand. Spun by Sunita Devi over nine days; woven by Bishan Dass in six.</p>
      <dl class="spec">
        <div><dt>Fibre</dt><dd>Changthangi, Ladakh · 13.2 microns</dd></div>
        <div><dt>Size</dt><dd>100 × 200 cm · 190 g</dd></div>
        <div><dt>Colour</dt><dd class="threads"><i class="on" style="background:#ece4d2"></i><i style="background:#b8aea0"></i><i style="background:#8c3a2b"></i><span>Undyed</span></dd></div>
      </dl>
      <a class="btn solid" href="bag.html">Add to bag</a>
      <p class="note">Duty and taxes paid · arrives by 21 October</p>
      <div class="acc">
        <details><summary>Composition and care</summary><div class="in">100% cashmere, the fibre known as pashmina. Wash by hand in cool water, dry flat, store folded. If it is ever damaged, it comes back to the person who made it.</div></details>
        <details><summary>Delivery and returns</summary><div class="in">Sent within two days, about a week to Europe. Fourteen days to change your mind. Pieces embroidered with a name cannot be returned.</div></details>
        <details><summary>Where the price goes</summary><div class="in"><ul><li><span>The three people who made it</span><span>€151</span></li><li><span>Fibre, from Ladakh</span><span>€55</span></li><li><span>The trust: training and new looms</span><span>€74</span></li><li><span>Shipping, duty and taxes</span><span>€63</span></li><li><span>Box, tag and payment</span><span>€47</span></li></ul></div></details>
        <details><summary>Add your name in thread</summary><div class="in">Any piece can be embroidered by hand, from €70. <a href="nama.html" style="border-bottom:1px solid var(--line)">Commission it</a>.</div></details>
      </div>
    </div>
  </div>

  <div class="head"><h2 class="title">More pieces</h2></div>
  <div class="cards g3 bleed">${['ravi', 'purthu', 'kesar'].map(i => piece(byId[i])).join('')}
  </div>
`);

/* ───────── BAG ───────── */
const bagRows = [[byId.sarthal, 'Undyed · 100 × 200 cm', 390], [byId.nama, 'Embroidered “For Clara · 12.12.26”', 570]];
page('bag.html', 'Your bag — KHADDI PASHMINA', 'Your bag.', `
  <div class="page-head"><h1 class="display">Your bag</h1></div>
  <div class="bagpage">
    <ul class="lines">${bagRows.map(([p, opt, price]) => `
      <li>
        <a class="plate" href="product.html"><img src="${P}${p.img[0]}.jpg" alt="${p.name}"></a>
        <div>
          <p class="label">${p.name}</p>
          <p class="small">${opt}</p>
          <p class="small" style="margin-top:14px"><a href="#" style="border-bottom:1px solid var(--line)">Remove</a></p>
        </div>
        <p class="amount">€${price}</p>
      </li>`).join('')}
    </ul>
    <aside class="summary">
      <dl>
        <div><dt>Two pieces</dt><dd>€960</dd></div>
        <div><dt>Delivery, duty and taxes</dt><dd>Included</dd></div>
        <div class="total"><dt>Total</dt><dd>€960</dd></div>
      </dl>
      <a class="btn solid" href="#">Checkout</a>
    </aside>
  </div>
`);

/* ───────── STORY ───────── */
page('story.html', 'The story — KHADDI PASHMINA', 'How a lost craft was put back to work in Basohli, Jammu.', `
  <section class="split bleed">
    <div class="txt mid">
      <span class="logo">${logo}</span>
      <p class="small" style="margin-bottom:0"><em>Khaddi</em> is the word for the handloom. We named the house after the one machine we refused to replace.</p>
    </div>
    <div class="pic"><img src="${I}loom-wide.jpg" alt="Cloth on the beam of a wooden handloom"></div>
  </section>

  <div class="page-head" style="padding-top:var(--room)">
    <p class="label soft">The story</p>
    <h1 class="display">A craft that had <em>already died once.</em></h1>
  </div>

  <section class="chapter">
    <div class="words">
      <p class="label soft">c. 1635 — The town</p>
      <h2 class="title">On the right bank of the Ravi.</h2>
      <div class="prose"><p>Basohli was founded on a branch of the silk route. Its bazaar had shops known for pashmina, and its palace kept the weavers in work.</p></div>
    </div>
    <div class="pic">${fig(`${C}basohli-palace.jpg`, 'land', 'The ruins of the palace at Basohli', ['I', 'The palace at Basohli'])}</div>
  </section>

  <section class="room chapter flip">
    <div class="words">
      <p class="label soft">The loss</p>
      <h2 class="title">Then the looms stopped.</h2>
      <div class="prose"><p>A machine cannot hold a fibre this fine. So the mills blend it with nylon, weave it in five minutes, and burn the nylon out with acid.</p><p>The price fell. Within three generations the skill lived only in the memory of the old.</p></div>
    </div>
    <div class="pic">${fig(`${P}detail-tassel.jpg`, 'port', 'Hand-finished edge of a pashmina shawl', ['II', 'What a hand leaves behind'])}</div>
  </section>

  <section class="banner bleed"><img src="${I}hero-loom.jpg" alt="" loading="lazy"><blockquote class="statement">“Nothing in the cloth that a goat and a person did not put there.”</blockquote></section>

  <div class="head"><p class="label soft">2016</p><h2 class="title">Three friends</h2></div>
  <div class="cols bleed">
    <div><p class="label soft">Who grew up here</p><h3 class="title">Shakti Pathak</h3><p class="small">Raised in Basohli on stories of the palace and its shawls. He became a senior government official, and came back for the looms.</p></div>
    <div><p class="label soft">The advocate</p><h3 class="title">Venkata Krishna</h3><p class="small">Of the Supreme Court of India. A working life spent on rights and provenance, now given to a village craft.</p></div>
    <div><p class="label soft">The designer</p><h3 class="title">Rajni Sharma</h3><p class="small">She sat with the weavers, rebuilt the technique, and made the revival into something to be worn.</p></div>
  </div>

  <section class="room chapter">
    <div class="words">
      <p class="label soft">The revival</p>
      <h2 class="title">Khadi, applied to pashmina.</h2>
      <div class="prose"><p>They found the last people who remembered the old looms and asked to be taught. Then they took the tools of khadi, the hand-spun cotton of India’s freedom movement, and used them on pashmina fibre.</p><p>Their own money, their own weekends. No government and no donor. The trust runs on what the cloth earns.</p></div>
    </div>
    <div class="pic">${fig(`${C}loom.jpg`, 'land', 'A weaver at a wooden handloom', ['III', 'The first looms, Basohli'])}</div>
  </section>

  <div class="head"><p class="label soft">Five things we will not trade away</p><h2 class="title">What we promise</h2></div>
  <section>
    <ul class="vows">
      <li><span class="label">I — By hand, or not at all</span><p>No power loom, ever. If more is asked of us, we train more hands.</p></li>
      <li><span class="label">II — Nothing hidden</span><p>Every piece names its spinner, its weaver, its village and its date.</p></li>
      <li><span class="label">III — The maker is paid first</span><p>Rates are set before margin, and published.</p></li>
      <li><span class="label">IV — Nothing added</span><p>Organic starch. No carbonising, no acid wash, no nylon.</p></li>
      <li><span class="label">V — Slow is the point</span><p>A week for a shawl is why it will outlive you.</p></li>
    </ul>
    
  </section>
`);

/* ───────── NAMA ───────── */
page('nama.html', 'Nama — KHADDI PASHMINA', 'Any KHADDI piece, embroidered by hand with a name, a date or a short line.', `
  <section class="split bleed">
    <div class="pic"><img src="${P}nama-2.jpg" alt="A hand-embroidered border on undyed pashmina"></div>
    <div class="txt">
      <p class="label soft">Nama · made to your name</p>
      <h1 class="title">A commission, <em>not a scarf.</em></h1>
      ${stitch}
      <form class="form" style="width:100%;max-width:520px">
        <label class="label" for="n1">Your line</label><input id="n1" class="field" value="For Clara · 12.12.26">
        <span class="label">Script</span><div class="choice"><span>Latin</span><span class="deva">देवनागरी</span><span class="on">Both</span></div>
        <span class="label">Thread</span><div class="threads"><i class="on" style="background:#8c3a2b"></i><i style="background:#24427f"></i><i style="background:#c08a3a"></i><i style="background:#5b6b46"></i><i style="background:#ece4d2"></i></div>
        <span class="label">Placement</span><div class="choice"><span class="on">One end</span><span>Both ends</span><span>Corner</span></div>
      </form>
      <a class="btn solid" href="shop.html" style="max-width:520px;margin-top:36px">Choose a piece — from €380</a>
      <p class="note" style="max-width:520px;width:100%;margin-top:12px">A drawn proof is sent within a day. Nothing is stitched until you approve it.</p>
    </div>
  </section>

  <div class="facts bleed gap-s">
    <div><b>25 November</b><span class="small">Last day to commission for delivery before Christmas.</span></div>
    <div><b>Fourteen days</b><span class="small">Of embroidery, after the piece is woven.</span></div>
    <div><b>From €380</b><span class="small">The piece, with €70 to €110 for the embroidery.</span></div>
    <div><b>Yours alone</b><span class="small">A piece made to your name cannot be returned.</span></div>
  </div>

  <div class="head"><p class="label soft">Begin with a piece</p><h2 class="title">Pieces to make your own</h2></div>
  <div class="cards g3 bleed">${['nama', 'mahanpur', 'chanchlo'].map(i => piece(byId[i])).join('')}
  </div>
`);

/* ───────── MAKERS ───────── */
const makers = [['Shabnam Devi', 'Spinner · eleven years', 'I know a piece is finished when the thread stops arguing with me.', 62], ['Bishan Dass', 'Weaver, loom no. 4 · twenty-three years', 'My father had this loom. For twenty years it had nothing on it.', 48], ['Rekha Devi', 'Embroiderer · eight years', 'A name takes me two days. I say it aloud while I work.', 71], ['Sunita Devi', 'Spinner · six years', 'The hardest part is the first hour. After that the hands remember.', 39], ['Kamlesh Kumari', 'Spinner and dyer · nine years', 'Madder root is slow. It gives you the colour when it is ready.', 44], ['Mohd. Rafiq', 'Weaver, loom no. 2 · seventeen years', 'I want whoever buys this to know it was not made in a hurry.', 53]];
page('makers.html', 'The makers — KHADDI PASHMINA', 'The spinners, weavers and embroiderers of the Basohli hub, by name.', `
  <div class="page-head">
    <p class="label soft">The makers</p>
    <h1 class="display">Sixteen people, <em>by name.</em></h1>
    <p>Each is named on what they make, and described by their craft and their years at it.</p>
  </div>
  ${strip.replace(' gap">', '">')}

  <section class="room">
    <ul class="index">${makers.map(([n, r, q, pcs]) => `
      <li><span class="n">${n}</span><span class="c">${r}</span><span class="q">“${q}”</span><span class="c">${pcs} pieces</span></li>`).join('')}
    </ul>
  </section>

  <section style="padding-bottom:0">
    <div style="max-width:900px;margin:0 auto">
      <p class="label">What we pay</p>
      <p class="small" style="margin:14px 0 34px;max-width:52ch">Rates are set before margin, published here, and reviewed each April with the people who do the work.</p>
      <table class="t">
        <thead><tr><th>Work</th><th>Unit</th><th>Rate</th></tr></thead>
        <tbody>
          <tr><td>Dehairing and carding</td><td>per 100 g of clean fibre</td><td>₹1,400</td></tr>
          <tr><td>Spinning</td><td>per day at the charkha</td><td>₹650</td></tr>
          <tr><td>Weaving</td><td>per day at the loom</td><td>₹850</td></tr>
          <tr><td>Finishing</td><td>per piece</td><td>₹1,100</td></tr>
          <tr><td>Embroidery</td><td>per day</td><td>₹750</td></tr>
        </tbody>
      </table>
      <p class="center" style="margin-top:44px"><a class="more" href="shop.html">Shop what they made this month</a></p>
    </div>
  </section>
`);

/* ───────── PASSPORT ───────── */
page('passport.html', 'Thread Passport — KHADDI PASHMINA', 'The record stitched into every KHADDI piece.', `
  <section class="split bleed">
    <div class="txt mid" style="padding-top:56px;padding-bottom:56px">
      <div class="device"><div class="screen">
        <div class="top"><span>Thread Passport</span><span>0187 / 2026</span></div>
        <div class="face"><img src="${C}charkha.jpg" alt="The spinner at her charkha"></div>
        <div class="who"><span>Spun by</span><b>Shabnam Devi</b><span>Nine days · Basohli</span></div>
        <ul>
          <li><span>Woven</span><span>Bishan Dass · six days</span></li>
          <li><span>Embroidered</span><span>Rekha Devi</span></li>
          <li><span>Fibre</span><span>Changthangi · 13.2 microns</span></li>
          <li><span>Film</span><span>Forty seconds on the loom</span></li>
        </ul>
      </div></div>
    </div>
    <div class="txt" style="background:var(--paper)">
      <p class="label soft">The Thread Passport</p>
      <h1 class="title">Hold a phone to the hem.</h1>
      <div class="prose" style="color:var(--soft)"><p>A page opens. There is no app. It begins with the face of the person who made your piece, and it is as easy to show to someone else as it is to read yourself.</p></div>
      <ol class="steps" style="width:100%">
        <li>The piece number, against the year’s total.</li>
        <li>Who spun it, who wove it, and for how many days.</li>
        <li>The fibre, its fineness and its lab batch.</li>
        <li>Forty seconds of your piece on the loom.</li>
        <li>Care, repair and re-embroidery, when you need them.</li>
      </ol>
      <a class="more" href="shop.html">Shop the pieces</a>
    </div>
  </section>

  <div class="facts bleed gap-s">
    <div><b>Stitched</b><span class="small">Under the hem label. Never glued, never pressed.</span></div>
    <div><b>One of one</b><span class="small">Each tag is unique, and cannot be copied to another piece.</span></div>
    <div><b>No app</b><span class="small">It opens in the browser, for you or anyone you show.</span></div>
    <div><b>Open</b><span class="small">Built to the standard Europe is adopting for textiles.</span></div>
  </div>
`);

/* ───────── CONTACT ───────── */
page('contact.html', 'Contact — KHADDI PASHMINA', 'Write to the hub in Basohli or to the Discovering Roots Trust.', `
  <div class="page-head">
    <p class="label soft">Contact</p>
    <h1 class="display">A person in Basohli <em>reads every letter.</em></h1>
  </div>
  <section class="duo" style="align-items:start">
    <dl class="spec">
      <div><dt>Orders and care</dt><dd>hello@khaddipashmina.com</dd></div>
      <div><dt>The hub</dt><dd>Basohli, Kathua district, Jammu, India</dd></div>
      <div><dt>The trust</dt><dd>discoveringroots.org</dd></div>
      <div><dt>Press</dt><dd>press@discoveringroots.org</dd></div>
      <div><dt>Visits</dt><dd>By arrangement. Write with your dates.</dd></div>
    </dl>
    <form class="form" style="margin-top:-22px">
      <label class="label" for="c1">Name</label><input id="c1" class="field">
      <label class="label" for="c2">Email</label><input id="c2" class="field" type="email">
      <label class="label" for="c3">Order or piece number, if you have one</label><input id="c3" class="field" placeholder="0187">
      <label class="label" for="c4">Message</label><textarea id="c4" class="field" rows="4"></textarea>
      <button class="btn solid" type="button" style="margin-top:34px">Send</button>
      <p class="note" style="margin-top:12px">We reply within two working days.</p>
    </form>
  </section>
`);

console.log('built 9 pages');
