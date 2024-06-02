import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-semibold">Sidebar</h1>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          <li className="mb-4">
            <Link to="/upload" className="block p-2 hover:bg-gray-700 rounded">Upload</Link>
          </li>
          <li>
            <Link to="/setting" className="block p-2 hover:bg-gray-700 rounded">Setting</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
