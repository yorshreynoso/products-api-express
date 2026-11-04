import app from "./app";

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
});

export = app;