---
description: Start virtual environment and local development server
---

1. Activate the Python virtual environment:
```bash
source .venv/bin/activate
```

2. (Optional) Install any Python dependencies if a `requirements.txt` exists:
```bash
if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
```

3. (Optional) Install Node.js dependencies for the `http-server` script:
```bash
npm install
```

// turbo
4. Start the local development server using the provided script:
```bash
bash ./serve-local.sh
```
