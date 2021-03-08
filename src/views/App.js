import React, { Suspense } from "react";

const Auth = React.lazy(() => import("../_auth/Auth"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<></>}>
        <Auth />
      </Suspense>
    </div>
  );
}

export default React.memo(App);
