app.use((err, req, res, next) => {
    console.error(err.stack); // Imprime el error en la consola
    res.status(500).send('¡Algo salió mal!');
});