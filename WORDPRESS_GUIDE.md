# 🎨 Animated Orb Background for WordPress

This is the same animated blue orb background from your Ameritech Payments website.

---

## 📋 **OPTION 1: Add to Entire Site (Recommended)**

### Step 1: Add the Canvas HTML

Go to **Appearance → Theme Editor → header.php**

Add this RIGHT AFTER the opening `<body>` tag:

```html
<canvas class="animated-orb-background" id="orbBackground"></canvas>
```

### Step 2: Add the CSS

Go to **Appearance → Customize → Additional CSS**

Add this CSS:

```css
.animated-orb-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
}
```

### Step 3: Add the JavaScript

Go to **Appearance → Theme Editor → footer.php**

Add this code RIGHT BEFORE the closing `</body>` tag:

```html
<script>
(function() {
    const canvas = document.getElementById('orbBackground');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    
    const orbs = [];
    const orbCount = window.innerWidth < 768 ? 4 : 8;
    
    for (let i = 0; i < orbCount; i++) {
        orbs.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 100 + Math.random() * 150,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: 0.2 + Math.random() * 0.15,
            hue: 200 + Math.random() * 40,
        });
    }
    
    function animate() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        orbs.forEach(function(orb) {
            const gradient = ctx.createRadialGradient(
                orb.x, orb.y, 0,
                orb.x, orb.y, orb.radius
            );
            
            gradient.addColorStop(0, 'hsla(' + orb.hue + ', 100%, 60%, ' + orb.opacity + ')');
            gradient.addColorStop(0.4, 'hsla(' + orb.hue + ', 100%, 50%, ' + (orb.opacity * 0.6) + ')');
            gradient.addColorStop(0.7, 'hsla(' + orb.hue + ', 100%, 40%, ' + (orb.opacity * 0.3) + ')');
            gradient.addColorStop(1, 'hsla(' + orb.hue + ', 100%, 30%, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
            ctx.fill();
            
            orb.x += orb.speedX;
            orb.y += orb.speedY;
            
            if (orb.x < -orb.radius) { orb.x = -orb.radius; orb.speedX *= -1; }
            if (orb.x > canvas.width + orb.radius) { orb.x = canvas.width + orb.radius; orb.speedX *= -1; }
            if (orb.y < -orb.radius) { orb.y = -orb.radius; orb.speedY *= -1; }
            if (orb.y > canvas.height + orb.radius) { orb.y = canvas.height + orb.radius; orb.speedY *= -1; }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    window.addEventListener('resize', resizeCanvas);
})();
</script>
```

---

## 📋 **OPTION 2: Add to Specific Page Only**

### Using Elementor/Page Builder:

1. Edit your page
2. Add an **HTML widget** at the TOP of the page
3. Paste this complete code:

```html
<canvas class="page-orb-background" id="pageOrbBg"></canvas>

<style>
.page-orb-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
}
</style>

<script>
(function() {
    const canvas = document.getElementById('pageOrbBg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    
    const orbs = [];
    const orbCount = window.innerWidth < 768 ? 4 : 8;
    
    for (let i = 0; i < orbCount; i++) {
        orbs.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 100 + Math.random() * 150,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: 0.2 + Math.random() * 0.15,
            hue: 200 + Math.random() * 40,
        });
    }
    
    function animate() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        orbs.forEach(function(orb) {
            const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
            gradient.addColorStop(0, 'hsla(' + orb.hue + ', 100%, 60%, ' + orb.opacity + ')');
            gradient.addColorStop(0.4, 'hsla(' + orb.hue + ', 100%, 50%, ' + (orb.opacity * 0.6) + ')');
            gradient.addColorStop(0.7, 'hsla(' + orb.hue + ', 100%, 40%, ' + (orb.opacity * 0.3) + ')');
            gradient.addColorStop(1, 'hsla(' + orb.hue + ', 100%, 30%, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
            ctx.fill();
            
            orb.x += orb.speedX;
            orb.y += orb.speedY;
            
            if (orb.x < -orb.radius) { orb.x = -orb.radius; orb.speedX *= -1; }
            if (orb.x > canvas.width + orb.radius) { orb.x = canvas.width + orb.radius; orb.speedX *= -1; }
            if (orb.y < -orb.radius) { orb.y = -orb.radius; orb.speedY *= -1; }
            if (orb.y > canvas.height + orb.radius) { orb.y = canvas.height + orb.radius; orb.speedY *= -1; }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    window.addEventListener('resize', resizeCanvas);
})();
</script>
```

---

## 🎨 **CUSTOMIZATION:**

### Change Colors:

Find this line in the JavaScript:
```javascript
hue: 200 + Math.random() * 40,  // Blue colors
```

Change to:
- **Red:** `hue: 0 + Math.random() * 20`
- **Green:** `hue: 120 + Math.random() * 40`
- **Purple:** `hue: 270 + Math.random() * 40`
- **Orange:** `hue: 30 + Math.random() * 30`
- **Pink:** `hue: 320 + Math.random() * 40`

### Change Number of Orbs:

Find this line:
```javascript
const orbCount = window.innerWidth < 768 ? 4 : 8;
```

Change the numbers:
- `4` = mobile orbs
- `8` = desktop orbs

### Change Speed:

Find these lines:
```javascript
speedX: (Math.random() - 0.5) * 0.5,
speedY: (Math.random() - 0.5) * 0.5,
```

Change `0.5` to:
- `0.2` = slower
- `1.0` = faster
- `2.0` = much faster

### Change Opacity (Brightness):

Find this line:
```javascript
opacity: 0.2 + Math.random() * 0.15,
```

Change to:
- `opacity: 0.1 + Math.random() * 0.1` = dimmer
- `opacity: 0.3 + Math.random() * 0.2` = brighter

---

## 📁 **FILES:**

Download from Same:
- `WORDPRESS_BACKGROUND.html` - Complete example
- `WORDPRESS_GUIDE.md` - This guide

---

## ✅ **TIPS:**

1. **Background Color:** Make sure your page background is black or dark for best effect
2. **Text Color:** Use white or light text on top of the animated background
3. **Performance:** The animation is optimized for performance - works on mobile too!
4. **Z-Index:** If content disappears, adjust `z-index: -1` to `z-index: 0` in CSS

---

Enjoy your animated background! 🎉
