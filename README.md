# Event Management System.

system to manage events built with nodejs , express and mongodb

## project structure

```bash
.
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.module.ts
│   ├── app.router.ts
│   ├── app.ts
│   ├── config
│   │   ├── api.config.ts
│   │   ├── db.config.ts
│   │   └── env.config.ts
│   ├── interfaces
│   │   ├── admin.interface.ts
│   │   ├── enrollment.interface.ts
│   │   ├── event.interface.ts
│   │   ├── invitation.interface.ts
│   │   ├── notification.interface.ts
│   │   └── user.interface.ts
│   ├── middlewares
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── models
│   │   ├── admin.model.ts
│   │   ├── enrollment.model.ts
│   │   ├── event.model.ts
│   │   ├── invitation.model.ts
│   │   ├── notification.model.ts
│   │   └── user.model.ts
│   ├── modules
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── auth.router.ts
│   │   └── users
│   │       ├── users.controller.ts
│   │       ├── users.module.ts
│   │       └── users.router.ts
│   ├── server.ts
│   └── services
└── tsconfig.json
  
```
