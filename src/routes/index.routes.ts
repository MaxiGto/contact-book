import express, { Router, Request, Response } from 'express';
import contactRoute from './contact.routes';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
  security?: boolean;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/contacts',
    route: contactRoute,
  },
];

defaultIRoute.forEach((route) => {
  if (route.security) router.use(route.path, route.route);
  else if (!route.security) router.use(route.path, route.route);
});

router.get('/health', (_req: Request, res: Response) => res.send('Hello World!'));
export default router;
