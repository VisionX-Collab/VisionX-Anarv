import React, { useEffect, useState } from 'react';
import { loginWithGitHub, getUserRepos } from '../services/api';

const Profile = () => {
    const [repos, setRepos] = useState([]);
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('github_token');
        if (storedToken) {
            setAccessToken(storedToken);
            getUserRepos(storedToken).then(setRepos);
        }
    }, []);

    return (
        <div>
            <h1>GitHub Integration</h1>
            {!accessToken ? (
                <button onClick={loginWithGitHub}>Login with GitHub</button>
            ) : (
                <>
                    <h2>Your Repositories:</h2>
                    <ul>
                        {repos.map((repo) => (
                            <li key={repo.id}>{repo.name}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Profile;