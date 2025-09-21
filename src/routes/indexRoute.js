import authRouter from './authRoute.js';
import insertRouter from './insertRoute.js';

const initRoutes = (app) => {
    app.use('/api/auth', authRouter);

    app.use('/api/insert', insertRouter);

}

export default initRoutes;

