// Generates the static KHADDI mock-up pages into the project root.
// Run: node _src/build.mjs   (output is plain HTML + CSS, no runtime JS)
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const P = 'assets/img/products/';
const C = 'assets/img/craft/';
const I = 'assets/img/';

/* ───────── icons ───────── */
const mark = (s = 44, sw = 5.5) => `<svg width="${s}" height="${s}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" aria-hidden="true"><path d="M24 4v13M24 31v13M4 24h40"/></svg>`;
const heart = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>`;
const bag = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>`;
const menu = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>`;
const play = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;

/* ───────── sample data (placeholder names, prices and numbers) ───────── */
const SW = { undyed: '#efe6d2', grey: '#b8aea0', taupe: '#8c7b6b', madder: '#a72f24', saffron: '#d99331', lapis: '#1c3f94', rose: '#c2477e' };
const products = [
  { id: 'ravi', name: 'The Ravi Stole', type: 'Stole · plain weave', price: 260, pill: 'Hand-spun', img: ['ravi-1', 'ravi-2'], sw: ['grey', 'undyed', 'taupe'], by: 'Shabnam Devi', ini: 'SD', days: 9, stock: '4 of 41 left' },
  { id: 'billawar', name: 'The Billawar Stole', type: 'Stole · madder root', price: 340, pill: 'Natural dye', img: ['billawar-1', 'billawar-2'], sw: ['madder', 'undyed'], by: 'Kamlesh Kumari', ini: 'KK', days: 11, stock: '2 of 41 left' },
  { id: 'nama', name: 'The Nāma Shawl', type: 'Shawl · your name, hand-embroidered', price: 480, pill: 'Nāma', pillClass: 'madder', img: ['nama-1', 'nama-2'], sw: ['rose', 'lapis', 'saffron'], by: 'Rekha Devi', ini: 'RD', days: 15, stock: 'Order by 25 Nov' },
  { id: 'sarthal', name: 'The Sarthal Shawl', type: 'Shawl · hand-knotted tassels', price: 390, pill: 'Hand-spun', img: ['sarthal-1', 'sarthal-2'], sw: ['undyed', 'grey'], by: 'Sunita Devi', ini: 'SD', days: 13 },
  { id: 'purthu', name: 'The Purthu Check', type: 'Shawl · open check', price: 320, pill: 'Hand-spun', img: ['purthu-1', 'purthu-2'], sw: ['undyed', 'saffron', 'taupe'], by: 'Pushpa Devi', ini: 'PD', days: 12 },
  { id: 'bani', name: 'The Bani Stripe', type: 'Stole · two-tone stripe', price: 290, pill: 'Hand-spun', img: ['bani-1', 'bani-2'], sw: ['taupe', 'undyed'], by: 'Shabnam Devi', ini: 'SD', days: 10 },
  { id: 'mahanpur', name: 'The Mahanpur Shawl', type: 'Shawl · embroidered buti', price: 520, pill: 'Nāma', pillClass: 'madder', img: ['mahanpur-1', 'mahanpur-2'], sw: ['undyed', 'saffron'], by: 'Rekha Devi', ini: 'RD', days: 17 },
  { id: 'kesar', name: 'The Kesar Band', type: 'Shawl · saffron band', price: 300, pill: 'Natural dye', img: ['kesar-1', 'kesar-2'], sw: ['saffron', 'undyed'], by: 'Kamlesh Kumari', ini: 'KK', days: 11 },
  { id: 'sewa', name: 'The Sewa Check', type: 'Shawl · madder windowpane', price: 330, pill: 'Natural dye', img: ['sewa-1', 'sewa-2'], sw: ['madder', 'taupe'], by: 'Pushpa Devi', ini: 'PD', days: 12 },
  { id: 'dhar', name: 'The Dhar Stole', type: 'Stole · madder motif', price: 450, pill: 'Nāma', pillClass: 'madder', img: ['dhar-1', 'detail-bird'], sw: ['madder', 'undyed'], by: 'Rekha Devi', ini: 'RD', days: 14 },
  { id: 'ujh', name: 'The Ujh Muffler', type: 'Muffler · grey check', price: 220, pill: 'Waiting list', pillClass: 'undyed', img: ['ujh-1', 'ujh-2'], sw: ['grey', 'undyed'], by: 'Sunita Devi', ini: 'SD', days: 7, stock: 'Next drop 1 Nov' },
  { id: 'chanchlo', name: 'The Chanchlo Shawl', type: 'Shawl · indigo motif', price: 540, pill: 'Nāma', pillClass: 'madder', img: ['chanchlo-1', 'shawl-dark'], sw: ['lapis', 'grey'], by: 'Rekha Devi', ini: 'RD', days: 18 },
];
const byId = Object.fromEntries(products.map(p => [p.id, p]));

const card = (p, lg = false) => `
      <a class="card${lg ? ' lg' : ''}" href="product.html">
        <div class="card-media">
          <span class="pill ${p.pillClass || ''}">${p.pill}</span>
          <img src="${P}${p.img[0]}.jpg" alt="${p.name}, ${p.type}" loading="lazy">
          <img class="alt" src="${P}${p.img[1]}.jpg" alt="" loading="lazy">
          <div class="card-tools">
            ${p.sw.map((s, i) => `<span class="sw${i ? '' : ' on'}" style="background:${SW[s]}" title="${s}"></span>`).join('')}
            ${p.stock ? `<span class="stock">${p.stock}</span>` : '<span class="sp"></span>'}
            <span class="heart">${heart}</span>
          </div>
        </div>
        <div class="card-info">
          <h3>${p.name}</h3><span class="price">€${p.price}</span>
          <span class="by"><span class="avatar">${p.ini}</span>Spun by ${p.by} · ${p.days} days</span>
        </div>
      </a>`;

/* ───────── shared chrome ───────── */
const NAV = [['shop.html', 'Shop'], ['nama.html', 'Nāma'], ['story.html', 'The Story'], ['makers.html', 'The Makers']];
const header = active => `
<header class="site-header">
  <nav class="nav" aria-label="Primary">
    ${NAV.map(([h, t]) => `<a href="${h}"${active === h ? ' class="is-active"' : ''}>${t}</a>`).join('\n    ')}
  </nav>
  <a class="wordmark" href="index.html" aria-label="KHADDI home">KHADDI</a>
  <nav class="nav nav-right" aria-label="Account">
    <a href="passport.html"${active === 'passport.html' ? ' class="is-active"' : ''}>Thread Passport</a>
    <a href="#">EUR € · DDP</a>
    <a href="#">Cart (0)</a>
    <a href="contact.html"${active === 'contact.html' ? ' class="is-active"' : ''}>Contact</a>
  </nav>
  <div class="m-actions">
    <details>
      <summary aria-label="Menu">${menu}</summary>
      <div class="m-menu">
        ${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a href="passport.html">Thread Passport</a><a href="contact.html">Contact</a>
      </div>
    </details>
    <a href="#" aria-label="Cart">${bag}</a>
  </div>
</header>`;

const footer = `
<footer class="site-footer">
  <img class="bg" src="${I}footer-valley.jpg" alt="" loading="lazy">
  <div class="foot-panel">
    <div><h4>Store</h4><ul><li><a href="shop.html">Shop</a></li><li><a href="nama.html">Nāma — personalise</a></li><li><a href="story.html">The Story</a></li><li><a href="makers.html">The Makers</a></li></ul></div>
    <div><h4>Support</h4><ul><li><a href="#">Shipping, duty &amp; VAT (DDP)</a></li><li><a href="#">Returns &amp; withdrawal</a></li><li><a href="#">Care, repair &amp; re-embroidery</a></li><li><a href="contact.html">Contact us</a></li></ul></div>
    <div><h4>The Trust</h4><ul><li><a href="#">discoveringroots.org</a></li><li><a href="makers.html">Published pay rates</a></li><li><a href="#">Impact numbers</a></li><li><a href="#">Press</a></li></ul></div>
    <div><h4>Letters from Basohli</h4><p>One letter a week from the village. What happened, what went wrong, what is on the looms.</p><form class="form" style="margin:0"><input class="field" type="email" placeholder="you@example.com" aria-label="Email"><button class="btn btn-lapis" type="button">Follow it from the beginning</button></form></div>
  </div>
  <div class="foot-mark">
    <div class="bigmark">KHADDI</div>
    <div class="deva">खड्डी</div>
    <div class="desc">Khadi-Pashmina · Basohli, Jammu</div>
    <div class="date">Craft of the 17th century. Revived 2016.</div>
  </div>
  <div class="foot-legal"><span>KHADDI — by the Discovering Roots Trust · Basohli, Jammu &amp; Kashmir</span><span>Composition: 100% cashmere · Privacy · Terms · Cookies</span></div>
</footer>`;

const page = (file, title, desc, body, { home = false } = {}) => writeFileSync(join(ROOT, file), `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Karla:ital,wght@0,300;0,400;0,700;1,400&family=Tiro+Devanagari+Hindi&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/khaddi.css">
</head>
<body${home ? ' class="home"' : ''}>
${header(file)}
<main${home ? '' : ' class="inner"'}>
${body}
</main>
${footer}
</body>
</html>
`);

/* ───────── reusable sections ───────── */
const tick = items => `<div class="ticker" aria-hidden="true"><div class="ticker-track">${[...items, ...items].map(t => `<span>${t}</span>`).join('')}</div></div>`;

const film = `
  <section class="film">
    <img class="bg" src="${I}bts-charkha.jpg" alt="A spinner at a wooden charkha" loading="lazy">
    <div class="top"><p class="label">From the hub in Basohli</p><h2>Nine days to spin. Six to weave.</h2></div>
    <div class="bottom">${mark(52, 4.5)}<p>A power loom does this in five minutes. Ours took fifteen days and four people, and every one of them is named on the piece.</p></div>
    <a class="play" href="#" aria-label="Play the three-minute film">${play}</a>
  </section>`;

const REELS = [['craft/dehairing', 'Dehairing by hand. No narration.', '01'], ['products/detail-tassel', 'Why your €40 pashmina is a lie', '02'], ['craft/charkha', 'Nine days to spin one shawl', '05'], ['craft/weaver', 'Six days on loom no. 4', '06'], ['products/nama-2', 'Embroidering a stranger’s name', '08'], ['craft/embroidery', 'Twelve women, one room', '06'], ['products/worn-1', 'The first shawls leave for Europe', '11'], ['craft/basohli-palace', 'The town that forgot its own cloth', '01']];
const diaries = `
  <section class="section" style="padding-bottom:0">
    <div class="diaries">
      <div class="side">
        <span class="at">@discoveringroots + you</span>
        <h2>Watch it being made<b>The Basohli Diaries</b></h2>
        <p>A town that had forgotten how to make its own cloth.<br>Hands that remember what books cannot teach.<br>One episode every two weeks, from the village. Nothing is sold on the channel.</p>
      </div>
      <div class="reel-view"><div class="reel-track">${[...REELS, ...REELS].map(([src, t, n]) => `<a class="reel" href="#"><img src="${I}${src}.jpg" alt="" loading="lazy"><span class="h">@discoveringroots</span><span class="n">EP ${n}</span><span class="t">${t}</span></a>`).join('')}</div></div>
    </div>
  </section>`;

const phone = `
      <div class="phone"><div class="phone-screen">
        <div class="pp-head"><span>Thread Passport</span><span>No. 0187 / 2026</span></div>
        <div class="pp-face"><img src="${C}charkha.jpg" alt="The spinner at her charkha"><div class="cap">Spun by<b>Shabnam Devi</b>9 days · Basohli</div></div>
        <ul class="pp-list">
          <li><span>Woven</span><span>Bishan Dass · 6 days · loom no. 4</span></li>
          <li><span>Embroidered</span><span>Rekha Devi</span></li>
          <li><span>Fibre</span><span>Changthangi, Ladakh · 13.2µ</span></li>
          <li><span>Dye</span><span>Undyed</span></li>
          <li><span>Film</span><span>40 seconds on the loom ▸</span></li>
        </ul>
        <div class="pp-cta">Book care, repair or re-embroidery</div>
      </div></div>`;

const passportBlock = `
  <section class="section" style="padding-bottom:0">
    <div class="passport">
      <div>
        <span class="eyebrow">The Thread Passport</span>
        <h2>Tap the hem. Meet the person who made it.</h2>
        <p>Every piece carries a small NFC tag stitched into the hem, with a printed QR beside it. Hold a phone to it and a page opens. No app.</p>
        <ol><li>The piece number, against this year’s total.</li><li>Who spun it, who wove it, who embroidered it — and for how many days.</li><li>The fibre, its micron count and the lab batch.</li><li>Forty seconds of your piece on the loom.</li></ol>
        <a class="btn" href="passport.html">See a passport</a>
      </div>
      ${phone}
    </div>
  </section>`;

/* ───────── HOME ───────── */
page('index.html', 'KHADDI — Khadi-Pashmina · Basohli, Jammu', 'Hand-spun, hand-woven cashmere from Basohli, Jammu. Every piece names the people who made it.', `
  <section class="hero">
    <img class="bg" src="${I}hero-loom.jpg" alt="A shuttle resting on a wooden handloom">
    <div class="hero-meta">This month · 41 pieces made<br>0187 of 2026</div>
    <div class="hero-copy">
      <div><p class="label">Hand-spun, hand-woven cashmere from Basohli, Jammu.</p><h1>A week of one person’s life, in every piece.</h1></div>
      <a class="btn" href="shop.html">Shop the cloth</a>
    </div>
  </section>

  ${tick(['This month: <b>41 pieces</b> made', 'No power loom, ever', 'Fibre: Changthangi, Ladakh · 12–14µ', 'Composition: 100% cashmere', 'Duty and VAT paid on every order', 'Nāma cut-off for Christmas: <b>25 November</b>', 'No acid wash. No synthetic reinforcement'])}

  <section class="section" style="padding-top:32px">
    <div class="grid g3">${['ravi', 'billawar', 'nama'].map(i => card(byId[i])).join('')}
    </div>
    <div class="grid g2" style="margin-top:16px">${['sarthal', 'purthu'].map(i => card(byId[i], true)).join('')}
    </div>
  </section>

  <section class="duo">
    <div class="frame"><img src="${I}hub-charkha.jpg" alt="Spinners working at a charkha in a courtyard" loading="lazy"></div>
    <div>
      <p class="eyebrow">The people behind KHADDI</p>
      <svg class="curve" viewBox="0 0 620 150" role="img" aria-label="By hand, or not at all"><path id="arc" d="M6,118 C150,58 330,132 614,62" fill="none"/><text><textPath href="#arc">By hand, or not at all</textPath></text></svg>
      <h3>The town lost this craft. We are trying to get it back.</h3>
      <p>Basohli, on the right bank of the Ravi, was once known for its pashmina. Then the looms stopped, and within three generations the skill lived only in the memory of old people. In 2016 three friends — an official who grew up here, a Supreme Court advocate and a designer — started the <strong>Discovering Roots Trust</strong> with their own money to put it back to work. Here are three promises from us:</p>
      <ul class="promises">
        <li><strong>No power loom, ever.</strong> If demand outruns the looms, we train more hands.</li>
        <li><strong>The maker is paid first.</strong> Rates are set before margin and published.</li>
        <li><strong>Nothing hidden.</strong> Every piece names its spinner, weaver, village and date.</li>
      </ul>
      <span class="doodle">${mark(58, 3.5)}</span>
    </div>
  </section>

  ${film}

  <section class="section" style="padding-bottom:0">
    <div class="split">
      <div class="txt">
        <span class="eyebrow">Nāma · personalisation</span>
        <h2>Your name, in thread, in two scripts.</h2>
        <p>Any stole or shawl can be hand-embroidered with a name, initials, a date or a short line — Latin, Devanagari, or both.</p>
        <div class="stitch"><div class="latin">For Clara · 12.12.26</div><div class="dv">क्लारा के लिए</div></div>
        <p style="font-size:14.5px;color:var(--ink-soft);margin-top:10px">Allow 10–18 days. Order by <strong>25 November</strong> for delivery before Christmas. Personalised orders cannot be returned.</p>
        <a class="btn btn-madder" href="nama.html">Design a Nāma piece</a>
      </div>
      <div class="pic"><img src="${P}nama-2.jpg" alt="A hand-embroidered border on undyed cashmere" loading="lazy"></div>
    </div>
  </section>

  ${passportBlock}
  ${diaries}
`, { home: true });

/* ───────── SHOP ───────── */
page('shop.html', 'Shop — KHADDI', 'Stoles, shawls and mufflers, hand-spun and hand-woven in Basohli. Forty-one pieces this month.', `
  <div class="shop-head">
    <h1>The KHADDI pieces</h1>
    <p>Forty-one pieces this month. Each one shows who spun it and how long it took.</p>
    <div class="filters"><span class="chip on">All 12</span><span class="chip">Stoles</span><span class="chip">Shawls</span><span class="chip">Mufflers</span><span class="chip">Undyed</span><span class="chip">Natural dye</span><span class="chip">Nāma</span></div>
  </div>
  <div class="capacity">
    <div><b class="n">29</b> <span>of 41 sold in October</span></div>
    <div class="meter" role="img" aria-label="29 of 41 pieces sold"><i style="width:70.7%"></i></div>
    <a class="btn btn-lapis" href="#">Join the November list</a>
  </div>
  <div class="grid g3">${products.map(p => card(p)).join('')}
  </div>
  <section class="section" style="padding-bottom:0">
    <div class="panel ink">
      <span class="eyebrow">Why there are only forty-one</span>
      <h2>We do not switch machines on.</h2>
      <p>Twelve spinners and four looms make about forty pieces a month. When they are gone, the list opens for the next drop. We would rather you wait than receive something made faster.</p>
    </div>
  </section>
`);

/* ───────── PRODUCT ───────── */
const sp = byId.sarthal;
page('product.html', `${sp.name} — KHADDI`, 'Hand-spun and hand-woven in Basohli, Jammu, from Changthangi fibre reared in Ladakh.', `
  <div class="pdp">
    <div class="thumbs">${['sarthal-1', 'drape-2', 'drape-3', 'sarthal-2'].map((s, i) => `<img${i ? '' : ' class="on"'} src="${P}${s}.jpg" alt="${sp.name}, view ${i + 1}">`).join('')}</div>
    <div class="pdp-main"><img src="${P}sarthal-1.jpg" alt="${sp.name} draped over a stone wall"></div>
    <div class="pdp-info">
      <div class="row"><span class="eyebrow">Piece No. 0187 of 2026</span><span class="heart">${heart}</span></div>
      <h1>${sp.name}</h1>
      <p class="type">Shawl · 100 × 200 cm · undyed</p>
      <p class="price">€390</p>
      <p class="ddp">Duty and VAT included. Nothing to pay at the door.</p>
      <p class="desc">Plain weave in undyed fibre, finished with tassels knotted by hand. Sunita spun the yarn over nine days in September; Bishan wove it in six on loom no. 4. Nothing was added to the fibre and nothing was washed out of it.</p>

      <div class="blk">
        <span class="lab">Made by</span>
        <div class="made">
          <div><small>Spun</small><b>Sunita Devi</b><span>9 days · Basohli</span></div>
          <div><small>Woven</small><b>Bishan Dass</b><span>6 days · loom no. 4</span></div>
          <div><small>Finished</small><b>Rekha Devi</b><span>2 days · tassels</span></div>
        </div>
      </div>

      <div class="blk">
        <span class="lab">Colour</span>
        <div class="chips" style="align-items:center;gap:14px"><span class="opt"><span class="dot on" style="background:${SW.undyed}"></span>Undyed</span><span class="opt"><span class="dot" style="background:${SW.grey}"></span>Natural grey</span><span class="opt"><span class="dot" style="background:${SW.madder}"></span>Madder root</span></div>
      </div>

      <div class="blk">
        <label for="nama">Add Nāma embroidery <span style="color:var(--ink-soft);font-size:14.5px">+ €90 · 14 more days</span></label>
        <input id="nama" class="field" type="text" placeholder="A name, initials, a date or a short line">
        <div class="chips" style="margin-top:10px"><span class="chip on">Latin</span><span class="chip">देवनागरी</span><span class="chip">Both</span></div>
      </div>

      <div class="blk">
        <div class="buy"><span class="left">Arrives by 21 Oct</span><a class="btn btn-madder" href="#">Add to cart — €390</a></div>
        <p class="ddp" style="margin-top:10px">Ships in 48 hours from Delhi. The delivery date is guaranteed before you pay, not after.</p>
      </div>

      <details class="acc" open>
        <summary>Where the €390 goes</summary>
        <div class="in">
          <p>Of this €390, <strong>€151 went to the three people who made it.</strong></p>
          <div class="bar"><i style="width:38.7%;background:var(--lapis)"></i><i style="width:14%;background:var(--saffron)"></i><i style="width:16.3%;background:var(--beetle)"></i><i style="width:19%;background:var(--madder)"></i><i style="width:12%;background:var(--undyed-3)"></i></div>
          <ul class="legend"><li><i style="background:var(--lapis)"></i>Makers — spinning, weaving, finishing<b>€151</b></li><li><i style="background:var(--saffron)"></i>Fibre, from Ladakh<b>€55</b></li><li><i style="background:var(--beetle)"></i>Shipping, duty and VAT<b>€63</b></li><li><i style="background:var(--madder)"></i>The trust — training and new looms<b>€74</b></li><li><i style="background:var(--undyed-3)"></i>Packaging, tag and payment fees<b>€47</b></li></ul>
        </div>
      </details>
      <details class="acc"><summary>Fibre and lab test</summary><div class="in">Composition: 100% cashmere. Changthangi fibre reared in Ladakh, 13.2 microns, lab-tested, batch 0187. No acid wash. No synthetic reinforcement.</div></details>
      <details class="acc"><summary>Care and repair</summary><div class="in">Wash by hand in cool water, dry flat, store folded. If it is ever damaged, book a repair through the Thread Passport and it goes back to the hub.</div></details>
      <details class="acc"><summary>Returns</summary><div class="in">Fourteen days to change your mind on in-stock pieces. Personalised orders cannot be returned.</div></details>
    </div>
  </div>

  <section class="banner"><img src="${P}drape-3.jpg" alt="" loading="lazy"><h2>Knotted by hand, one tassel at a time</h2></section>
  ${tick(['Weave: plain', 'Size: 100 × 200 cm', 'Weight: 190 g', 'Fibre: Changthangi, 13.2µ', 'Dye: undyed', 'Craft: hand-spun, hand-woven Khadi-Pashmina', 'Made in Basohli, Jammu, India'])}

  <section class="section">
    <h2 class="section-title">What owners say</h2>
    <div class="quotes"><div class="quotes-track">${[...Array(2)].flatMap(() => [['MK', 'Marieke, Utrecht', 'Piece 0142', 'I tapped the tag at dinner and my mother-in-law watched the loom video twice.'], ['JB', 'Jonas, Berlin', 'Piece 0098', 'It arrived on the day you said. No customs letter, no surprise bill.'], ['AS', 'Anjali, London', 'Piece 0117', 'My grandmother’s name in Devanagari, on the border. She has not taken it off.'], ['CL', 'Claire, Lyon', 'Piece 0156', 'You can feel that nothing has been done to the fibre. It is lighter than I expected.'], ['HV', 'Henrik, Malmö', 'Piece 0131', 'I read the cost breakdown before I bought. That was what decided it.']]).map(([i, n, pc, q]) => `<div class="qcard"><div class="who"><span class="avatar">${i}</span><div><b>${n}</b><span>${pc}</span></div></div><p>${q}</p></div>`).join('')}</div></div>
  </section>

  <section class="section" style="padding-top:0">
    <h2 class="section-title">More from this month</h2>
    <div class="grid g3" style="max-width:1140px;margin:0 auto">${['ravi', 'purthu', 'nama'].map(i => card(byId[i])).join('')}
    </div>
  </section>

  ${film}

  <section class="section" style="padding-bottom:0">
    <h2 class="section-title">Questions</h2>
    <div class="faq">
      <details class="acc"><summary>Is this pashmina or cashmere?</summary><div class="in">Both words describe the same fibre. European law asks us to write “100% cashmere” on the composition label, so we do. Khadi-Pashmina is our name for the process: spun and woven entirely by hand.</div></details>
      <details class="acc"><summary>Will I pay customs when it arrives?</summary><div class="in">No. Every price includes duty and VAT, and the courier is paid before the parcel leaves India.</div></details>
      <details class="acc"><summary>Why does it take a week to make?</summary><div class="in">Because pashmina fibre is too fine for a machine unless it is blended with nylon and then washed in acid. We spin and weave it as it is.</div></details>
      <details class="acc"><summary>What is the tag in the hem?</summary><div class="in">An NFC chip. Hold a phone to it and you see who made your piece. It can be removed without harming the cloth.</div></details>
    </div>
  </section>
`);

/* ───────── STORY ───────── */
page('story.html', 'The Story — KHADDI', 'How three friends put a lost craft back to work in Basohli, Jammu.', `
  <section class="split" style="background:var(--undyed-2)">
    <div class="txt center">
      <div class="bigmark" style="color:var(--lapis);font-size:clamp(48px,7vw,96px)">KHADDI</div>
      <div class="deva" style="font-size:24px;color:var(--lapis);margin:8px 0 26px">खड्डी</div>
      <p><em>Khaddi</em> is the handloom. We named the cloth after the machine we refused to replace.</p>
    </div>
    <div class="pic"><img src="${I}loom-wide.jpg" alt="A wooden handloom with cloth on the beam"></div>
  </section>

  <section class="panel lapis" style="margin-top:32px">
    <span class="eyebrow">About the Discovering Roots Trust</span>
    <h2>A craft that had already died once.</h2>
    <p>Basohli was founded around 1635 on a branch of the silk route, and its bazaar had shops known for pashmina. Then machine-made “pashmina” arrived — blended with nylon, woven in five minutes, the synthetic washed out with acid. The mill won on price and the looms here stopped.</p>
    <p>The trust is not funded by a government or a donor. It runs on what the cloth earns.</p>
  </section>

  <section class="banner" style="height:min(70vh,560px)"><img src="${I}texture-weave.jpg" alt="" loading="lazy"><blockquote>“Nothing in the cloth that a goat and a person did not put there.”</blockquote></section>

  <section class="about">
    <div class="frame"><img src="${C}basohli-palace.jpg" alt="The ruins of the palace at Basohli" loading="lazy"></div>
    <div>
      <span class="eyebrow">How it started</span>
      <p>Shakti Pathak grew up in Basohli on stories of the palace and its shawls. He could not accept that his own town had lost the thing it was known for.</p>
      <p>Two friends went looking with him: Venkata Krishna, an advocate at the Supreme Court of India, and Rajni Sharma, a designer. They found the last people who remembered the old looms, and asked to be taught.</p>
      <p>Then they did something nobody had tried. They took the tools of khadi — the hand-spun, hand-woven cotton tradition — and used them on pashmina fibre. They called it Khadi-Pashmina.</p>
      <p>Their own money, their own weekends, their own risk. That was 2016.</p>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="founders">
      <div class="founder"><span class="eyebrow">The itch</span><h3>Shakti Pathak</h3><p>Grew up in Basohli. Became a senior official with the Government of J&amp;K, and came back for the looms.</p></div>
      <div class="founder"><span class="eyebrow">The lawyer</span><h3>Venkata Krishna</h3><p>Advocate, Supreme Court of India. A working life spent on rights and provenance, now applied to a village craft.</p></div>
      <div class="founder"><span class="eyebrow">The designer</span><h3>Rajni Sharma</h3><p>Sat with the weavers, rebuilt the technique, and turned a revival into something people would want to wear.</p></div>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="timeline">
      <div><b>c. 1635</b><p>Raja Bhupat Pal founds Basohli on the right bank of the Ravi.</p></div>
      <div><b>17th c.</b><p>The bazaar is known for its pashmina. The palace keeps the weavers in work.</p></div>
      <div><b>2016</b><p>The trust sets up the first loom and the first group of spinners.</p></div>
      <div><b>2026</b><p>Twelve spinners, four looms, about forty pieces a month.</p></div>
    </div>
  </section>

  <section class="panel madder">
    <span class="eyebrow">Five things we will not trade away</span>
    <h2>If it makes the brand louder and the story less true, we don’t do it.</h2>
    <div class="values" style="margin-top:32px">
      <div><span class="eyebrow">01 By hand, or not at all</span><p>No power loom, ever. We train more hands instead.</p></div>
      <div><span class="eyebrow">02 Nothing hidden</span><p>Spinner, weaver, village and date on every piece.</p></div>
      <div><span class="eyebrow">03 The maker is paid first</span><p>Rates set before margin and published openly.</p></div>
      <div><span class="eyebrow">04 Nothing added</span><p>Organic starch. No carbonising, no acid wash, no nylon.</p></div>
      <div><span class="eyebrow">05 Slow is the point</span><p>A week per shawl is why it outlives you.</p></div>
    </div>
  </section>
  ${diaries}
`);

/* ───────── NĀMA ───────── */
page('nama.html', 'Nāma — personalised Khadi-Pashmina — KHADDI', 'Any KHADDI stole or shawl, hand-embroidered with a name, initials, a date or a short line.', `
  <section class="split">
    <div class="txt">
      <span class="eyebrow">Nāma · the signature</span>
      <h2>A commission, not a scarf.</h2>
      <p>Choose a piece, type a name, pick a thread. Rekha and her group embroider it by hand along the border. Latin script, Devanagari, or both.</p>
      <div class="blk" style="border-top:0;padding-top:6px">
        <label for="n1" class="lab">Your line <span style="font-size:14px;color:var(--ink-soft)">up to 24 characters</span></label>
        <input id="n1" class="field" style="background:var(--undyed)" value="For Clara · 12.12.26">
      </div>
      <div class="blk"><span class="lab">Script</span><div class="chips"><span class="chip">Latin</span><span class="chip">देवनागरी</span><span class="chip on">Both</span></div></div>
      <div class="blk"><span class="lab">Thread</span><div class="chips" style="gap:12px"><span class="dot on" style="background:${SW.madder}"></span><span class="dot" style="background:${SW.lapis}"></span><span class="dot" style="background:${SW.saffron}"></span><span class="dot" style="background:#5b6b46"></span><span class="dot" style="background:${SW.undyed}"></span></div></div>
      <div class="blk"><span class="lab">Placement</span><div class="chips"><span class="chip on">Border, one end</span><span class="chip">Border, both ends</span><span class="chip">Corner</span></div></div>
      <a class="btn btn-madder" href="shop.html">Choose a piece — from €380</a>
    </div>
    <div class="pic" style="background:var(--undyed-2);display:grid;place-items:center;padding:40px">
      <img src="${P}detail-stitch.jpg" alt="Hand embroidery along the edge of a shawl" style="opacity:.92">
      <div class="stitch" style="position:relative;z-index:2;width:min(86%,440px);background-color:rgba(244,239,228,.94);text-align:center;box-shadow:0 30px 60px -30px rgba(20,22,28,.5)">
        <span class="eyebrow">Live preview</span>
        <div class="latin" style="margin-top:8px">For Clara · 12.12.26</div>
        <div class="dv">क्लारा के लिए</div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="stats">
      <div class="stat"><b>25 Nov</b><span>Last day to order a Nāma piece for delivery before Christmas.</span></div>
      <div class="stat"><b>14 days</b><span>Embroidery by hand, after the piece is woven.</span></div>
      <div class="stat"><b>7 days</b><span>Shipping to the EU, duty and VAT paid.</span></div>
      <div class="stat"><b>+ €70–110</b><span>Added to the piece, by length of line and number of scripts.</span></div>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <h2 class="section-title">How a Nāma piece is made</h2>
    <div class="grid g4">
      <div class="step"><img src="${P}ravi-1.jpg" alt="" loading="lazy"><div><span class="n">01</span><h3>Pick the cloth</h3><p>Any stole or shawl in the shop, or one from the next drop.</p></div></div>
      <div class="step"><img src="${P}detail-stitch.jpg" alt="" loading="lazy"><div><span class="n">02</span><h3>Write the line</h3><p>We send a drawn proof in both scripts within a day. Nothing is stitched until you say yes.</p></div></div>
      <div class="step"><img src="${C}embroidery.jpg" alt="Embroiderers at work in the hub" loading="lazy"><div><span class="n">03</span><h3>Embroidered</h3><p>By hand, in the hub in Basohli. The embroiderer’s name goes on the passport.</p></div></div>
      <div class="step"><img src="${P}nama-1.jpg" alt="" loading="lazy"><div><span class="n">04</span><h3>Filmed and sent</h3><p>Forty seconds of your name being stitched, then a numbered box to your door.</p></div></div>
    </div>
  </section>

  <section class="panel ink">
    <span class="eyebrow">Before you order</span>
    <h2>Personalised orders cannot be returned.</h2>
    <p>EU rules give fourteen days to change your mind, but not on something made to your specification. We will always send the proof first, and we will re-embroider at cost if you ever want it changed.</p>
  </section>
`);

/* ───────── MAKERS ───────── */
const makers = [['Shabnam Devi', 'Spinner · 11 years', 'S', 'I know a piece is finished when the thread stops arguing with me.', 62], ['Bishan Dass', 'Weaver · loom no. 4 · 23 years', 'B', 'My father had this loom. For twenty years it had nothing on it.', 48], ['Rekha Devi', 'Embroiderer · 8 years', 'R', 'A name takes me two days. I say it aloud while I work.', 71], ['Sunita Devi', 'Spinner · 6 years', 'S', 'The hardest part is the first hour. After that the hands remember.', 39], ['Kamlesh Kumari', 'Spinner and dyer · 9 years', 'K', 'Madder root is slow. It gives you the colour when it is ready.', 44], ['Mohd. Rafiq', 'Weaver · loom no. 2 · 17 years', 'M', 'I want whoever buys this to know it was not made in a hurry.', 53]];
page('makers.html', 'The Makers — KHADDI', 'The spinners, weavers and embroiderers of the Basohli hub, by name.', `
  <div class="shop-head">
    <h1>The Makers</h1>
    <p>Sixteen people work in the hub. Each has a page, and each is named on what they make.</p>
  </div>
  <div class="stats">
    <div class="stat"><b>16</b><span>People earning from the hub this month.</span></div>
    <div class="stat"><b>41</b><span>Pieces made in October, numbered against the year.</span></div>
    <div class="stat"><b>38.7%</b><span>Of an average piece’s price goes to the people who made it.</span></div>
    <div class="stat"><b>2016</b><span>The year the first loom went back to work.</span></div>
  </div>

  <section class="section">
    <div class="grid g3">${makers.map(([n, r, i, q, pcs]) => `
      <a class="maker" href="#"><div class="ph">${i}<small>Portrait · shoot week</small></div><div class="b"><h3>${n}</h3><p class="r">${r} · ${pcs} pieces</p><q>${q}</q></div></a>`).join('')}
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <h2 class="section-title">From goat to cloth, by hand</h2>
    <div class="grid g4">
      <div class="step"><img src="${C}goats.jpg" alt="Goats grazing on the Changthang plateau" loading="lazy"><div><span class="n">01</span><h3>The fibre</h3><p>Combed from Changthangi goats in Ladakh each spring. 12–14 microns.</p></div></div>
      <div class="step"><img src="${C}dehairing.jpg" alt="Women separating fibre by hand" loading="lazy"><div><span class="n">02</span><h3>Dehairing</h3><p>The coarse guard hair is picked out by hand. No carbonising.</p></div></div>
      <div class="step"><img src="${C}charkha.jpg" alt="A spinner at a box charkha" loading="lazy"><div><span class="n">03</span><h3>Spinning</h3><p>On a charkha. About nine days of yarn for one shawl.</p></div></div>
      <div class="step"><img src="${C}weaver.jpg" alt="A weaver at the loom" loading="lazy"><div><span class="n">04</span><h3>Weaving</h3><p>On a khaddi. Three to six days, with organic starch on the warp.</p></div></div>
    </div>
  </section>

  ${film}

  <section class="section" style="padding-bottom:0">
    <h2 class="section-title">What we pay</h2>
    <div style="max-width:980px;margin:0 auto">
      <table class="t">
        <thead><tr><th>Work</th><th>Unit</th><th>Rate</th><th>On a €390 shawl</th></tr></thead>
        <tbody>
          <tr><td>Dehairing and carding</td><td>per 100 g of clean fibre</td><td>₹1,400</td><td>€29</td></tr>
          <tr><td>Spinning</td><td>per day at the charkha</td><td>₹650</td><td>€64</td></tr>
          <tr><td>Weaving</td><td>per day at the loom</td><td>₹850</td><td>€46</td></tr>
          <tr><td>Finishing and tassels</td><td>per piece</td><td>₹1,100</td><td>€12</td></tr>
          <tr><td>Embroidery (Nāma)</td><td>per day</td><td>₹750</td><td>—</td></tr>
        </tbody>
      </table>
      <p style="font-size:14px;color:var(--ink-soft);margin-top:12px">Rates are set before margin. They are reviewed each April with the people who do the work.</p>
    </div>
  </section>
`);

/* ───────── PASSPORT ───────── */
page('passport.html', 'Thread Passport — Piece No. 0187 — KHADDI', 'The digital record stitched into every KHADDI piece.', `
  <section class="passport" style="grid-template-columns:.9fr 1.1fr">
    ${phone}
    <div>
      <span class="eyebrow">khaddipashmina.com/p/0187</span>
      <h2>This is what opens when you tap the hem.</h2>
      <p>The page is built for ten seconds at a dinner table: a phone, a shawl, and the face of the person who made it. It loads in under a second and can be shared in one tap.</p>
      <ol><li>Opens with the maker, not with us.</li><li>Four names, and the days each spent on the piece.</li><li>Fibre, micron count, dye and lab batch.</li><li>A forty-second film of this piece on the loom.</li><li>Care, repair and re-embroidery booking.</li></ol>
      <a class="btn" href="shop.html">Shop the cloth</a>
    </div>
  </section>

  <section class="section">
    <div class="stats">
      <div class="stat"><b>NFC</b><span>A tag stitched under the hem label. Never glued or heat-pressed.</span></div>
      <div class="stat"><b>QR</b><span>Printed beside it, for phones that will not tap.</span></div>
      <div class="stat"><b>1 of 1</b><span>Each tag is unique and cannot be copied onto another piece.</span></div>
      <div class="stat"><b>No app</b><span>It opens in the browser, for you or for anyone you show it to.</span></div>
    </div>
  </section>

  <section class="split">
    <div class="pic"><img src="${P}worn-1.jpg" alt="A shawl worn outdoors" loading="lazy"></div>
    <div class="txt">
      <span class="eyebrow">Built to open standards</span>
      <h2>A passport before it becomes a requirement.</h2>
      <p>The EU is bringing in a Digital Product Passport for textiles over the next few years. Ours already carries a permanent identifier and can be read by a machine as well as a person.</p>
      <p>We made it so you could meet the spinner. The paperwork comes with it.</p>
    </div>
  </section>
`);

/* ───────── CONTACT ───────── */
page('contact.html', 'Contact — KHADDI', 'Write to the hub in Basohli or to the Discovering Roots Trust.', `
  <section class="contact">
    <div class="box">
      <span class="eyebrow">Write to us</span>
      <h1>A person in Basohli reads every message.</h1>
      <p style="color:var(--ink-soft)">We reply within two working days. For a Nāma proof or an order question, include the piece number.</p>
      <form class="form">
        <label for="c1">Name</label><input id="c1" class="field" style="background:var(--undyed)">
        <label for="c2">Email</label><input id="c2" class="field" type="email" style="background:var(--undyed)">
        <label for="c3">Piece number, if you have one</label><input id="c3" class="field" style="background:var(--undyed)" placeholder="0187">
        <label for="c4">Message</label><textarea id="c4" class="field" rows="5" style="background:var(--undyed)"></textarea>
        <button class="btn btn-madder" type="button" style="justify-self:start">Send</button>
      </form>
    </div>
    <div class="box lapis">
      <span class="eyebrow">Where we are</span>
      <h1>The hub, the trust, and the press desk.</h1>
      <dl>
        <div><dt>The hub</dt><dd>Basohli, Kathua district, Jammu &amp; Kashmir, India</dd></div>
        <div><dt>Orders and care</dt><dd>hello@khaddipashmina.com</dd></div>
        <div><dt>The trust</dt><dd>discoveringroots.org</dd></div>
        <div><dt>Press and institutions</dt><dd>press@discoveringroots.org</dd></div>
        <div><dt>Wholesale</dt><dd>Opens January 2027</dd></div>
      </dl>
    </div>
  </section>

  <section class="section" style="padding-bottom:0">
    <h2 class="section-title">Before you write</h2>
    <div class="faq">
      <details class="acc"><summary>When will my order arrive?</summary><div class="in">In-stock pieces ship in 48 hours and take about seven days to the EU. The date is shown before you pay.</div></details>
      <details class="acc"><summary>Can I visit the hub?</summary><div class="in">Yes, by arrangement. Write to us with your dates.</div></details>
      <details class="acc"><summary>Do you discount?</summary><div class="in">No. The price is what the work costs, and the makers are paid before anyone else.</div></details>
      <details class="acc"><summary>Can you repair a piece?</summary><div class="in">Yes. Book through the Thread Passport and it goes back to the person who made it.</div></details>
    </div>
  </section>
`);

console.log('built 8 pages');
