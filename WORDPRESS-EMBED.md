# WordPress Dashboard Embedding Guide

This guide explains how to embed the Ameritech Payments dashboard into your WordPress website.

## Dashboard URL

The standalone dashboard is available at:
```
https://your-domain.com/dashboard
```

## Embedding Methods

### Method 1: WordPress iFrame Block (Recommended)

1. In your WordPress editor, add a new block
2. Search for "Custom HTML" block
3. Paste the following code:

```html
<iframe
  src="https://your-domain.com/dashboard"
  width="100%"
  height="900"
  frameborder="0"
  style="border: none; border-radius: 24px; max-width: 650px; margin: 0 auto; display: block;"
  title="Ameritech Payments Dashboard"
></iframe>
```

### Method 2: Shortcode (with plugin)

If you have a shortcode plugin installed:

```
[iframe src="https://your-domain.com/dashboard" width="100%" height="900"]
```

### Method 3: Direct Embed Plugin

Install a plugin like "iframe" or "Advanced iFrames" and use:
- **URL**: `https://your-domain.com/dashboard`
- **Width**: 100% or 650px
- **Height**: 900px
- **Scrolling**: No

## Recommended Settings

- **Width**: 100% (max-width: 450px for best appearance)
- **Height**: 500px (compact design, adjust if needed)
- **Border**: None
- **Border Radius**: 16px for modern look
- **Background**: Black or dark theme

## Responsive Sizing

The dashboard automatically adjusts for:
- Mobile: Full width, compact spacing
- Tablet: Optimized medium layout
- Desktop: Full features, max 600px width

## Custom CSS (Optional)

Add to your WordPress theme's custom CSS:

```css
.dashboard-container {
  max-width: 650px;
  margin: 40px auto;
  padding: 20px;
}

.dashboard-container iframe {
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
```

## Security Notes

- Dashboard is served over HTTPS
- No sensitive data is exposed
- All metrics are display-only
- Safe for public embedding

## Need Help?

Contact support@evolvemerchants.com or call (833) 206-9763
