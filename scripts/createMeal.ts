/* eslint-disable no-console */
import { promises as fs } from 'fs';
import path from 'path';

const API_URL = 'https://api.foodary.arturceschin-portfolio.com.br/meals';
const TOKEN = 'eyJraWQiOiJlN2pubE1WamZLeWxFVnZXNWhJaGlwQnE4aHJFcnVMYURmdERyL0tTeHJzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkNDE4ODQ2OC0yMGUxLTcwMGMtNjhmYi00NWYyYjYwNzk4NDYiLCJpc3MiOiJodHRwczovL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL3VzLWVhc3QtMV9SS3h6b1VvOHkiLCJjbGllbnRfaWQiOiJyMmV0aGdxaWp1ZDhmaWxybjJpZnI5OG9nIiwib3JpZ2luX2p0aSI6IjA1OGIyZTYwLTgxNzgtNDIyNi04ZWZiLWVjYTNiNjRlMTZhMSIsImludGVybmFsSWQiOiIzRjBhektwMmZDcUxZQnlJZkFlbTlFS1Y0YWgiLCJldmVudF9pZCI6ImQ0NmQ5MjhhLWM2NDQtNDAwMy1iYmI1LTg4MjFhMTM2NzNhNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3ODE2MzE5NDIsImV4cCI6MTc4MTY3NTE0MiwiaWF0IjoxNzgxNjMxOTQyLCJqdGkiOiI1ODY0ZmUxNi1mNzRjLTQzNGQtOGNiMC1iODliZmYxYWViYjIiLCJ1c2VybmFtZSI6ImQ0MTg4NDY4LTIwZTEtNzAwYy02OGZiLTQ1ZjJiNjA3OTg0NiJ9.qer7nmtWdMp5rMilQXKbj5u5yT3y-aECbH_D7e3NT52329Odih1R0wYhYFBol4s-lM-JOv_6V6x6Jy5CA61-gEo1BsTihLGdT_K5MKmy7wqZKQ-iOgw5mhKa0MRB1PFoVfxyWHgpgiu5M4_c6kAtNu09WxhWLUlqTBV8wNECFN7qowDXbtjuyj1rIFDPxMw33ckkIHUqn79YFS0lZ8mohK5IRFcargMBso0Rwk3cx2wCsxwhdsisM3DnsB9f-9Js8Oz8Q1U_hDTEru8KLIJ4S9oXlMamDzKogxTLHB0SLRJA1twrLF8YgFNp5eXW2NITl6WrySvsS0x3kiyipBPQnQ';

interface IPresignResponse {
  uploadSignature: string;
}

interface IPresignDecoded {
  url: string;
  fields: Record<string, string>;
}

async function readFile(filePath: string, type: 'audio/m4a' | 'image/jpeg'): Promise<{
  data: Buffer;
  size: number;
  type: string;
}> {
  console.log(`🔍 Reading file from disk: ${filePath}`);
  const data = await fs.readFile(filePath);
  return {
    data,
    size: data.length,
    type,
  };
}

async function createMeal(
  fileType: string,
  fileSize: number,
): Promise<IPresignDecoded> {
  console.log(`🚀 Requesting presigned POST for ${fileSize} bytes of type ${fileType}`);
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ file: { type: fileType, size: fileSize } }),
  });

  if (!res.ok) {
    throw new Error(`Failed to get presigned POST: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as IPresignResponse;
  const decoded = JSON.parse(
    Buffer.from(json.uploadSignature, 'base64').toString('utf-8'),
  ) as IPresignDecoded;

  console.log('✅ Received presigned POST data');
  return decoded;
}

function buildFormData(
  fields: Record<string, string>,
  fileData: Buffer,
  filename: string,
  fileType: string,
): FormData {
  console.log(`📦 Building FormData with ${Object.keys(fields).length} fields and file ${filename}`);
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    form.append(key, value);
  }
  const blob = new Blob([fileData], { type: fileType });
  form.append('file', blob, filename);
  return form;
}

async function uploadToS3(url: string, form: FormData): Promise<void> {
  console.log(`📤 Uploading to S3 at ${url}`);
  const res = await fetch(url, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`S3 upload failed: ${res.status} ${res.statusText} — ${text}`);
  }

  console.log('🎉 Upload completed successfully');
}

async function uploadFile(filePath: string, fileType: 'audio/m4a' | 'image/jpeg'): Promise<void> {
  try {
    const { data, size, type } = await readFile(filePath, fileType);
    const { url, fields } = await createMeal(type, size);
    const form = buildFormData(fields, data, path.basename(filePath), type);
    await uploadToS3(url, form);
  } catch (err) {
    console.error('❌ Error during uploadFile:', err);
    throw err;
  }
}

uploadFile(
  path.resolve(__dirname, 'assets', 'jstack.png'),
  'image/jpeg',
).catch(() => process.exit(1));
