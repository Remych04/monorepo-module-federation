import { App } from "@/components/App";
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { LazyShop } from "@/pages/shop/Shop.lazy";
import { shopRoutes } from "@packages/shared/src/routes/shop";

const routes = [
  {
    path: "/shop",
    element: <App />,
    children: [
      {
        path: shopRoutes.main,
        element: (
          <Suspense fallback={"Loading..."}>
            <LazyShop />
          </Suspense>
        ),
      },
      {
        path: shopRoutes.second,
        element: (
          <Suspense fallback={"Loading..."}>
            <div>Second Shop Page</div>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
