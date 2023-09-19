import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';

const Calendar = lazy(() => import('./pages/Calendar'));
const Chart = lazy(() => import('./pages/Chart'));
const FormElements = lazy(() => import('./pages/Form/FormElements'));
const FormLayout = lazy(() => import('./pages/Form/FormLayout'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Tables = lazy(() => import('./pages/Tables'));
const Alerts = lazy(() => import('./pages/UiElements/Alerts'));
const Buttons = lazy(() => import('./pages/UiElements/Buttons'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const AddDeviceForm = lazy(() => import('./pages/Form/Device'));
const AddWasteForm = lazy(()=> import('./pages/Form/WasteGeneration'));
const GenerationReport = lazy(() => import('./pages/Reports/Generation_Report'));
const BinsReport = lazy(() => import('./pages/Reports/Bin_Report'));
const FactSheet = lazy(()=> import('./pages/Reports/FactSheetDate'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/auth/signup" element={<SignUp />} />
        <Route index element={<SignIn />} />
        <Route element={<DefaultLayout />}>
          <Route 
            path="/Hospital/Dashboard"
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard/>
              </Suspense>
            }
          />
          <Route
            path="/calendar"
            element={
              <Suspense fallback={<Loader />}>
                <Calendar />
              </Suspense>
            }
          />
          <Route
            path="/Add_Device"
            element={
              <Suspense fallback={<Loader />}>
                <AddDeviceForm />
              </Suspense>
            }
          />
          <Route
            path="/Add_Waste"
            element={
              <Suspense fallback={<Loader />}>
                <AddWasteForm />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <Suspense fallback={<Loader />}>
                <FormElements />
              </Suspense>
            }
          />

          <Route
            path="/reports/generation-report"
            element={
              <Suspense fallback={<Loader />}>
                <GenerationReport />
              </Suspense>
            }
          />
          <Route
            path="/Generation_Report/:Date"
            element={
              <Suspense fallback={<Loader />}>
                <FactSheet />
              </Suspense>
            }
          />

          <Route
            path="/reports/Bin-Report"
            element={
              <Suspense fallback={<Loader />}>
                <BinsReport />
              </Suspense>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <Suspense fallback={<Loader />}>
                <FormLayout />
              </Suspense>
            }
          />
          <Route
            path="/tables"
            element={
              <Suspense fallback={<Loader />}>
                <Tables />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="/chart"
            element={
              <Suspense fallback={<Loader />}>
                <Chart />
              </Suspense>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <Suspense fallback={<Loader />}>
                <Alerts />
              </Suspense>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <Suspense fallback={<Loader />}>
                <Buttons />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
