import authRoutes from './authRoute.js';

const initRoutes = (app) => {
    app.use('/api/auth', authRoutes);
}

export default initRoutes;

