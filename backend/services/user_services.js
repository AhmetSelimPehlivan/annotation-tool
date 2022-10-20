let client = null;

async function add(userId) {
    return new Promise((resolve, reject) => {
        client.hget(`user: ${userId}`, (err, res) => {
            if(err) return reject(err);
            return resolve(res)
        });
    });
};


module.exports = (_client) => {
    if(!_client) throw new Error('Missing redis client object');

    client = _client;

    return { add };
}