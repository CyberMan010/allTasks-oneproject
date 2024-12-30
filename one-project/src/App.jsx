import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import ChatWindow from './component/chat/ChatWindow';
import CustomForm from './component/Form/CustomForm';
import TaskManagement from './component/Tasks/TaskManagement';
import { TasksProvider } from './component/Tasks/myContext';

const App = () => {
  return (
    <Provider store={store}>
      <TasksProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
            <Navbar />
            <div className="max-w-7xl mx-auto p-4 pt-8">
              <Routes>
                <Route path="/" element={<ChatWindow />} />
                <Route path="/form" element={<CustomForm />} />
                <Route path="/tasks" element={<TaskManagement />} />
              </Routes>
            </div>
          </div>
        </Router>
      </TasksProvider>
    </Provider>
  );
};

export default App;