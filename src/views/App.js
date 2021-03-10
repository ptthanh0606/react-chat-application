import React, { Suspense } from "react";
import Loading from "./Loading";
import Auth from "../_auth/Auth";

function App() {
  return (
    <Suspense fallback={<Loading text="Thinking..."></Loading>}>
      <Auth />
    </Suspense>
  );
}

export default React.memo(App);
