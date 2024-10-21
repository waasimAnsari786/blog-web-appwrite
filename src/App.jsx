import "./index.css";
import MyWeb from "./components/MyWeb";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <MyWeb />
      </Provider>
    </>
  );
}

export default App;
