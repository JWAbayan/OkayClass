import './App.css';
import styled from 'styled-components';

import { BoxAccount } from "./components/boxAccount";
import { Route, Routes } from 'react-router-dom';
import ChangePassPage from './components/boxAccount/changePass';
import { PageDashboard } from './components/home/pageDashboard';
import { PageRecords } from './components/home/pageRecords';
import { PageAccount } from './components/home/pageAccount';
import { PageStudents } from './components/home/pageRecords/pageStudents';
import { useRef } from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';

const ContainerApp = styled.div`
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {

  const reRef = useRef();

  return (
    <Routes>
      <Route path='/' element={<BoxAccount />} />
      <Route path='/dashboard' element={<PageDashboard />}>
        <Route path='account' element={<PageAccount />} />
        <Route path='sections' element={<PageRecords />} />
      </Route>
      <Route path='/changepass' element={<ChangePassPage />} />
    </Routes>
  );
}

export default App;
