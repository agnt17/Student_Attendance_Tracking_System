import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon('postgresql://neondb_owner:1NspHG5DZYcE@ep-black-lab-a5b6m71k.us-east-2.aws.neon.tech/student-attendance-tracker?sslmode=require');
export const db = drizzle(sql,{schema});

 