# portfolio-optimiser

BACKEND

```bash
├── LICENSE
├── README.md
├── backend
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       ├── controllers
│       │   └── portfolio.controller.js
│       ├── db
│       ├── index.js
│       ├── middleware
│       ├── model
│       ├── route
│       │   └── portfolio.route.js
│       ├── server.js
│       ├── services
│       │   └── fastApiService.js
│       └── utils
└── frontend
```

FRONTEND

```bash
frontend/
└── src/
    ├── assets/               # Static assets like images, logos, fonts
    ├── components/
    │   └── ui/               # Dumb, reusable, generic UI components (Button, Input, Card)
    ├── features/             # The heart of our application. Each feature gets a folder.
    │   └── portfolio/
    │       ├── components/   # Components specific to the portfolio feature
    │       ├── hooks/        # Hooks specific to the portfolio feature
    │       └── index.js      # Entry point for the feature (exports components)
    ├── hooks/                # Custom hooks that are shared across MANY features
    ├── lib/                  # External services config (axios instance) & other libraries
    ├── pages/                # The main "pages" of your app. Corresponds to a URL route.
    ├── styles/               # Global styles, theme variables, etc.
    └── utils/                # Small, shared helper functions (e.g., formatting dates)
```

```bash
hostname -I
```

Using this to find the wsl IP

```powershell
netsh interface portproxy add v4tov4 listenport=5173 listenaddress=0.0.0.0 connectport=5173 connectaddress=172.31.41.54
```

Do the port forwarding

Run the frontend
go to `portfolio-optimiser/frontend/src` then run

```bash
npm run dev
```

Run the backend
go to `portfolio-optimiser/backend/src` then run

```bash
node server.js
```
