import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import { createBrowserRouter,
        createRoutesFromElements,
        RouterProvider,
        Route
} from "react-router-dom";
import ProductScreen from './screens/ProductScreen';
import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' index={true} element={<HomeScreen/>} />
      <Route path='/product/:id' element={<ProductScreen/>}/>
      
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);