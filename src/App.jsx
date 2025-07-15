import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserInputForm from './components/UserInputForm.jsx';
import ResultsPage from './components/ResultsPage.jsx';
import careerData from './data/careerData.json'; // Your provided JSON

function App() {
  const [userProfile, setUserProfile] = useState(null);

  const handleSubmit = (profile) => {
    setUserProfile(profile);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Career Advisor SPA</h1>
          <p className="text-gray-600">Personalized career paths based on your profile and goals.</p>
        </header>
        <main className="max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<UserInputForm onSubmit={handleSubmit} initialData={careerData.user_profile} />} />
            <Route path="/results" element={<ResultsPage data={careerData} userProfile={userProfile} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
