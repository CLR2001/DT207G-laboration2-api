import express from 'express';
import cors from 'cors';
import pc from "picocolors";

/* ----------------------------- Initialization ----------------------------- */
const app = express();
import employmentsRoutes from './routes/employments'

/* ------------------------------- Middleware ------------------------------- */
app.use(cors());
app.use(express.json());

/* --------------------------------- Routes --------------------------------- */
app.use('/employments', employmentsRoutes)

/* --------------------------------- Listen --------------------------------- */
app.listen(5000, () => {
  setTimeout(() => {
    console.log("\n-------------------------------------------");
    console.log('  ● Server is running on port 5000!');
    console.log(`  › ${pc.blue(pc.underline('http://localhost:5000'))}`);
    console.log("-------------------------------------------");
  }, 500);
});