import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import AdminActionHandler from "./components/AdminActionHandler";

const Home = lazy(() => import("./pages/Home"));
const Books = lazy(() => import("./pages/Books"));
const Author = lazy(() => import("./pages/Author"));
const Category = lazy(() => import("./pages/Category"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const SignUp = lazy(() => import("./pages/SignUp"));
const LogIn = lazy(() => import("./pages/Login"));
const AdminSubPage = lazy(() => import("./components/AdminSubPage"));
const AdminActionPage = lazy(() => import("./components/AdminActionPage"));
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense
        fallback={<h3 className="text-2xl font-semibold">Loading...</h3>}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/author/:author" element={<Author />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/:subpage" element={<AdminSubPage />} />
            <Route
              path="/admin/:subpage/:action"
              element={<AdminActionPage />}
            />
            <Route
              path="/admin/:subpage/:action/:id"
              element={<AdminActionHandler />}
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
