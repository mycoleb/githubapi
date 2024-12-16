import React, { useState, useEffect } from 'react';
import { githubService } from '../services/github-service';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await githubService.getUserProfile('octocat'); // Replace with dynamic username
        const userRepos = await githubService.getUserRepos('octocat');
        setUser(userData);
        setRepos(userRepos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">@{user.login}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Repositories</h2>
          <div className="space-y-4">
            {repos.map(repo => (
              <div key={repo.id} className="border p-4 rounded-lg">
                <h3 className="font-semibold">{repo.name}</h3>
                <p className="text-gray-600">{repo.description}</p>
                <div className="mt-2 flex space-x-4">
                  <span className="text-sm">⭐ {repo.stargazers_count}</span>
                  <span className="text-sm">🍴 {repo.forks_count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;