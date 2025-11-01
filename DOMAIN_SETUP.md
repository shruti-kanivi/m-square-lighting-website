# Domain Setup Guide: msquarelighting.com

## 🌐 Domain Configuration for M Square Lighting

### 📋 **Domain Details**
- **Primary Domain**: msquarelighting.com
- **WWW Redirect**: www.msquarelighting.com → msquarelighting.com
- **SSL Certificate**: Free Let's Encrypt (automatic)
- **CDN**: Global Vercel Edge Network

---

## 🛒 **Step 1: Purchase Domain**

### **Recommended Registrars:**
1. **Namecheap** (~$10/year) - Best value
2. **GoDaddy** (~$15/year) - Popular choice
3. **Google Domains** (~$12/year) - Easy management

### **Purchase Process:**
1. Search for "msquarelighting.com"
2. Add to cart and checkout
3. **Important**: Disable auto-renewal of extras (privacy protection is optional)

---

## ⚙️ **Step 2: Vercel Domain Setup**

### **In Vercel Dashboard:**
1. Go to your project dashboard
2. Click **Settings** → **Domains**
3. Add domains:
   - `msquarelighting.com` (primary)
   - `www.msquarelighting.com` (redirect to primary)

### **Vercel Will Provide:**
- A Record: `76.76.19.61`
- CNAME Record: `cname.vercel-dns.com`

---

## 🔧 **Step 3: DNS Configuration**

### **In Your Domain Registrar's DNS Panel:**

#### **Required DNS Records:**
```
Type    Name    Value                    TTL
A       @       76.76.19.61             3600
CNAME   www     cname.vercel-dns.com    3600
```

#### **Optional Email Records (for professional email):**
```
Type    Name    Value                           TTL
MX      @       1 aspmx.l.google.com           3600
MX      @       5 alt1.aspmx.l.google.com     3600
MX      @       5 alt2.aspmx.l.google.com     3600
MX      @       10 alt3.aspmx.l.google.com    3600
MX      @       10 alt4.aspmx.l.google.com    3600
```

---

## 📧 **Step 4: Professional Email Setup**

### **Option 1: Google Workspace ($6/month)**
1. Sign up at [workspace.google.com](https://workspace.google.com)
2. Verify domain ownership
3. Set up email accounts:
   - `info@msquarelighting.com`
   - `contact@msquarelighting.com`
   - `sales@msquarelighting.com`

### **Option 2: Gmail Forwarding (Free)**
1. Use Gmail with custom "From" address
2. Set up forwarding in Gmail settings
3. Configure SMTP for contact form

---

## 🔒 **Step 5: SSL & Security**

### **Automatic SSL (Vercel handles this):**
- ✅ Free Let's Encrypt certificate
- ✅ Auto-renewal every 90 days
- ✅ HTTP to HTTPS redirect
- ✅ HSTS headers enabled

### **Additional Security:**
- ✅ Vercel DDoS protection
- ✅ Rate limiting on API endpoints
- ✅ CORS configuration
- ✅ Security headers (Helmet.js)

---

## 📊 **Step 6: Analytics & Monitoring**

### **Google Analytics Setup:**
1. Create Google Analytics account
2. Add tracking code to your site
3. Set up goals for contact form submissions

### **Google Search Console:**
1. Add and verify msquarelighting.com
2. Submit sitemap: `https://msquarelighting.com/sitemap.xml`
3. Monitor search performance

### **Vercel Analytics:**
- Built-in performance monitoring
- Core Web Vitals tracking
- Function execution logs

---

## 🎯 **Step 7: Local SEO & Marketing**

### **Google My Business:**
1. Create business profile
2. Add address: Bengaluru, Karnataka, India
3. Add photos from your portfolio
4. Collect customer reviews

### **Local Directories:**
- JustDial
- Sulekha
- IndiaMART
- Yellow Pages India

---

## ⏱️ **Timeline & Propagation**

### **DNS Propagation Time:**
- **Local**: 5-15 minutes
- **Global**: 24-48 hours
- **Check**: Use [whatsmydns.net](https://whatsmydns.net)

### **SSL Certificate:**
- **Issuance**: 5-10 minutes after DNS propagation
- **Activation**: Automatic

---

## ✅ **Verification Checklist**

### **Domain Working:**
- [ ] msquarelighting.com loads your website
- [ ] www.msquarelighting.com redirects to main domain
- [ ] HTTPS is working (green lock icon)
- [ ] All pages load correctly

### **API Endpoints:**
- [ ] https://msquarelighting.com/api/health returns success
- [ ] Contact form submission works
- [ ] Email notifications are received

### **SEO & Analytics:**
- [ ] Google Analytics tracking
- [ ] Google Search Console verified
- [ ] Meta tags showing correct domain
- [ ] Social media previews working

---

## 🚨 **Troubleshooting**

### **Domain Not Loading:**
1. Check DNS propagation
2. Verify DNS records are correct
3. Clear browser cache
4. Try incognito/private mode

### **SSL Certificate Issues:**
1. Wait for DNS propagation (24-48 hours)
2. Check Vercel domain settings
3. Force SSL renewal in Vercel dashboard

### **Email Not Working:**
1. Verify MX records
2. Check SMTP credentials in Vercel environment variables
3. Test with Gmail App Password

---

## 💰 **Cost Summary**

| Service | Provider | Annual Cost | Purpose |
|---------|----------|-------------|---------|
| **Domain** | Namecheap | $10 | msquarelighting.com |
| **Hosting** | Vercel | Free | Website + API |
| **SSL** | Let's Encrypt | Free | HTTPS security |
| **Email** | Google Workspace | $72 | Professional email |
| **Analytics** | Google | Free | Traffic monitoring |

**Total Annual Cost**: ~$82 ($7/month)

---

## 🎉 **Go Live Checklist**

1. ✅ Domain purchased and configured
2. ✅ DNS records added
3. ✅ SSL certificate active
4. ✅ Email accounts set up
5. ✅ Analytics tracking enabled
6. ✅ Contact form tested
7. ✅ All pages loading correctly
8. ✅ Google My Business created
9. ✅ Social media accounts linked
10. ✅ Marketing campaigns ready

**Your M Square Lighting website will be live at https://msquarelighting.com! 🚀**
