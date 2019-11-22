module.exports = (req, res) => {
    res.send({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "SSML",
                "ssml": "<speak>You are asking something that I cannot answer."
                }
            }
        }
    );
};