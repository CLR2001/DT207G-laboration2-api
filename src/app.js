import express from 'express';
import cors from 'cors';
import pc from "picocolors";

/* ----------------------------- Initialization ----------------------------- */
const app = express();
import employmentsRoutes from './routes/employments'
import { log } from 'console';

/* ------------------------------- Middleware ------------------------------- */
app.use(cors({
  origin: /https?:\/\/(.+\.)?clr-server\.com$/
}));
app.use(express.json());

/* --------------------------------- Routes --------------------------------- */
app.use('/employments', employmentsRoutes)

/* --------------------------------- Listen --------------------------------- */
const isDev = process.env.NODE_ENV === 'development';

app.listen(3000, () => {
  setTimeout(() => {
    console.log("\n-------------------------------------------");
    console.log('  ● Server is running on port 3000!');
    if (isDev) console.log(`  › ${pc.blue(pc.underline('http://localhost:3000/employments'))}`)
    else console.log(`  › ${pc.blue(pc.underline('https://api.clr-server.com/employments'))}`);
    console.log("-------------------------------------------");
  }, 500);
});


