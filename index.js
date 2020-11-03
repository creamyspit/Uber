'use strict';

const Hapi = require('@hapi/hapi');
const usersController = require('./controllers/usersController')

const init = async () => {

    const server = Hapi.server({
        port: 8080,
        host: 'localhost'
    });

    server.route({
        method: 'POST',
        path: '/users',
        handler: (request, h) => {
            console.log ('users post request')
            const payload = JSON.parse(request.payload)
            const username = payload.username;
            const password = payload.password;
            console.log ('payload', payload)
console.log ('username', username)
console.log ('password', password)
            return usersController.create(
                {
                    username, 
                    password
                }
            )

        }
    });

    server.route({
        method: 'GET',
        path: '/users',
        handler: (request, h) => {
            console.log('Welcome to the matrix')
            const users = usersController.index();
            return users 
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();