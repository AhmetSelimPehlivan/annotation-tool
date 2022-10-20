let client = null;

async function add(item, userId) {
    return new Promise((resolve, reject) => {
        client.hget(`task: ${userId}`, (err, obj) =>{
            if(err) return reject(err);
            if(!obj){
                return client.hset(`task: ${userId}`, item, 1, (seterr, res) =>{
                    if(seterr) return reject(seterr);
                    return resolve(res);
                })
            }

            return client.hincrby(`task: ${userId}`, item, 1, (incerr, res) =>{
                if(incerr) return reject(incerr);
                return resolve(res);
            });
        });
    });
};

async function getAll(userId) {
    return new Promise((resolve, reject) => {
        client.hgetall(`task: ${userId}`, (err, res) => {
            if(err) return reject(err);
            return resolve(res)
        });
    });
};

async function remove(itemId, userId) {
    return new Promise((resolve, reject) => {
        client.hdel(`task: ${userId}`, itemId, (err, res) =>{
            if(err) return reject(err);
            return resolve(res)
        });
    });
};

module.exports = (_client) => {
    if(!_client) throw new Error('Missing redis client object');

    client = _client;

    return {
        add, 
        getAll, 
        remove
    };
}