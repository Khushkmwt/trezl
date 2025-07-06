import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errorHandler.js';


const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({
    limit: '16kb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));
app.use(cookieParser());

// Importing routes
import userRoutes from './routes/user.routes.js';
import folderRoutes from './routes/folder.routes.js'
import fileRoutes from './routes/file.routes.js'

//using the imported routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/folders', folderRoutes);
app.use('/api/v1/files', fileRoutes);

// Catch undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    data: null,
    statusCode: 404,
  });
});

// Global error handler
app.use(errorHandler);

// Export the app
export default app;