import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPath, hash) => {
    const targetPath = nextPath || "/";
    const targetUrl = hash ? `${targetPath}#${hash}` : targetPath;

    if (`${window.location.pathname}${window.location.hash}` !== targetUrl) {
      window.history.pushState({}, "", targetUrl);
      setPath(targetPath);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }

    window.setTimeout(() => {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  };

  const renderPage = () => {
    if (path === "/catalogo") return <Catalogo navigate={navigate} />;
    return <Home navigate={navigate} />;
  };

  return (
    <ThemeProvider defaultTheme="system">
      {renderPage()}
    </ThemeProvider>
  );
}

export default App;
