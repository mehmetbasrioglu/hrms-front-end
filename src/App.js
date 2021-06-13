import logo from './logo.svg';
import './App.css';
import NavigationBar from './layouts/NavigationBar';
import JobAdvertisementPage from './pages/JobAdvertisementPage';
import { Route } from 'react-router-dom';
import CreateJobAdvertisementPage from './pages/CreateJobAdvertisementPage';
import JobAdsWaitingPage from './pages/JobAdsWaitingPage';
import JobAdsWaitingDetailPage from './pages/JobAdsWaitingDetailPage';

function App() {
  return (
    <div className="App">
         <NavigationBar/>
        
      <Route path="/is-ilanlari">
      <div className="Appbg-gri min-vh-100">
         {/* SAĞ ŞEHİRLER VS */}
         <div className="container">
        <JobAdvertisementPage/>
        </div>
      </div>
      </Route>

      <Route path="/is-ilani-olustur">
      <div className="Appbg-gri min-vh-100">
         {/* SAĞ ŞEHİRLER VS */}
         <div className="container" style={{paddingLeft:250,paddingRight:250}}>
         <CreateJobAdvertisementPage/>
        </div>
      </div>
      </Route>

      <Route path="/admin/is-ilanlari" exact>
      <div className="Appbg-gri min-vh-100">
         {/* SAĞ ŞEHİRLER VS */}
         <div className="container" >
         <JobAdsWaitingPage/>
        </div>
      </div>
      </Route>
      <Route path="/admin/is-ilanlari/detail/:id" exact>
      <div className="Appbg-gri min-vh-100">
         {/* SAĞ ŞEHİRLER VS */}
         <div className="container" >
         <JobAdsWaitingDetailPage/>
        </div>
      </div>
      </Route>
   
    </div>
  );
}

export default App;
