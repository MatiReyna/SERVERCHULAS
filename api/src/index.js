const server = require('./app');
const PORT = 3001;
const { conn } = require('./DB_connection');

conn.sync({ force: true }).then(() => {
    console.log('Tablas sincronizadas correctamente');
    server.listen(PORT, () => { console.log(`Server raised in port: ${PORT}`) });
}).catch(error => {
    console.log('error al sincronizar tablas:', error)
});