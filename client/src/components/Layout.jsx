import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 p-8 overflow-auto">
      <Outlet />
    </main>
  </div>
);

export default Layout;
