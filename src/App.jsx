import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  MyWeb,
  AddPost,
  AllPosts,
  EditPost,
  Home,
  LoginPage,
  Post,
  SignUpPage,
  AuthProtectedLayout,
} from "./components/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MyWeb />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/login",
          element: (
            <AuthProtectedLayout authentication={false}>
              <LoginPage />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/signup",
          element: (
            <AuthProtectedLayout authentication={false}>
              <SignUpPage />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/all-posts",
          element: (
            <AuthProtectedLayout authentication>
              <AllPosts />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/add-post",
          element: (
            <AuthProtectedLayout authentication>
              <AddPost />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/edit-post/:slug",
          element: (
            <AuthProtectedLayout authentication>
              <EditPost />
            </AuthProtectedLayout>
          ),
        },
        {
          path: "/post/:slug",
          element: <Post />,
        },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router}>
          <MyWeb />
        </RouterProvider>
      </Provider>
    </>
  );
}

export default App;
