import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/main.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
