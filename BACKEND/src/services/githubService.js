const baseUrl = "https://api.github.com";

const makeHeaders = () => {
    const headers = {
        Accept: "application/vnd.github+json",
        "User-Agent": "HackTrack"
    };

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = "Bearer " + process.env.GITHUB_TOKEN;
    }

    return headers;
};

const callGitHub = async (path) => {
    const response = await fetch(baseUrl + path, { headers: makeHeaders() });

    if (response.status === 404) {
        const error = new Error("GitHub user not found");
        error.status = 404;
        throw error;
    }

    if (response.status === 403 || response.status === 429) {
        const error = new Error("GitHub rate limit reached. Add a GITHUB_TOKEN to your .env file");
        error.status = 429;
        throw error;
    }

    if (!response.ok) {
        const error = new Error("GitHub request failed");
        error.status = 502;
        throw error;
    }

    return response.json();
};

const getUserProfile = async (username) => {
    const data = await callGitHub("/users/" + encodeURIComponent(username));

    return {
        username: data.login,
        name: data.name,
        avatarUrl: data.avatar_url,
        bio: data.bio,
        publicRepos: data.public_repos,
        followers: data.followers,
        following: data.following,
        profileUrl: data.html_url
    };
};

const getUserRepos = async (username) => {
    const data = await callGitHub("/users/" + encodeURIComponent(username) + "/repos?sort=updated&per_page=10");

    return data.map((repo) => {
        return {
            name: repo.name,
            description: repo.description,
            language: repo.language,
            stars: repo.stargazers_count,
            url: repo.html_url,
            updatedAt: repo.updated_at
        };
    });
};

module.exports = {
    getUserProfile,
    getUserRepos
};