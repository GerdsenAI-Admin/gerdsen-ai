# 🚀 Quick Reference Guide

## Local Development Server

```bash
./start-server.sh
# Server runs at: http://localhost:8000
```

## 🧪 Testing Tools

| Tool | Purpose | URL |
|------|---------|-----|
| **Main Site** | Production website | http://localhost:8000 |
| **Site with Gradient** | Version with gradient animation | http://localhost:8000/index-with-gradient.html |
| **Gradient Responsive Tester** | Test gradient across viewports | http://localhost:8000/gradient-responsive-tester.html |
| **General Responsive Tester** | Test overall responsiveness | http://localhost:8000/responsive-tester.html |
| **Test Results** | Automated test report | http://localhost:8000/gradient-test-results.html |
| **Comparison Tool** | Old vs new approach | http://localhost:8000/gradient-comparison.html |
| **Visual Demo** | Gradient fix overview | http://localhost:8000/gradient-fix-demo.html |
| **UI States** | Test interactions | http://localhost:8000/test-states.html |

## 📁 Key Files

| File | Description | Path |
|------|-------------|------|
| **Main HTML** | Primary website | `index.html` |
| **Main CSS** | Core styles | `assets/css/main.css` |
| **Gradient CSS** | Animation styles | `assets/css/gradient-animation-fix.css` |
| **JavaScript** | Site functionality | `assets/js/main.js` |
| **Background Video** | Neural network animation | `assets/images/Neural_G_5.mp4` |

## 🎯 Quick Commands

### Start Server
```bash
./start-server.sh
```

### Test Gradient Animation
1. Open: http://localhost:8000/gradient-responsive-tester.html
2. Select page from dropdown
3. Click viewport buttons
4. Check all metrics show ✅

### Check Performance
```javascript
// In browser console
console.log(document.querySelector('.animation-container').getBoundingClientRect());
```

### Git Commands
```bash
git add .
git commit -m "Your message"
git push origin main
```

## 📊 Success Criteria

- ✅ All viewport tests pass
- ✅ 60fps animations
- ✅ No overflow issues
- ✅ Lighthouse scores > 90
- ✅ Works in all browsers

## 📚 Documentation

- **[README.md](README.md)** - Project overview
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Comprehensive testing
- **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - Development workflow
- **[GRADIENT_FIX_IMPLEMENTATION.md](GRADIENT_FIX_IMPLEMENTATION.md)** - Gradient details
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - GitHub Pages setup

---

For detailed information, see the full documentation files above.