/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Html from "./Html";
import Spinner from "./Spinner";
import Layout from "./Layout";
import NavBar from "./NavBar";

const Sidebar = lazy(() => import("./Sidebar" /* webpackPrefetch: true */));
const Post = lazy(() => import("./Post" /* webpackPrefetch: true */));
const Comments = lazy(() => import("./Comments" /* webpackPrefetch: true */));

export default function App({ assets }) {
  return (
    <Html assets={assets} title="Hello">
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary FallbackComponent={Error}>
          <Content />
        </ErrorBoundary>
      </Suspense>
    </Html>
  );
}

function Content() {
  return (
    <Layout>
      <NavBar />
      <aside className="sidebar">
        <Suspense fallback={<Spinner />}>
          <Sidebar />
        </Suspense>
      </aside>
      <article className="post">
        <section className="comments">
          <Suspense fallback={<Spinner />}>
            <Post />
          </Suspense>
          <h2>Comments</h2>
          <Suspense fallback={<Spinner />}>
            <Comments />
          </Suspense>
        </section>
      </article>
      <footer
        style={{
          display: "flex",
          width: "100vw",
          alignItems: "center",
          marginLeft: "calc(30% + 20px)",
        }}
      >
        <h2>Footer</h2>
      </footer>
    </Layout>
  );
}

function Error({ error }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error.stack}</pre>
    </div>
  );
}
