import { Pool, type PoolConfig } from "pg";

export type DemoRegistrationInput = {
  name: string;
  parentName: string;
  age: string;
  experience: string;
  phone: string;
};

export type DemoRegistration = DemoRegistrationInput & {
  registeredDate: string;
  registeredTime: string;
  fullTimestamp: string;
};

const VALID_EXPERIENCE = new Set(["beginner", "intermediate", "advanced"]);

function createPoolConfig(): PoolConfig {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      max: 10,
    };
  }

  return {
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT || 5432),
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DATABASE || "nexa",
    max: 10,
  };
}

const pool = new Pool(createPoolConfig());

let tableReady: Promise<void> | null = null;

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateDemoRegistration(data: unknown): DemoRegistrationInput {
  const record = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  const name = cleanText(record.name);
  const parentName = cleanText(record.parentName);
  const age = cleanText(record.age);
  const experience = cleanText(record.experience).toLowerCase();
  const phone = cleanText(record.phone).replace(/\D/g, "");
  const ageNumber = Number(age);

  if (!name || !parentName || !age || !experience || !phone) {
    throw new Error("All fields are required.");
  }

  if (!Number.isInteger(ageNumber) || ageNumber < 4 || ageNumber > 18) {
    throw new Error("Student age must be between 4 and 18.");
  }

  if (!VALID_EXPERIENCE.has(experience)) {
    throw new Error("Please select a valid experience level.");
  }

  if (!/^\d{10}$/.test(phone)) {
    throw new Error("Contact number must be exactly 10 digits.");
  }

  return {
    name,
    parentName,
    age: String(ageNumber),
    experience,
    phone,
  };
}

async function ensureRegistrationsTable() {
  tableReady ??= pool.query(`
    CREATE TABLE IF NOT EXISTS demo_registrations (
      id BIGSERIAL PRIMARY KEY,
      student_name VARCHAR(120) NOT NULL,
      parent_name VARCHAR(120) NOT NULL,
      student_age SMALLINT NOT NULL CHECK (student_age BETWEEN 4 AND 18),
      experience_level VARCHAR(20) NOT NULL CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
      phone CHAR(10) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_demo_registrations_created_at
      ON demo_registrations (created_at DESC);
  `)
    .then(() => undefined)
    .catch((error) => {
      tableReady = null;
      throw error;
    });

  return tableReady;
}

export async function saveDemoRegistration(input: DemoRegistrationInput): Promise<DemoRegistration> {
  await ensureRegistrationsTable();

  await pool.query(
    `INSERT INTO demo_registrations
      (student_name, parent_name, student_age, experience_level, phone)
     VALUES
      ($1, $2, $3, $4, $5)`,
    [input.name, input.parentName, Number(input.age), input.experience, input.phone],
  );

  const now = new Date();

  return {
    ...input,
    registeredDate: now.toISOString().split("T")[0],
    registeredTime: now.toTimeString().split(" ")[0],
    fullTimestamp: now.toISOString(),
  };
}

export async function getDemoRegistrations(): Promise<DemoRegistration[]> {
  await ensureRegistrationsTable();

  const { rows } = await pool.query<DemoRegistration>(`
    SELECT
      student_name AS name,
      parent_name AS "parentName",
      student_age::text AS age,
      experience_level AS experience,
      phone,
      to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS "registeredDate",
      to_char(created_at AT TIME ZONE 'UTC', 'HH24:MI:SS') AS "registeredTime",
      to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') AS "fullTimestamp"
    FROM demo_registrations
    ORDER BY created_at DESC
  `);

  return rows;
}
