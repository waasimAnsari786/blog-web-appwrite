import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { MyWeb } from "./components/index";

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
