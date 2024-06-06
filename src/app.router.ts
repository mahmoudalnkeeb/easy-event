import { Request, Response, Router } from 'express';
import appModule from './app.module';
const router: Router = Router();

router.get('/health', (req: Request, res: Response) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  };
  res.status(200).send(data);
});

// define modules routers
export function defineModulesRouter() {
  const { modules } = appModule;

  for (const module of modules) {
    router.use(`/${module.name}`, module.router);
    console.log(`${module.name} definded on path /${module.name}`);
  }
}

export default router;
