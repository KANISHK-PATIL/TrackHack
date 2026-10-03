const { getUserProfile, getUserRepos } = require("../services/githubService");

const getProfile = async (req, res) => {
    try {
        const profile = await getUserProfile(req.params.username);

        res.json({
            success: true,
            profile
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
};

const getRepos = async (req, res) => {
    try {
        const repos = await getUserRepos(req.params.username);

        res.json({
            success: true,
            count: repos.length,
            repos
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getProfile,
    getRepos
};