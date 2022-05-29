import Header from "@components/shared/Header";
import { ToastContainer } from "react-toastify";

const BaseLayout = ({
  className,
  navClass = "with-bg",
  navBorder = "nav-border",
  user,
  loading,
  children,
}) => {
  return (
    <div className="layout-container">
      <Header
        className={`${navClass} ${navBorder}`}
        user={user}
        loading={loading}
      />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default BaseLayout;
