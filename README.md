<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MAPS FREIGHT — Android App Dev Spec for Shashank</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{--ink:#071527;--navy:#0E2645;--navy2:#143156;--gold:#C9A227;--gold-hi:#F3D57A;--gold-lo:#8A671C;--ivory:#F5EFDE;--slate:#9FB2CB;--line:rgba(201,162,39,.28);--green:#4ADE80;--red:#F87171;--amber:#FBBF24;--grad-gold:linear-gradient(120deg,#8A671C,#C9A227 30%,#F7E29B 50%,#C9A227 70%,#8A671C)}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{background:var(--ink);color:var(--ivory);font-family:'Jost',sans-serif;font-weight:300;line-height:1.7;overflow-x:hidden}
::selection{background:var(--gold);color:var(--ink)}
h1,h2,h3,h4{font-family:'Marcellus',serif;font-weight:400;letter-spacing:.02em}
.mono{font-family:'IBM Plex Mono',monospace}
.wrap{max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,48px)}
.gold-text{background:var(--grad-gold);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent}
.doc-head{padding:clamp(50px,8vw,90px) 0 clamp(30px,4vw,50px);text-align:center;background:radial-gradient(800px 350px at 50% 15%,rgba(27,62,107,.55),transparent 60%)}
.doc-head .eyebrow{font-size:10px;letter-spacing:.5em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:18px}
.doc-head h1{font-size:clamp(28px,4.2vw,46px);line-height:1.12;margin-bottom:14px}
.doc-head .sub{font-size:15px;color:var(--slate);max-width:640px;margin:0 auto}
.sec{padding:clamp(40px,5.5vw,70px) 0;border-top:1px solid rgba(159,178,203,.08)}
.stag{display:inline-block;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);padding:5px 14px;border:1px solid var(--line);margin-bottom:14px}
.sec h2{font-size:clamp(22px,3vw,34px);line-height:1.18;margin-bottom:10px}
.sec .lead{color:var(--slate);font-size:15px;max-width:700px;margin-bottom:30px}
.sec p{color:var(--slate);font-size:14px;margin-bottom:12px;max-width:780px}
.sec p strong,.sec li strong{color:var(--ivory);font-weight:500}
.sec h3{font-size:18px;margin:26px 0 8px;color:var(--gold-hi)}
.sec h4{font-size:15px;margin:18px 0 6px;color:var(--ivory)}

.card{background:linear-gradient(165deg,#0E2645,#0A1B33);border:1px solid rgba(159,178,203,.16);border-radius:6px;padding:20px 22px;margin-bottom:14px}
.card h4{font-size:15px;margin:0 0 6px}
.card p{font-size:13px;margin-bottom:6px}
.card p:last-child{margin-bottom:0}

table{width:100%;border-collapse:collapse;margin:18px 0;font-size:12.5px}
th{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);text-align:left;padding:10px 12px;border-bottom:1px solid var(--line);font-weight:500}
td{padding:11px 12px;border-bottom:1px solid rgba(159,178,203,.08);color:var(--slate);vertical-align:top}
td strong{color:var(--ivory);font-weight:500}
.tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}

.swatch{display:flex;gap:12px;flex-wrap:wrap;margin:14px 0}
.sw{width:80px;text-align:center}
.sw .box{height:46px;border-radius:6px;margin-bottom:4px;border:1px solid rgba(255,255,255,.1)}
.sw .hex{font-family:'IBM Plex Mono',monospace;font-size:9.5px;color:var(--slate)}
.sw .nm{font-size:10px;color:var(--ivory);font-weight:500}

.field-spec{display:grid;grid-template-columns:180px 100px 1fr;gap:0;border:1px solid rgba(159,178,203,.14);border-radius:4px;margin-bottom:2px;font-size:12.5px}
.field-spec>div{padding:8px 12px;border-bottom:1px solid rgba(159,178,203,.08)}
.field-spec .fn{color:var(--ivory);font-weight:500;border-right:1px solid rgba(159,178,203,.08)}
.field-spec .ft{color:var(--gold-hi);font-family:'IBM Plex Mono',monospace;font-size:10.5px;border-right:1px solid rgba(159,178,203,.08)}
.field-spec .fr{color:var(--slate)}
.fh{display:grid;grid-template-columns:180px 100px 1fr;gap:0;background:#081627;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:500;border:1px solid rgba(159,178,203,.14);border-bottom:none;border-radius:4px 4px 0 0;margin-top:14px}
.fh>div{padding:8px 12px;border-right:1px solid rgba(159,178,203,.08)}
.fh>div:last-child{border-right:none}

.screen-box{background:linear-gradient(165deg,#0E2645,#0A1B33);border:1px solid rgba(159,178,203,.16);border-radius:6px;overflow:hidden;margin-bottom:20px}
.sb-head{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid rgba(159,178,203,.1);background:rgba(8,22,39,.6)}
.sb-title{font-family:'Marcellus',serif;font-size:17px}
.sb-badge{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;padding:3px 10px;border-radius:16px}
.b-s{background:rgba(74,222,128,.1);color:var(--green);border:1px solid rgba(74,222,128,.25)}
.b-b{background:rgba(243,213,122,.1);color:var(--gold-hi);border:1px solid var(--line)}
.b-t{background:rgba(159,178,203,.1);color:var(--slate);border:1px solid rgba(159,178,203,.25)}
.b-a{background:rgba(248,113,113,.08);color:var(--red);border:1px solid rgba(248,113,113,.2)}
.b-all{background:rgba(251,191,36,.08);color:var(--amber);border:1px solid rgba(251,191,36,.25)}
.sb-body{padding:20px}
.sb-body p{font-size:13px;margin-bottom:10px}
.sb-body p:last-child{margin-bottom:0}

.rule{border-left:3px solid;padding:14px 18px;margin:14px 0;border-radius:0 4px 4px 0;font-size:13px}
.rule.r{border-color:var(--red);background:rgba(248,113,113,.05)}
.rule.g{border-color:var(--green);background:rgba(74,222,128,.04)}
.rule.y{border-color:var(--amber);background:rgba(251,191,36,.06)}
.rule.b{border-color:#60A5FA;background:rgba(96,165,250,.05)}
.rule b{font-weight:500;color:var(--ivory)}

.flow{display:flex;flex-direction:column;gap:0;margin:14px 0}
.flow-step{display:flex;gap:14px;align-items:flex-start}
.fl{display:flex;flex-direction:column;align-items:center;width:28px;flex:none}
.fd{width:12px;height:12px;border-radius:50%;border:2px solid var(--gold);background:var(--ink);flex:none;z-index:1}
.fd.f{background:var(--gold)}
.fw{width:1px;background:var(--line);flex:1;min-height:24px}
.ftxt{padding-bottom:16px;flex:1}
.ftxt h4{font-size:13.5px;margin-bottom:3px;font-family:'Jost',sans-serif;font-weight:500}
.ftxt p{font-size:12px;color:var(--slate);margin:0}

.toc{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin:22px 0 6px}
.toc a{display:flex;gap:10px;align-items:center;padding:11px 14px;background:linear-gradient(165deg,#0E2645,#0A1B33);border:1px solid rgba(159,178,203,.16);border-radius:4px;color:var(--ivory);text-decoration:none;font-size:12.5px;transition:border-color .3s,transform .3s}
.toc a:hover{border-color:var(--gold);transform:translateY(-2px)}
.toc a .n{font-family:'IBM Plex Mono',monospace;font-size:9.5px;color:var(--gold-hi);flex:none}
.sec ul,.sec ol{padding-left:20px;margin:10px 0;color:var(--slate);font-size:13.5px}
.sec li{margin-bottom:6px}
code{font-family:'IBM Plex Mono',monospace;font-size:12px;background:rgba(201,162,39,.08);padding:2px 6px;border-radius:3px;color:var(--gold-hi)}
.src{font-size:10px;color:rgba(159,178,203,.4);font-family:'IBM Plex Mono',monospace}
@media(max-width:700px){
  .field-spec,.fh{grid-template-columns:1fr;font-size:11.5px}
  .field-spec .fn,.field-spec .ft{border-right:none}
  .fh>div{border-right:none}
  .toc{grid-template-columns:1fr}
}
</style>
</head>
<body>

<div class="doc-head">
  <div class="wrap">
    <div class="eyebrow">For Shashank · Android App Dev Specification</div>
    <h1>MAPS FREIGHT<br><span class="gold-text">Version Broker — Complete App Spec</span></h1>
    <p class="sub">Every screen, every field, every rule, every colour, every edge case. From language selection to payment. Nothing left to guess. Android-first, Play Store ready.</p>
  </div>
</div>

<div class="wrap">
  <div class="toc">
    <a href="#s1"><span class="n">01</span> Design System & Colours</a>
    <a href="#s2"><span class="n">02</span> Tech Stack</a>
    <a href="#s3"><span class="n">03</span> App Architecture</a>
    <a href="#s4"><span class="n">04</span> Screen 0: Language</a>
    <a href="#s5"><span class="n">05</span> Screen 1: Role Selection</a>
    <a href="#s6"><span class="n">06</span> Screen 2: Registration</a>
    <a href="#s7"><span class="n">07</span> Screen 3: OTP Verification</a>
    <a href="#s8"><span class="n">08</span> Shipper Portal (4 screens)</a>
    <a href="#s9"><span class="n">09</span> Truck Owner Portal (4 screens)</a>
    <a href="#s10"><span class="n">10</span> Broker Portal (6 screens)</a>
    <a href="#s11"><span class="n">11</span> The Parda System</a>
    <a href="#s12"><span class="n">12</span> Wallet & Payments</a>
    <a href="#s13"><span class="n">13</span> WhatsApp Integration</a>
    <a href="#s14"><span class="n">14</span> Freshness Engine</a>
    <a href="#s15"><span class="n">15</span> Notifications</a>
    <a href="#s16"><span class="n">16</span> Admin Panel</a>
    <a href="#s17"><span class="n">17</span> Database Schema</a>
    <a href="#s18"><span class="n">18</span> Security Rules</a>
    <a href="#s19"><span class="n">19</span> Play Store Checklist</a>
    <a href="#s20"><span class="n">20</span> Build Priority & Phases</a>
  </div>
</div>

<!-- ===================== 01 DESIGN SYSTEM ===================== -->
<section class="sec" id="s1">
  <div class="wrap">
    <div class="stag">01 · Design System</div>
    <h2>Colours, Typography & Components</h2>
    <p class="lead">Match the website exactly. Same DNA — navy backgrounds, gold accents, ivory text. The app is the website's younger brother, not a different family.</p>

    <h3>Colour Palette — Use these exact hex values</h3>
    <div class="swatch">
      <div class="sw"><div class="box" style="background:#071527"></div><div class="nm">Ink</div><div class="hex">#071527</div></div>
      <div class="sw"><div class="box" style="background:#0E2645"></div><div class="nm">Navy</div><div class="hex">#0E2645</div></div>
      <div class="sw"><div class="box" style="background:#143156"></div><div class="nm">Navy 2</div><div class="hex">#143156</div></div>
      <div class="sw"><div class="box" style="background:#C9A227"></div><div class="nm">Gold</div><div class="hex">#C9A227</div></div>
      <div class="sw"><div class="box" style="background:#F3D57A"></div><div class="nm">Gold Hi</div><div class="hex">#F3D57A</div></div>
      <div class="sw"><div class="box" style="background:#8A671C"></div><div class="nm">Gold Lo</div><div class="hex">#8A671C</div></div>
      <div class="sw"><div class="box" style="background:#F5EFDE"></div><div class="nm">Ivory</div><div class="hex">#F5EFDE</div></div>
      <div class="sw"><div class="box" style="background:#9FB2CB"></div><div class="nm">Slate</div><div class="hex">#9FB2CB</div></div>
      <div class="sw"><div class="box" style="background:#4ADE80"></div><div class="nm">Green</div><div class="hex">#4ADE80</div></div>
      <div class="sw"><div class="box" style="background:#F87171"></div><div class="nm">Red</div><div class="hex">#F87171</div></div>
      <div class="sw"><div class="box" style="background:#FBBF24"></div><div class="nm">Amber</div><div class="hex">#FBBF24</div></div>
    </div>

    <h3>Semantic Colour Usage</h3>
    <div class="tbl-wrap"><table>
      <tr><th>Purpose</th><th>Colour</th><th>Rule</th></tr>
      <tr><td><strong>Screen backgrounds</strong></td><td>Ink #071527</td><td>Always. No white backgrounds anywhere in the app</td></tr>
      <tr><td><strong>Cards / surfaces</strong></td><td>Navy #0E2645</td><td>Cards, bottom sheets, modals</td></tr>
      <tr><td><strong>Input fields</strong></td><td>#081627 with border #1B3E6B</td><td>Dark inputs, gold border on focus</td></tr>
      <tr><td><strong>Primary text</strong></td><td>Ivory #F5EFDE</td><td>All main text, headings</td></tr>
      <tr><td><strong>Secondary text</strong></td><td>Slate #9FB2CB</td><td>Descriptions, timestamps, labels</td></tr>
      <tr><td><strong>Primary CTA buttons</strong></td><td>Gold gradient (Lo→Gold→Hi→Gold→Lo)</td><td>Main actions: Register, Post Load, Unlock</td></tr>
      <tr><td><strong>Secondary buttons</strong></td><td>Transparent + Gold border</td><td>Cancel, Back, secondary actions</td></tr>
      <tr><td><strong>Live / Active</strong></td><td>Green #4ADE80</td><td>Live listing badge, success toast, active status</td></tr>
      <tr><td><strong>Error / Critical</strong></td><td>Red #F87171</td><td>Errors, rejection, forced expiry, violations</td></tr>
      <tr><td><strong>Warning / Pending</strong></td><td>Amber #FBBF24</td><td>Pending approval, low wallet, expiring soon</td></tr>
      <tr><td><strong>Locked / Parda</strong></td><td>Diagonal stripes: navy + gold-lo at 10% opacity</td><td>The curtain pattern covering hidden info</td></tr>
    </table></div>

    <h3>Typography</h3>
    <div class="tbl-wrap"><table>
      <tr><th>Role</th><th>Font</th><th>Weight</th><th>Size Range</th></tr>
      <tr><td><strong>Headings / Titles</strong></td><td>Marcellus (Google Fonts) — use Noto Serif as fallback for Hindi/Gujarati</td><td>400</td><td>20–28sp</td></tr>
      <tr><td><strong>Body text</strong></td><td>Jost (Google Fonts) — Noto Sans for Hindi/Gujarati</td><td>300, 400, 500</td><td>14–16sp</td></tr>
      <tr><td><strong>Mono / Data</strong></td><td>IBM Plex Mono or JetBrains Mono</td><td>400, 500</td><td>12–14sp</td></tr>
      <tr><td><strong>Minimum touch target</strong></td><td colspan="3">48dp height × 48dp width for all buttons and tappable areas. This audience is 40+ years old on budget phones.</td></tr>
      <tr><td><strong>Minimum body text</strong></td><td colspan="3">14sp minimum anywhere. Nothing smaller. Shippers squint = shippers leave.</td></tr>
    </table></div>

    <h3>Component Style Rules</h3>
    <ul>
      <li><strong>Border radius:</strong> 6dp for cards, 4dp for inputs, 24dp for pills/badges, 50% for avatars</li>
      <li><strong>Elevation:</strong> Minimal. Use border + subtle gradient instead of heavy shadows. Matches website.</li>
      <li><strong>Status bar:</strong> Ink #071527, light (white) status bar icons</li>
      <li><strong>Navigation bar:</strong> Navy #0E2645 with gold active indicator</li>
      <li><strong>Bottom sheet corners:</strong> 16dp top-left and top-right radius</li>
      <li><strong>Toast/Snackbar:</strong> Green background for success, Red for errors, Amber for warnings</li>
      <li><strong>Splash screen:</strong> Ink background, MAPS FREIGHT logo centered, gold shimmer animation</li>
    </ul>
  </div>
</section>

<!-- ===================== 02 TECH STACK ===================== -->
<section class="sec" id="s2">
  <div class="wrap">
    <div class="stag">02 · Tech Stack</div>
    <h2>Recommended Stack — Android First</h2>

    <div class="tbl-wrap"><table>
      <tr><th>Layer</th><th>Recommendation</th><th>Why</th></tr>
      <tr><td><strong>Frontend</strong></td><td>React Native (or Flutter)</td><td>One codebase, Android first, iOS later. React Native if Shashank knows JS; Flutter if he prefers Dart. Both work.</td></tr>
      <tr><td><strong>Backend</strong></td><td>Supabase (hosted PostgreSQL + Auth + Realtime + Storage)</td><td>Free tier covers MVP. Built-in OTP auth, row-level security, realtime subscriptions for live feed. Or Firebase if preferred.</td></tr>
      <tr><td><strong>Database</strong></td><td>PostgreSQL (via Supabase) or Firestore</td><td>Relational schema fits this app — users, listings, unlocks, transactions are all relational.</td></tr>
      <tr><td><strong>Auth</strong></td><td>Supabase Auth (phone OTP) or Firebase Auth</td><td>Built-in phone OTP, no third-party SMS API needed initially.</td></tr>
      <tr><td><strong>Payments</strong></td><td>Razorpay</td><td>₹2/transaction for UPI. Wallet top-up and subscription. India-standard. PCI compliant.</td></tr>
      <tr><td><strong>WhatsApp API</strong></td><td>Meta WhatsApp Business API via AiSensy or Interakt</td><td>₹0.50–0.85/message. Template messages for alerts, freshness pings, confirmations.</td></tr>
      <tr><td><strong>SMS OTP fallback</strong></td><td>MSG91 or Twilio</td><td>For users who don't receive Supabase's built-in OTP.</td></tr>
      <tr><td><strong>Hosting</strong></td><td>Supabase cloud (backend) + Vercel (admin web panel)</td><td>Free tiers for MVP. Scale as needed.</td></tr>
      <tr><td><strong>Push notifications</strong></td><td>Firebase Cloud Messaging (FCM)</td><td>Free, reliable, works even when Supabase is the main backend.</td></tr>
    </table></div>

    <div class="rule b">
      <b>Decision for Shashank:</b> Pick React Native or Flutter based on what you're fastest with. Both can ship this app in 3–4 weeks. The rest of this spec is framework-agnostic — it describes WHAT to build, not HOW to code it. Every screen, field, and rule applies regardless of framework choice.
    </div>
  </div>
</section>

<!-- ===================== 03 ARCHITECTURE ===================== -->
<section class="sec" id="s3">
  <div class="wrap">
    <div class="stag">03 · App Architecture</div>
    <h2>Screen Map & Navigation</h2>
    <p class="lead">The app has 4 zones: Onboarding (shared), Shipper Portal, Truck Owner Portal, Broker Portal — plus an Admin web panel (not in the Android app).</p>

    <div class="card">
      <h4>Navigation Flow</h4>
      <p><strong>Splash → Language → Role Select → Register → OTP → [Portal based on role]</strong></p>
      <p>After first login, app remembers language + role. Goes directly to portal on next open. Language changeable from Settings anytime.</p>
    </div>

    <div class="card">
      <h4>Bottom Navigation (inside portals)</h4>
      <p><strong>Shipper:</strong> Home (Post Load) · My Listings · Notifications · Profile</p>
      <p><strong>Truck Owner:</strong> Home (Post Trip) · My Trips · Notifications · Profile</p>
      <p><strong>Broker:</strong> Feed (Loads) · Feed (Trucks) · My Unlocks · Wallet · Profile</p>
    </div>

    <div class="rule y">
      <b>Rule:</b> There is NO role-switcher in this version. If a shipper is also a truck owner (allowed on same PAN), they log in once and get a combined dashboard. If they want to be a broker, they need a different PAN — enforced by the system.
    </div>
  </div>
</section>

<!-- ===================== 04 LANGUAGE ===================== -->
<section class="sec" id="s4">
  <div class="wrap">
    <div class="stag">04 · Screen 0</div>
    <h2>Language Selection</h2>
    <p class="lead">First screen ever. Shows only once (persisted). Three large buttons on Ink background with the MAPS FREIGHT logo above them.</p>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">S0 — Language Selection</span><span class="sb-badge b-all">First Open Only</span></div>
      <div class="sb-body">
        <p><strong>Layout:</strong> Logo centred top-third. Three full-width buttons stacked below. No other UI.</p>
        <p><strong>Buttons:</strong></p>
        <ul>
          <li><strong>English</strong> — Gold gradient fill (primary)</li>
          <li><strong>हिन्दी</strong> — Gold outline</li>
          <li><strong>ગુજરાતી</strong> — Gold outline</li>
        </ul>
        <p><strong>On tap:</strong> Save language to local storage. Navigate to Role Selection. Language applies to every string in the app from this point.</p>
        <p><strong>Small text at bottom:</strong> "You can change this later in Settings" (in all 3 languages simultaneously)</p>
      </div>
    </div>

    <div class="rule r">
      <b>Critical:</b> Every single UI string in the app must be in a strings resource file with English, Hindi, and Gujarati translations. No hardcoded English anywhere. Labels, buttons, errors, toasts, WhatsApp templates — everything. This is not optional — our primary users speak Hindi and Gujarati.
    </div>

    <div class="card">
      <h4>How to implement localization</h4>
      <p>React Native: <code>i18next</code> + <code>react-i18next</code> with JSON locale files</p>
      <p>Flutter: <code>flutter_localizations</code> + ARB files</p>
      <p>Maintain 3 files: <code>en.json</code>, <code>hi.json</code>, <code>gu.json</code></p>
      <p>For Hindi/Gujarati script rendering, use <strong>Noto Sans Devanagari</strong> and <strong>Noto Sans Gujarati</strong> from Google Fonts — bundle them, don't rely on device fonts.</p>
    </div>
  </div>
</section>

<!-- ===================== 05 ROLE SELECT ===================== -->
<section class="sec" id="s5">
  <div class="wrap">
    <div class="stag">05 · Screen 1</div>
    <h2>Role Selection</h2>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">S1 — Who Are You?</span><span class="sb-badge b-all">Onboarding</span></div>
      <div class="sb-body">
        <p><strong>Layout:</strong> Three large tappable cards, stacked vertically.</p>
        <p><strong>Card 1 — 📦 Shipper:</strong> "I have goods to ship" · Subtitle: "Post loads free. Brokers bring you trucks."</p>
        <p><strong>Card 2 — 🤝 Broker:</strong> "I connect shippers to trucks" · Subtitle: "₹2,000/month. Unlock contacts. Close deals."</p>
        <p><strong>Card 3 — 🚚 Truck Owner:</strong> "I have trucks" · Subtitle: "Post empty trips free. Get return loads."</p>
        <p><strong>Below cards:</strong> "Already have an account? <u>Login</u>" link → goes to phone entry + OTP.</p>
        <p><strong>On tap:</strong> Save selected role in state. Navigate to Registration form (Screen 2) with the chosen role.</p>
      </div>
    </div>

    <div class="rule y">
      <b>Card ordering:</b> Broker is in the MIDDLE, not first. Shipper first, Broker second, Truck Owner third. The supply sides sandwich the demand side — this is intentional visual hierarchy that says "the broker serves the other two."
    </div>
  </div>
</section>

<!-- ===================== 06 REGISTRATION ===================== -->
<section class="sec" id="s6">
  <div class="wrap">
    <div class="stag">06 · Screen 2</div>
    <h2>Registration — 3 Role-Specific Forms</h2>
    <p class="lead">Each role gets a different form. All end with OTP verification. Every field is specified below with its type, validation, and whether it's required.</p>

    <h3>Shipper Registration</h3>
    <div class="fh"><div>Field</div><div>Type</div><div>Rules</div></div>
    <div class="field-spec"><div class="fn">Full Name *</div><div class="ft">text</div><div class="fr">Min 2 chars. No numbers.</div></div>
    <div class="field-spec"><div class="fn">Company Name</div><div class="ft">text</div><div class="fr">Optional. Shown to brokers after unlock.</div></div>
    <div class="field-spec"><div class="fn">Phone (WhatsApp) *</div><div class="ft">tel</div><div class="fr">10 digits, starts with 6-9. Indian mobile only. <code>/^[6-9]\d{9}$/</code></div></div>
    <div class="field-spec"><div class="fn">City *</div><div class="ft">text</div><div class="fr">Autocomplete from city list or free text. Default suggestion: Gandhidham.</div></div>
    <div class="field-spec"><div class="fn">Goods Type *</div><div class="ft">multi-select</div><div class="fr">Options: Chemicals, Edible Oil, Salt, Ceramics, Steel, FMCG, Textile, Timber, General, Other</div></div>
    <div class="field-spec"><div class="fn">GSTIN</div><div class="ft">text</div><div class="fr">Optional. Format: <code>/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/</code></div></div>
    <div class="field-spec"><div class="fn">PAN Number *</div><div class="ft">text</div><div class="fr">Uppercase auto. <code>/^[A-Z]{5}[0-9]{4}[A-Z]$/</code>. PAN role-lock check on submit.</div></div>
    <div class="field-spec"><div class="fn">Terms checkbox *</div><div class="ft">checkbox</div><div class="fr">"I agree to the Terms of Use and Privacy Policy" — links to full text. Must be checked.</div></div>

    <h3>Truck Owner Registration</h3>
    <div class="fh"><div>Field</div><div>Type</div><div>Rules</div></div>
    <div class="field-spec"><div class="fn">Full Name *</div><div class="ft">text</div><div class="fr">Min 2 chars.</div></div>
    <div class="field-spec"><div class="fn">Company / Fleet Name</div><div class="ft">text</div><div class="fr">Optional.</div></div>
    <div class="field-spec"><div class="fn">Phone (WhatsApp) *</div><div class="ft">tel</div><div class="fr">Same validation as shipper.</div></div>
    <div class="field-spec"><div class="fn">City *</div><div class="ft">text</div><div class="fr">Base city where fleet is registered.</div></div>
    <div class="field-spec"><div class="fn">Number of Trucks *</div><div class="ft">select</div><div class="fr">Options: 1 · 2–5 · 6–15 · 15+</div></div>
    <div class="field-spec"><div class="fn">Body Types *</div><div class="ft">multi-select</div><div class="fr">Options: Open Body · Container/MXL · Trailer · Tanker · Tipper · Flatbed</div></div>
    <div class="field-spec"><div class="fn">Regular Routes</div><div class="ft">text</div><div class="fr">Free text. Example hint: "Ludhiana → Kandla, return empty"</div></div>
    <div class="field-spec"><div class="fn">PAN Number *</div><div class="ft">text</div><div class="fr">Same PAN validation + role-lock check.</div></div>
    <div class="field-spec"><div class="fn">Terms checkbox *</div><div class="ft">checkbox</div><div class="fr">Same as shipper.</div></div>

    <h3>Broker Registration</h3>
    <div class="fh"><div>Field</div><div>Type</div><div>Rules</div></div>
    <div class="field-spec"><div class="fn">Full Name *</div><div class="ft">text</div><div class="fr">Min 2 chars.</div></div>
    <div class="field-spec"><div class="fn">Firm / Agency Name *</div><div class="ft">text</div><div class="fr">Required for brokers. Displayed on Verified Broker badge.</div></div>
    <div class="field-spec"><div class="fn">Phone (WhatsApp) *</div><div class="ft">tel</div><div class="fr">Same validation.</div></div>
    <div class="field-spec"><div class="fn">City *</div><div class="ft">text</div><div class="fr">Base city.</div></div>
    <div class="field-spec"><div class="fn">PAN Number *</div><div class="ft">text</div><div class="fr">PAN role-lock: if this PAN exists as shipper OR truck owner → BLOCK with error.</div></div>
    <div class="field-spec"><div class="fn">Aadhaar Number *</div><div class="ft">tel</div><div class="fr">12 digits. <code>/^\d{12}$/</code>. Required for broker verification.</div></div>
    <div class="field-spec"><div class="fn">Years in Brokerage *</div><div class="ft">select</div><div class="fr">Options: Under 2 · 2–5 · 5–10 · 10+</div></div>
    <div class="field-spec"><div class="fn">Routes You Work *</div><div class="ft">multi-text</div><div class="fr">At least 1. Chips input: "Gujarat↔Delhi", "Gujarat↔Rajasthan", etc. Used for WhatsApp alerts.</div></div>
    <div class="field-spec"><div class="fn">Terms checkbox *</div><div class="ft">checkbox</div><div class="fr">Extended broker terms: includes no-number-sharing clause, no direct dealing outside platform rules.</div></div>

    <h3>PAN Role-Lock Rule — THE MOST IMPORTANT VALIDATION</h3>
    <div class="rule r">
      <b>HARD RULE — enforce in backend AND frontend:</b><br>
      • If PAN already registered as <strong>broker</strong> → block registration as shipper or truck owner (and vice versa).<br>
      • If PAN registered as <strong>shipper</strong> → allow registration as truck owner on same PAN (dual role). Combined dashboard.<br>
      • If PAN registered as <strong>truck owner</strong> → allow registration as shipper on same PAN.<br>
      • Error message: "This PAN is already registered as [ROLE]. Broker accounts cannot share identity with Shipper/Truck Owner accounts."<br>
      • <strong>This prevents brokers from gaming the system by posting fake listings under a different role.</strong>
    </div>
  </div>
</section>

<!-- ===================== 07 OTP ===================== -->
<section class="sec" id="s7">
  <div class="wrap">
    <div class="stag">07 · Screen 3</div>
    <h2>OTP Verification</h2>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">S3 — Verify Phone</span><span class="sb-badge b-all">Onboarding + Login</span></div>
      <div class="sb-body">
        <p><strong>Header:</strong> "Enter the 6-digit code sent to +91 98XXX XXXXX" (show masked phone)</p>
        <p><strong>Input:</strong> 6 individual digit boxes, auto-advance on entry, auto-submit when 6th digit entered.</p>
        <p><strong>Timer:</strong> "Resend OTP in 0:30" countdown. After 30s: "Didn't receive it? Resend OTP" tappable link.</p>
        <p><strong>Max retries:</strong> 3 OTP requests per phone per hour. After that: "Too many attempts. Try again in 1 hour."</p>
        <p><strong>On success (registration):</strong> Create user record in DB → navigate to portal. Shipper/Truck Owner = instant active. Broker = "Application submitted — under review" screen.</p>
        <p><strong>On success (login):</strong> Fetch user record → navigate to portal based on stored role.</p>
        <p><strong>On wrong code:</strong> Shake animation on digits. "Incorrect code. X attempts remaining." (max 5 wrong attempts, then block 15 min).</p>
      </div>
    </div>

    <div class="rule g">
      <b>After successful broker registration:</b> Do NOT go to feed. Show a dedicated "Application Under Review" screen with: "Your application is being verified by our team. You can browse listings in Free Preview mode (2-hour delay). We will notify you on WhatsApp once approved." Button: "Browse in Free Preview →"
    </div>
  </div>
</section>

<!-- ===================== 08 SHIPPER PORTAL ===================== -->
<section class="sec" id="s8">
  <div class="wrap">
    <div class="stag">08 · Shipper Portal</div>
    <h2>4 Screens — Simple, Fast, Free</h2>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">S-Home — Dashboard</span><span class="sb-badge b-s">Shipper</span></div>
      <div class="sb-body">
        <p><strong>ONE BIG BUTTON:</strong> "Post a Load" — gold gradient, full width, top of screen. This is the primary action. Nothing should distract from it.</p>
        <p><strong>Below:</strong> List of active listings as cards showing: Route (From → To), Goods type, Weight, Status badge (🟢 Live · 🟡 Broker Contacted · ⚫ Filled), Unlock count ("2 brokers interested"), time posted.</p>
        <p><strong>Empty state:</strong> "You haven't posted any loads yet. Post your first load and verified brokers will call you with trucks." + Arrow pointing to the button.</p>
      </div>
    </div>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">S-Post — Post a Load</span><span class="sb-badge b-s">Shipper</span></div>
      <div class="sb-body">
        <p><strong>Goal: Under 90 seconds to post.</strong></p>
        <div class="fh"><div>Field</div><div>Type</div><div>Rules</div></div>
        <div class="field-spec"><div class="fn">Goods Type *</div><div class="ft">select</div><div class="fr">Dropdown: same categories as registration</div></div>
        <div class="field-spec"><div class="fn">Weight (Tonnes) *</div><div class="ft">number</div><div class="fr">Range 1–100. Decimal allowed.</div></div>
        <div class="field-spec"><div class="fn">Pickup City *</div><div class="ft">text + autocomplete</div><div class="fr">Pre-fill from profile city. Can change.</div></div>
        <div class="field-spec"><div class="fn">Destination City *</div><div class="ft">text + autocomplete</div><div class="fr">Required.</div></div>
        <div class="field-spec"><div class="fn">Loading Date *</div><div class="ft">date picker</div><div class="fr">Quick chips: "Today" · "Tomorrow" · "Pick Date". No past dates.</div></div>
        <div class="field-spec"><div class="fn">Expected Rate</div><div class="ft">text</div><div class="fr">Optional. Free text: "₹45,000" or "Open to offers"</div></div>
        <div class="field-spec"><div class="fn">Pickup Address</div><div class="ft">text</div><div class="fr">Optional but encouraged. "For brokers who unlock your listing."</div></div>
        <div class="field-spec"><div class="fn">Notes</div><div class="ft">textarea</div><div class="fr">Optional. Max 200 chars. "Any special requirements?"</div></div>
        <p style="margin-top:12px"><strong>Submit button:</strong> "Post Load — Free" (gold gradient). On success: toast "Load posted! Brokers on this route will be alerted." Navigate to My Listings.</p>
      </div>
    </div>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">S-Listings — My Listings</span><span class="sb-badge b-s">Shipper</span></div>
      <div class="sb-body">
        <p>All loads posted by this shipper, newest first. Each card shows route, status, unlock count, time since posted.</p>
        <p><strong>Two action buttons on each live listing:</strong></p>
        <ul>
          <li><strong>"Still Available — Renew"</strong> (green) — extends 48hr timer. Fires when WhatsApp freshness check is answered YES.</li>
          <li><strong>"Shipped — Remove"</strong> (red outline) — removes from board. Optional: enter final rate for analytics.</li>
        </ul>
        <p><strong>Status badges:</strong> 🟢 Live · 🟡 Broker Contacted (someone unlocked) · 🟢 Booked (broker marked deal done) · ⚫ Expired · ⚫ Removed</p>
      </div>
    </div>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">S-Profile — Settings</span><span class="sb-badge b-s">Shipper</span></div>
      <div class="sb-body">
        <p>Edit: Name, Company, City, Goods types, GSTIN. Change language. Contact support (opens WhatsApp to +91 81600 24858). Logout.</p>
        <p><strong>Delete Account</strong> link at bottom — requires OTP re-verification before deletion.</p>
      </div>
    </div>
  </div>
</section>

<!-- ===================== 09 TRUCK OWNER PORTAL ===================== -->
<section class="sec" id="s9">
  <div class="wrap">
    <div class="stag">09 · Truck Owner Portal</div>
    <h2>4 Screens — Mirror of Shipper</h2>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">T-Home — Dashboard</span><span class="sb-badge b-t">Truck Owner</span></div>
      <div class="sb-body">
        <p><strong>ONE BIG BUTTON:</strong> "Post Empty Trip" — gold gradient, full width.</p>
        <p>Below: list of active posted trips. Same card pattern as shipper but showing truck type + capacity instead of goods.</p>
      </div>
    </div>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">T-Post — Post Empty Trip</span><span class="sb-badge b-t">Truck Owner</span></div>
      <div class="sb-body">
        <div class="fh"><div>Field</div><div>Type</div><div>Rules</div></div>
        <div class="field-spec"><div class="fn">Truck Type *</div><div class="ft">select</div><div class="fr">Open Body · Container/MXL · Trailer · Tanker · Tipper · Flatbed</div></div>
        <div class="field-spec"><div class="fn">Capacity (Tonnes) *</div><div class="ft">number</div><div class="fr">1–100</div></div>
        <div class="field-spec"><div class="fn">From City *</div><div class="ft">text + autocomplete</div><div class="fr">Where truck is right now</div></div>
        <div class="field-spec"><div class="fn">Going To *</div><div class="ft">text + autocomplete</div><div class="fr">Where truck is headed (empty)</div></div>
        <div class="field-spec"><div class="fn">Departure Date *</div><div class="ft">date picker</div><div class="fr">Today / Tomorrow / Pick Date</div></div>
        <div class="field-spec"><div class="fn">Truck Number *</div><div class="ft">text</div><div class="fr">Format: XX-00-XX-0000. Hidden behind parda. Only visible after unlock.</div></div>
        <div class="field-spec"><div class="fn">Driver Name</div><div class="ft">text</div><div class="fr">Optional. Hidden behind parda.</div></div>
        <div class="field-spec"><div class="fn">Driver Phone</div><div class="ft">tel</div><div class="fr">Optional. Hidden behind parda.</div></div>
        <div class="field-spec"><div class="fn">Expected Rate</div><div class="ft">text</div><div class="fr">Optional. "₹55,000" or "Open"</div></div>
        <div class="field-spec"><div class="fn">Willing to Detour?</div><div class="ft">toggle</div><div class="fr">Yes/No. Shown publicly.</div></div>
        <p style="margin-top:12px"><strong>Submit:</strong> "Post Trip — Free"</p>
      </div>
    </div>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">T-Trips + T-Profile</span><span class="sb-badge b-t">Truck Owner</span></div>
      <div class="sb-body">
        <p><strong>My Trips:</strong> Same as shipper's My Listings — with Renew and Remove actions.</p>
        <p><strong>Profile:</strong> Same as shipper — edit fleet details, change language, support, logout.</p>
      </div>
    </div>
  </div>
</section>

<!-- ===================== 10 BROKER PORTAL ===================== -->
<section class="sec" id="s10">
  <div class="wrap">
    <div class="stag">10 · Broker Portal</div>
    <h2>6 Screens — The Core Product</h2>
    <p class="lead">The broker spends 90% of their time on the Feed screen. Everything else supports it.</p>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">B-Feed — Listings Board</span><span class="sb-badge b-b">Broker · Main Screen</span></div>
      <div class="sb-body">
        <p><strong>Two tabs at top:</strong> 🟢 Loads (goods) · 🔵 Trucks (empty trips). Default: Loads.</p>
        <p><strong>Each listing card shows (PUBLIC — free to everyone):</strong></p>
        <ul>
          <li>Route: From → To (large, bold, Marcellus font)</li>
          <li>Type + Weight: "Edible Oil · 24T"</li>
          <li>Date: "Loading Today" / "Tomorrow" / actual date</li>
          <li>Time posted: "12 min ago"</li>
          <li>Badge: 🟢 LIVE · Unlock count "2/5 unlocked"</li>
        </ul>
        <p><strong>PARDA SECTION (hidden info — displayed as diagonal-striped block):</strong></p>
        <ul>
          <li>Contact Name: ████████</li>
          <li>Phone: +91 ██████████</li>
          <li>Address: ████████████</li>
          <li>Rate: ₹ ██,███</li>
        </ul>
        <p><strong>Unlock button:</strong> Gold gradient: "🔓 Unlock — ₹150" (or "🔓 Unlock — ₹100" for Premium tier later)</p>
        <p><strong>Already unlocked:</strong> Button changes to "✓ Unlocked" (green, non-tappable). Full details visible. Call button appears.</p>

        <h4>Filters (top bar, below tabs):</h4>
        <p>Filter chips: Route (From, To), Goods Type, Date Range, Truck Type. Tap chip → bottom sheet with options. Applied filters show as removable pills.</p>

        <h4>Feed timing rules:</h4>
        <p><strong>Subscribed broker (Verified / Premium):</strong> listings appear THE SECOND they are posted. Badge: "⚡ Instant Access"</p>
        <p><strong>Free Preview broker:</strong> listings appear 2 HOURS after posting. Banner at top: "Free Preview — listings delayed 2 hours. Subscribe for instant access."</p>
      </div>
    </div>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">B-Unlocks — My Unlocks</span><span class="sb-badge b-b">Broker</span></div>
      <div class="sb-body">
        <p>Every listing the broker has ever unlocked, sorted newest first. Full contact details visible (no parda — already paid). Each card shows:</p>
        <ul>
          <li>Route, type, weight, date (same as feed card)</li>
          <li><strong>Revealed info:</strong> Contact name, phone (tappable → opens dialer), address, rate</li>
          <li><strong>Deal status:</strong> three states with action buttons:</li>
        </ul>
        <p><strong>"Called"</strong> (amber) — default after unlock. Means broker has the info.<br>
        <strong>"Deal Done ✓"</strong> (green) — broker taps this when deal is closed. +1 to deal counter.<br>
        <strong>"No Deal ✗"</strong> (grey) — broker taps this when deal fell through. Listing goes back to Live for others.</p>
        <p><strong>Tap phone number → opens native phone dialer pre-filled with the number.</strong></p>
      </div>
    </div>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">B-Wallet — Wallet & Transactions</span><span class="sb-badge b-b">Broker</span></div>
      <div class="sb-body">
        <p><strong>Top card:</strong> Big wallet balance number, e.g., "₹ 1,850" on dark card with gold text.</p>
        <p><strong>Top-up buttons:</strong> ₹500 · ₹1,000 · ₹2,000 · Custom Amount → opens Razorpay payment sheet.</p>
        <p><strong>Transaction history:</strong> Scrollable list showing every debit (unlock ₹150) and credit (top-up). Each row: description, amount (+/-), balance after, timestamp.</p>
        <p><strong>Low balance warning:</strong> Amber banner when balance drops below ₹300: "Balance low — top up to keep unlocking leads."</p>
      </div>
    </div>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">B-Post — Post on Behalf</span><span class="sb-badge b-b">Broker · Subscribed Only</span></div>
      <div class="sb-body">
        <p><strong>Only visible to subscribed brokers.</strong> Two sub-tabs: "Post Load" · "Post Truck"</p>
        <p>Forms identical to shipper/truck owner forms, but with additional fields:</p>
        <div class="field-spec"><div class="fn">Client Name *</div><div class="ft">text</div><div class="fr">The shipper's or truck owner's name (this becomes the contact behind parda)</div></div>
        <div class="field-spec"><div class="fn">Client Phone *</div><div class="ft">tel</div><div class="fr">The actual contact number that appears after unlock</div></div>
        <p style="margin-top:10px">Listings posted on behalf are tagged "Posted by Broker" in admin view but appear normal to other brokers. The posting broker cannot unlock their own listings.</p>
      </div>
    </div>

    <div class="screen-box">
      <div class="sb-head"><span class="sb-title">B-Profile — Subscription & Profile</span><span class="sb-badge b-b">Broker</span></div>
      <div class="sb-body">
        <p><strong>Status:</strong> Current plan name + badge. "Verified Broker" or "Free Preview"</p>
        <p><strong>Subscription:</strong> If free → "Subscribe — ₹2,000/month" gold button → Razorpay. If subscribed → renewal date, "Renew" button, payment history.</p>
        <p><strong>Stats card:</strong> Total Unlocks · Total Deals Closed · Deal Conversion Rate · Member Since</p>
        <p><strong>Route Alerts:</strong> Manage WhatsApp alert routes. Add/remove corridors. "You will get a WhatsApp message within seconds of any new listing on these routes."</p>
        <p><strong>Edit:</strong> Name, firm, city, routes. Change language. Support. Logout.</p>
      </div>
    </div>
  </div>
</section>

<!-- ===================== 11 PARDA ===================== -->
<section class="sec" id="s11">
  <div class="wrap">
    <div class="stag">11 · The Parda System</div>
    <h2>Unlock Flow — Step by Step</h2>
    <p class="lead">This is the revenue engine. Every detail matters.</p>

    <div class="flow">
      <div class="flow-step"><div class="fl"><div class="fd f"></div><div class="fw"></div></div><div class="ftxt"><h4>Broker taps "Unlock — ₹150"</h4><p>Bottom sheet rises: "Unlock contact details for this listing? ₹150 will be deducted from your wallet. Balance: ₹1,850."</p></div></div>
      <div class="flow-step"><div class="fl"><div class="fd f"></div><div class="fw"></div></div><div class="ftxt"><h4>Wallet check (backend)</h4><p>If balance ≥ ₹150 → proceed. If not → "Insufficient balance. Top up your wallet." with top-up button in-sheet.</p></div></div>
      <div class="flow-step"><div class="fl"><div class="fd f"></div><div class="fw"></div></div><div class="ftxt"><h4>Unlock cap check</h4><p>If this listing already has 5 unlocks → "This listing has reached maximum unlocks. Try another listing." <strong>MAX 5 UNLOCKS PER LISTING.</strong></p></div></div>
      <div class="flow-step"><div class="fl"><div class="fd f"></div><div class="fw"></div></div><div class="ftxt"><h4>Deduction + reveal</h4><p>Deduct ₹150 from wallet. Create unlock record. Animate: parda (diagonal stripes) slides down to reveal contact info with a gold flash. Beautiful moment — this is the money shot.</p></div></div>
      <div class="flow-step"><div class="fl"><div class="fd f"></div><div class="fw"></div></div><div class="ftxt"><h4>Revealed info shows:</h4><p>Contact Name, Phone (tappable → dialer), Address, Expected Rate. Plus "📞 Call Now" green button.</p></div></div>
      <div class="flow-step"><div class="fl"><div class="fd f"></div><div class="fw"></div></div><div class="ftxt"><h4>Shipper/truck owner gets WhatsApp</h4><p>"A verified broker has unlocked your listing [Route]. Expect a call shortly."</p></div></div>
      <div class="flow-step"><div class="fl"><div class="fd"></div></div><div class="ftxt"><h4>Second visit = no charge</h4><p>If this broker opens this listing again, details are already visible. Green "✓ Unlocked" badge. Never charged twice for same listing.</p></div></div>
    </div>

    <div class="rule r">
      <b>Hard rules:</b><br>
      • A broker CANNOT unlock their own listing (if posted on behalf).<br>
      • Free Preview brokers CAN unlock — they just see listings 2 hours late. Unlocking still costs ₹150.<br>
      • Unlock count shown publicly on listing card: "2/5 unlocked" — creates urgency.<br>
      • After 5 unlocks → listing shows "Fully unlocked" and unlock button is disabled for everyone else.
    </div>

    <h3>Dead-Lead Refund</h3>
    <div class="rule g">
      <b>Auto-refund rule:</b> If a broker reports a lead as "dead" (cargo shipped, wrong number, unreachable) within 2 hours of unlock → auto-refund ₹150 to wallet. Max 2 refunds per broker per month. Admin gets notification of all refund requests. 3+ refund requests against the same poster → flag poster for admin review.
    </div>
  </div>
</section>

<!-- ===================== 12 WALLET & PAYMENTS ===================== -->
<section class="sec" id="s12">
  <div class="wrap">
    <div class="stag">12 · Wallet & Payments</div>
    <h2>Razorpay Integration</h2>

    <h3>Two payment types:</h3>
    <div class="card"><h4>1 — Wallet Top-up (one-time)</h4>
    <p>Broker taps a preset amount (₹500, ₹1,000, ₹2,000) or enters custom → Razorpay payment sheet opens → UPI / Card / Net Banking → on success: credit wallet, create transaction record, show toast "₹X added to wallet."</p>
    <p><strong>Razorpay Order ID</strong> created on backend. Payment verified via webhook or polling. Never trust client-side success alone.</p></div>

    <div class="card"><h4>2 — Subscription (recurring monthly)</h4>
    <p>Razorpay Subscription API. Plan: ₹2,000/month. On first payment: set broker tier to "standard", set subscription end date to +30 days. On renewal: extend by 30 days. On failure: revert to "free_preview" after 3-day grace period.</p>
    <p><strong>Auto-renewal:</strong> Razorpay handles recurring mandate via UPI autopay or card. Broker can cancel from Profile screen → reverts to Free Preview at period end.</p></div>

    <h3>Transaction Log Schema</h3>
    <div class="tbl-wrap"><table>
      <tr><th>Field</th><th>Type</th><th>Example</th></tr>
      <tr><td><strong>id</strong></td><td>uuid</td><td>tx_a1b2c3</td></tr>
      <tr><td><strong>user_id</strong></td><td>foreign key</td><td>u3 (Vikram)</td></tr>
      <tr><td><strong>type</strong></td><td>enum</td><td>wallet_topup · unlock · subscription · refund</td></tr>
      <tr><td><strong>amount</strong></td><td>int</td><td>+2000 or -150</td></tr>
      <tr><td><strong>balance_after</strong></td><td>int</td><td>1850</td></tr>
      <tr><td><strong>ref_id</strong></td><td>string</td><td>Razorpay order ID or unlock ID</td></tr>
      <tr><td><strong>created_at</strong></td><td>timestamp</td><td>2026-07-22T09:15:00Z</td></tr>
    </table></div>
  </div>
</section>

<!-- ===================== 13 WHATSAPP ===================== -->
<section class="sec" id="s13">
  <div class="wrap">
    <div class="stag">13 · WhatsApp Integration</div>
    <h2>6 Template Messages</h2>
    <p class="lead">WhatsApp is not a nice-to-have — it is the primary delivery channel for alerts, freshness checks, and confirmations. Use Meta WhatsApp Business API via AiSensy or Interakt (₹0.50–0.85/message).</p>

    <div class="tbl-wrap"><table>
      <tr><th>#</th><th>Template Name</th><th>Trigger</th><th>Recipient</th><th>Message</th></tr>
      <tr><td>1</td><td><strong>welcome_shipper</strong></td><td>Shipper registers</td><td>Shipper</td><td>"Welcome to MAPS FREIGHT! 🚛 Your shipper account is active. Post your first load now — verified brokers will call you with trucks."</td></tr>
      <tr><td>2</td><td><strong>welcome_truck</strong></td><td>Truck owner registers</td><td>Truck owner</td><td>"Your MAPS FREIGHT truck account is live! 🚛 Post your empty return trip and brokers will call you with cargo."</td></tr>
      <tr><td>3</td><td><strong>broker_approved</strong></td><td>Admin approves broker</td><td>Broker</td><td>"Your MAPS FREIGHT broker account has been approved! ✅ Subscribe now for instant access to listings and WhatsApp route alerts."</td></tr>
      <tr><td>4</td><td><strong>listing_unlocked</strong></td><td>Broker unlocks a listing</td><td>Shipper / Truck owner (listing poster)</td><td>"A verified broker has unlocked your listing [Route, Type]. Expect a call shortly."</td></tr>
      <tr><td>5</td><td><strong>route_alert</strong></td><td>New listing posted on subscribed route</td><td>Subscribed brokers with matching route</td><td>"🚛 New [load/truck] on your route! [From] → [To] · [Type] [Weight]T · [Date]. Open MAPS FREIGHT to unlock."</td></tr>
      <tr><td>6</td><td><strong>freshness_check</strong></td><td>24 hours after listing posted</td><td>Listing poster</td><td>"Your listing [Route, Type] has been live for 24 hours. Reply YES if still available, NO to remove."</td></tr>
    </table></div>

    <div class="rule y">
      <b>WhatsApp reply handling (for freshness check):</b> If user replies "YES" or "हां" or "Ha" → extend listing 24 hours. If "NO" or "ना" → remove listing. If no reply within 4 hours → auto-remove. This requires a webhook listener on the WhatsApp Business API to process incoming replies.
    </div>
  </div>
</section>

<!-- ===================== 14 FRESHNESS ===================== -->
<section class="sec" id="s14">
  <div class="wrap">
    <div class="stag">14 · Freshness Engine</div>
    <h2>Keeping the Board Alive</h2>

    <div class="flow">
      <div class="flow-step"><div class="fl"><div class="fd f"></div><div class="fw"></div></div><div class="ftxt"><h4>Hour 0 — Listing posted</h4><p>Status: LIVE. Visible to all (subscribed instantly, free preview after 2hrs).</p></div></div>
      <div class="flow-step"><div class="fl"><div class="fd f"></div><div class="fw"></div></div><div class="ftxt"><h4>Hour 24 — Freshness check sent</h4><p>WhatsApp template #6 sent to poster. System waits for reply.</p></div></div>
      <div class="flow-step"><div class="fl"><div class="fd f"></div><div class="fw"></div></div><div class="ftxt"><h4>Reply YES → extends to Hour 48</h4><p>Listing stays live another 24 hours. Second freshness check at hour 48.</p></div></div>
      <div class="flow-step"><div class="fl"><div class="fd f"></div><div class="fw"></div></div><div class="ftxt"><h4>Reply NO or no reply in 4 hours → auto-remove</h4><p>Listing status → EXPIRED. Disappears from feed. No broker can unlock it.</p></div></div>
      <div class="flow-step"><div class="fl"><div class="fd"></div></div><div class="ftxt"><h4>Hour 48 — Hard auto-expiry</h4><p>Even if renewed at 24hrs, listing auto-expires at 48hrs maximum. Must re-post if still available.</p></div></div>
    </div>

    <div class="rule r">
      <b>Cron job required:</b> Run every 15 minutes. Queries listings where <code>created_at + 24hrs < now()</code> AND <code>freshness_checked = false</code>. Sends WhatsApp. Marks <code>freshness_checked = true</code>. Second cron: removes listings where <code>created_at + 48hrs < now()</code> OR <code>freshness_check_sent + 4hrs < now() AND no_reply</code>.
    </div>
  </div>
</section>

<!-- ===================== 15 NOTIFICATIONS ===================== -->
<section class="sec" id="s15">
  <div class="wrap">
    <div class="stag">15 · Notifications</div>
    <h2>In-App + Push + WhatsApp</h2>

    <div class="tbl-wrap"><table>
      <tr><th>Event</th><th>In-App</th><th>Push (FCM)</th><th>WhatsApp</th></tr>
      <tr><td>New listing on broker's route</td><td>✓ Feed auto-refresh</td><td>✓</td><td>✓ (template #5)</td></tr>
      <tr><td>Someone unlocked my listing</td><td>✓</td><td>✓</td><td>✓ (template #4)</td></tr>
      <tr><td>Broker application approved</td><td>✓</td><td>✓</td><td>✓ (template #3)</td></tr>
      <tr><td>Deal confirmed by broker</td><td>✓</td><td>✓</td><td>✓</td></tr>
      <tr><td>Wallet topped up</td><td>✓</td><td>—</td><td>—</td></tr>
      <tr><td>Low wallet (below ₹300)</td><td>✓ banner</td><td>✓</td><td>—</td></tr>
      <tr><td>Listing about to expire</td><td>✓</td><td>✓</td><td>✓ (template #6)</td></tr>
      <tr><td>Subscription renewal due</td><td>✓</td><td>✓</td><td>✓</td></tr>
    </table></div>
  </div>
</section>

<!-- ===================== 16 ADMIN ===================== -->
<section class="sec" id="s16">
  <div class="wrap">
    <div class="stag">16 · Admin Panel</div>
    <h2>Web Panel — Not in Android App</h2>
    <p class="lead">Build as a separate web app (Next.js on Vercel, or Retool). Only Aman accesses this. Password-protected. 5 tabs.</p>

    <div class="card"><h4>Tab 1 — Dashboard</h4><p>Live stats: total revenue, paying brokers count, live listings (loads + trucks), total unlocks, pending approvals, hot routes chart.</p></div>
    <div class="card"><h4>Tab 2 — Broker Approvals</h4><p>Queue of pending broker applications. Show: name, firm, city, PAN, Aadhaar, experience, routes. Two buttons: Approve / Reject. On approve → triggers WhatsApp template #3.</p></div>
    <div class="card"><h4>Tab 3 — All Listings</h4><p>Admin sees everything — NO parda. Full contact details visible. Can force-expire any listing. Shows unlock count per listing.</p></div>
    <div class="card"><h4>Tab 4 — Users</h4><p>All users across all roles. Search by name, phone, city. Suspend / Reactivate. See listing history, deal count, violation count (for brokers who shared numbers).</p></div>
    <div class="card"><h4>Tab 5 — Revenue</h4><p>Subscription revenue + unlock revenue + combined. Daily/weekly/monthly charts. Unlock log: which broker unlocked which listing when. Pricing config display.</p></div>
  </div>
</section>

<!-- ===================== 17 DATABASE ===================== -->
<section class="sec" id="s17">
  <div class="wrap">
    <div class="stag">17 · Database Schema</div>
    <h2>Core Tables — PostgreSQL</h2>

    <h3>users</h3>
    <div class="tbl-wrap"><table>
      <tr><th>Column</th><th>Type</th><th>Notes</th></tr>
      <tr><td>id</td><td>uuid PK</td><td>Auto-generated</td></tr>
      <tr><td>role</td><td>enum</td><td>'shipper' | 'truck_owner' | 'broker'</td></tr>
      <tr><td>name</td><td>text</td><td>Full name</td></tr>
      <tr><td>phone</td><td>text UNIQUE</td><td>10-digit Indian mobile</td></tr>
      <tr><td>company</td><td>text nullable</td><td>Firm/fleet/company name</td></tr>
      <tr><td>city</td><td>text</td><td>Base city</td></tr>
      <tr><td>pan</td><td>text</td><td>Indexed. Used for role-lock check.</td></tr>
      <tr><td>aadhaar</td><td>text nullable</td><td>Only for brokers</td></tr>
      <tr><td>status</td><td>enum</td><td>'active' | 'pending' | 'suspended' | 'rejected'</td></tr>
      <tr><td>language</td><td>enum</td><td>'en' | 'hi' | 'gu'</td></tr>
      <tr><td>wallet_balance</td><td>int default 0</td><td>In rupees. Only used by brokers.</td></tr>
      <tr><td>broker_tier</td><td>enum nullable</td><td>'free_preview' | 'standard' | 'premium'</td></tr>
      <tr><td>broker_approved</td><td>boolean</td><td>Requires admin action</td></tr>
      <tr><td>sub_end_date</td><td>date nullable</td><td>Subscription expiry</td></tr>
      <tr><td>deal_count</td><td>int default 0</td><td>Total deals closed</td></tr>
      <tr><td>alert_routes</td><td>text[] array</td><td>Routes for WhatsApp alerts</td></tr>
      <tr><td>created_at</td><td>timestamptz</td><td>Registration date</td></tr>
    </table></div>

    <h3>listings (loads + trucks in one table)</h3>
    <div class="tbl-wrap"><table>
      <tr><th>Column</th><th>Type</th><th>Notes</th></tr>
      <tr><td>id</td><td>uuid PK</td><td></td></tr>
      <tr><td>kind</td><td>enum</td><td>'load' | 'truck'</td></tr>
      <tr><td>posted_by</td><td>uuid FK → users</td><td></td></tr>
      <tr><td>category</td><td>text</td><td>Goods type or truck type</td></tr>
      <tr><td>weight_tonnes</td><td>decimal</td><td></td></tr>
      <tr><td>from_city</td><td>text</td><td></td></tr>
      <tr><td>to_city</td><td>text</td><td></td></tr>
      <tr><td>loading_date</td><td>date</td><td></td></tr>
      <tr><td>contact_name</td><td>text</td><td>HIDDEN — only visible after unlock</td></tr>
      <tr><td>contact_phone</td><td>text</td><td>HIDDEN</td></tr>
      <tr><td>address</td><td>text nullable</td><td>HIDDEN</td></tr>
      <tr><td>expected_rate</td><td>text nullable</td><td>HIDDEN</td></tr>
      <tr><td>truck_number</td><td>text nullable</td><td>HIDDEN (trucks only)</td></tr>
      <tr><td>driver_name</td><td>text nullable</td><td>HIDDEN</td></tr>
      <tr><td>driver_phone</td><td>text nullable</td><td>HIDDEN</td></tr>
      <tr><td>notes</td><td>text nullable</td><td>Public</td></tr>
      <tr><td>status</td><td>enum</td><td>'live' | 'booked' | 'expired' | 'removed'</td></tr>
      <tr><td>unlock_count</td><td>int default 0</td><td>Max 5</td></tr>
      <tr><td>freshness_checked</td><td>boolean default false</td><td>Set true when 24h WA sent</td></tr>
      <tr><td>freshness_reply</td><td>enum nullable</td><td>'yes' | 'no' | null</td></tr>
      <tr><td>posted_by_broker</td><td>uuid nullable FK</td><td>If posted on behalf by a broker</td></tr>
      <tr><td>created_at</td><td>timestamptz</td><td></td></tr>
      <tr><td>expires_at</td><td>timestamptz</td><td>created_at + 48h, or extended</td></tr>
    </table></div>

    <h3>unlocks</h3>
    <div class="tbl-wrap"><table>
      <tr><th>Column</th><th>Type</th><th>Notes</th></tr>
      <tr><td>id</td><td>uuid PK</td><td></td></tr>
      <tr><td>broker_id</td><td>uuid FK → users</td><td></td></tr>
      <tr><td>listing_id</td><td>uuid FK → listings</td><td></td></tr>
      <tr><td>amount</td><td>int</td><td>150 (or 100 for premium)</td></tr>
      <tr><td>deal_status</td><td>enum</td><td>'pending' | 'confirmed' | 'failed'</td></tr>
      <tr><td>refund_requested</td><td>boolean default false</td><td></td></tr>
      <tr><td>refund_granted</td><td>boolean default false</td><td></td></tr>
      <tr><td>created_at</td><td>timestamptz</td><td></td></tr>
    </table></div>

    <h3>transactions</h3>
    <p>Same schema as Section 12 (Wallet). Links to Razorpay order IDs.</p>

    <div class="rule r">
      <b>Row-Level Security (Supabase):</b> The listings table MUST have RLS rules that HIDE contact_name, contact_phone, address, expected_rate, truck_number, driver_name, driver_phone from any query unless the requesting user has a matching record in the unlocks table for that listing. This is the parda enforced at database level — not just UI level. A broker should NEVER be able to see hidden fields via API, even with dev tools.
    </div>
  </div>
</section>

<!-- ===================== 18 SECURITY ===================== -->
<section class="sec" id="s18">
  <div class="wrap">
    <div class="stag">18 · Security Rules</div>
    <h2>Non-Negotiable Security</h2>
    <ul>
      <li><strong>PAN role-lock:</strong> Backend-enforced. Never trust frontend validation alone.</li>
      <li><strong>Parda enforcement:</strong> Database-level RLS. Hidden fields never leave the server unless unlock record exists.</li>
      <li><strong>Wallet deduction:</strong> Server-side only. Client sends "unlock listing X" request; server checks balance, deducts, creates unlock record, returns revealed data — all in one atomic transaction.</li>
      <li><strong>Phone number blocking in chat (if chat is built):</strong> Regex <code>/(+?91)?[\s-]?[6-9]\d{9}/</code> and <code>/\d{10}/</code> — block messages containing phone numbers. Increment violation counter. At 3 violations → flag broker to admin.</li>
      <li><strong>Rate limiting:</strong> Max 20 unlocks per broker per day. Max 10 listings per user per day. Max 3 OTP requests per phone per hour.</li>
      <li><strong>Self-unlock prevention:</strong> Backend rejects unlock if <code>listing.posted_by == broker_id</code> or <code>listing.posted_by_broker == broker_id</code>.</li>
      <li><strong>Subscription verification:</strong> On every feed load, check <code>sub_end_date >= today()</code>. If expired, silently revert tier to free_preview and apply 2-hour delay filter.</li>
    </ul>
  </div>
</section>

<!-- ===================== 19 PLAY STORE ===================== -->
<section class="sec" id="s19">
  <div class="wrap">
    <div class="stag">19 · Play Store Checklist</div>
    <h2>What's Needed for Play Store Launch</h2>

    <div class="tbl-wrap"><table>
      <tr><th>Item</th><th>Status</th><th>Notes</th></tr>
      <tr><td>Google Play Developer Account</td><td>Need to create</td><td>One-time $25 fee. Use Aman's Google account.</td></tr>
      <tr><td>App icon</td><td>Use MAPS FREIGHT logo</td><td>512×512 PNG, no transparency. Crop the compass-truck crest.</td></tr>
      <tr><td>Feature graphic</td><td>Need to create</td><td>1024×500 PNG. Navy background + gold text + truck illustration from website.</td></tr>
      <tr><td>Screenshots (min 2)</td><td>Need to capture</td><td>Phone frames showing: Feed, Parda unlock moment, Post Load form. Min 320px, max 3840px.</td></tr>
      <tr><td>Privacy Policy URL</td><td>Add to mapsfreight.com</td><td>Required. Cover: data collected, how stored, sharing policy, deletion rights.</td></tr>
      <tr><td>Terms of Service URL</td><td>Add to mapsfreight.com</td><td>Include broker-specific clauses.</td></tr>
      <tr><td>App category</td><td>Business</td><td></td></tr>
      <tr><td>Content rating</td><td>Everyone</td><td>No objectionable content.</td></tr>
      <tr><td>Target API level</td><td>API 34+ (Android 14)</td><td>Play Store requirement as of 2025.</td></tr>
      <tr><td>App signing</td><td>Google Play App Signing</td><td>Use Play Signing. Keep upload key safe.</td></tr>
      <tr><td>Payments declaration</td><td>Uses Razorpay</td><td>Declare in-app purchases in Play Console. Razorpay is Play-compliant.</td></tr>
      <tr><td>Data safety form</td><td>Must fill</td><td>Declare: phone, name, PAN, Aadhaar collected. Encrypted in transit. Not shared with third parties except payment processor.</td></tr>
    </table></div>
  </div>
</section>

<!-- ===================== 20 PHASES ===================== -->
<section class="sec" id="s20">
  <div class="wrap">
    <div class="stag">20 · Build Priority</div>
    <h2>Phased Build — What Ships When</h2>

    <h3>Phase 1 — MVP (Weeks 1–3) · Ship this first</h3>
    <div class="card">
      <p>✓ Language selection + persistence</p>
      <p>✓ Role select + all 3 registration forms + PAN role-lock</p>
      <p>✓ OTP verification (Supabase/Firebase Auth)</p>
      <p>✓ Shipper: Post Load + My Listings + Profile</p>
      <p>✓ Truck Owner: Post Trip + My Trips + Profile</p>
      <p>✓ Broker: Feed (loads + trucks tabs) + Parda + Unlock flow + My Unlocks</p>
      <p>✓ Wallet: balance display + Razorpay top-up</p>
      <p>✓ Subscription: ₹2,000/month via Razorpay</p>
      <p>✓ 2-hour delay for free preview brokers</p>
      <p>✓ 5-unlock cap per listing</p>
      <p>✓ Basic admin panel (web): approvals + all listings + users</p>
      <p>✓ Push notifications (FCM)</p>
    </div>

    <h3>Phase 2 — WhatsApp + Freshness (Week 4)</h3>
    <div class="card">
      <p>✓ WhatsApp Business API integration (AiSensy/Interakt)</p>
      <p>✓ All 6 WhatsApp templates live</p>
      <p>✓ Route alerts for subscribed brokers</p>
      <p>✓ 24-hour freshness check cron + reply webhook</p>
      <p>✓ 48-hour hard auto-expiry cron</p>
      <p>✓ Dead-lead refund mechanism</p>
    </div>

    <h3>Phase 3 — Polish (Week 5)</h3>
    <div class="card">
      <p>✓ Post on Behalf (broker posts for their clients)</p>
      <p>✓ Deal Done / No Deal buttons with deal counter</p>
      <p>✓ Admin revenue dashboard with charts</p>
      <p>✓ Filters on broker feed (route, type, date)</p>
      <p>✓ Hindi + Gujarati string translations complete</p>
      <p>✓ Play Store submission</p>
    </div>

    <h3>Phase 4 — Growth (Month 2+)</h3>
    <div class="card">
      <p>○ Premium Broker tier (₹5,000/mo, 30-min head start, ₹100 unlocks)</p>
      <p>○ Broker referral program (bring a shipper → 2 free unlocks)</p>
      <p>○ Daily 8 AM corridor digest via WhatsApp</p>
      <p>○ Verified Broker physical sticker / badge</p>
      <p>○ Corridor #2 expansion</p>
    </div>

    <div class="rule g">
      <b>Week 1 deliverable for review:</b> Language → Role → Register → OTP → Shipper posting a load → it appearing in broker feed with parda → broker unlocking it. This single flow end-to-end, working on a real Android phone, is the checkpoint. If this works, everything else is additions to a working product.
    </div>
  </div>
</section>

<!-- FOOTER -->
<div style="border-top:1px solid var(--line);padding:36px 0;text-align:center">
  <div class="wrap">
    <div style="font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:6px">MAPS FREIGHT SOLUTIONS</div>
    <div style="color:var(--slate);font-size:12px">Android App Development Specification · Version Broker · July 2026</div>
    <div style="color:var(--slate);font-size:12px;margin-top:4px">For: Shashank Maurya · From: Aman Dana · Contact: +91 81600 24858</div>
  </div>
</div>

</body>
</html>
