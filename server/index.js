import express from 'express';
import authRouter from './routes/auth.js'
import assetRouter from './routes/asset.js'
import employeeRouter from './routes/employee.js'
import departmentRouter from './routes/department.js'
import assignRouter from './routes/assign.js'
import issueRouter from './routes/issue.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectToDatabase from './db/db.js'
import path from 'path';
connectToDatabase()


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public/assetuploads'))
app.use('/api/auth', authRouter)
app.use('/api/assets', assetRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/department', departmentRouter)
app.use('/api/assign', assignRouter)
app.use('/api/issue', issueRouter)
app.use('/api/setting', settingRouter)
app.use('/api/dashboard', dashboardRouter)

// Serve React frontend (in production)
const __dirname = path.resolve(); // needed to resolve build path

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

  app.get('/reset-password/:token', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'));
  });
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
    
})
