import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Updated schema
const SingleSourceBatchSchema = z.object({
  language_id: z.number(),
  source_code: z.string(),
  wait: z.boolean().optional().default(true),
  test_cases: z.array(
    z.object({
      stdin: z.string().optional(),
      expected_output: z.string().optional()
    })
  )
})

export async function POST(req: NextRequest) {
  try {
    const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY
    const JUDGE0_HOST = process.env.JUDGE0_HOST || 'judge0-ce.p.rapidapi.com'

    if (!JUDGE0_API_KEY) {
      return NextResponse.json({ error: 'Missing Judge0 API key' }, { status: 500 })
    }

    const body = await req.json()
    const parsed = SingleSourceBatchSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const { language_id, source_code, wait, test_cases } = parsed.data

    // Construct individual submissions using common source_code and language_id
    const submissions = test_cases.map(tc => ({
      language_id,
      source_code,
      wait,
      stdin: tc.stdin,
      expected_output: tc.expected_output
    }))

    // Submit to Judge0 batch endpoint
    const submissionRes = await fetch(`https://${JUDGE0_HOST}/submissions/batch?base64_encoded=false`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': JUDGE0_HOST,
        'X-RapidAPI-Key': JUDGE0_API_KEY,
      },
      body: JSON.stringify({ submissions }),
    })

    const submissionJson = await submissionRes.json()
    const tokens = submissionJson.map((res: any) => res.token)

    console.log("Tokens:", tokens)

    // Fetch results for each token
    const results = await Promise.all(tokens.map(async (token: string) => {
      const res = await fetch(`https://${JUDGE0_HOST}/submissions/${token}?base64_encoded=false`, {
        headers: {
          'X-RapidAPI-Host': JUDGE0_HOST,
          'X-RapidAPI-Key': JUDGE0_API_KEY,
        }
      })
      return res.json()
    }))

    console.log("Results:", results)

    // Return processed results
    return NextResponse.json({
      results: results.map((res, index) => ({
        index,
        stdout: res.stdout || '',
        stderr: res.stderr || '',
        compile_output: res.compile_output || '',
        expected_output: test_cases[index]?.expected_output || '',
        passed: res.stdout?.trim() === test_cases[index]?.expected_output?.trim(),
        status: res.status?.description || 'Unknown',
        time: res.time,
        memory: res.memory,
      }))
    })

  } catch (error: any) {
    console.error('Judge0 Batch Error:', error)
    return NextResponse.json({ error: `Internal server error: ${error.message}` }, { status: 500 })
  }
}
