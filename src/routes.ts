import { requestHealthCheck } from "./controllers/health-check";

export const AppRoutes: Route[] = [
  {
    path: "/health",
    method: "get",
    action: requestHealthCheck,
  },
];

interface Route {
  path: string;
  method: string;
  action: any;
}
