import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./router/Home.tsx";
import Login from "./router/Login.tsx";
import Register from "./router/Register.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { PersistGate } from "redux-persist/integration/react";
import Dashboard from "./router/Dashboard.tsx";
import Books from "./router/Books.tsx";
import BookDetails from "./router/BookDetails.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route index path="/Dashboard" element={<Dashboard />}></Route>
      </Route>
      <Route path="/Books" >
        <Route index  element={<Books />} />
        <Route path=":BookId" element={<BookDetails />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {" "}
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
