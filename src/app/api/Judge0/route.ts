// import { NextRequest, NextResponse } from 'next/server'
// import { z } from 'zod'

// // Define the schema
// const Judge0TestCaseSchema = z.object({
//   language_id: z.number(),
//   source_code: z.string(),
//   stdin: z.string().optional(),
//   expected_output: z.string().optional(),
//   wait: z.boolean().optional().default(true)
// })
// const Judge0BatchSchema = z.array(Judge0TestCaseSchema)

// export async function POST(req: NextRequest) {
//   try {
//     const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY
//     const JUDGE0_HOST = process.env.JUDGE0_HOST || 'judge0-ce.p.rapidapi.com'

//     if (!JUDGE0_API_KEY) {
//       return NextResponse.json({ error: 'Missing Judge0 API key' }, { status: 500 })
//     }

//     const body = await req.json()
//     const parsed = Judge0BatchSchema.safeParse(body)

//     if (!parsed.success) {
//       return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
//     }

//     const testCases = parsed.data

//     // 1. Submit batch
//     const submissionRes = await fetch(`https://${JUDGE0_HOST}/submissions/batch?base64_encoded=false`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-RapidAPI-Host': JUDGE0_HOST,
//         'X-RapidAPI-Key': JUDGE0_API_KEY,
//       },
//       body: JSON.stringify({ submissions: testCases }),
//     })
//     const submissionJson = await submissionRes.json()
//     const tokens = submissionJson.map((res: any) => res.token)

//     // 2. Wait for all token results
//     const results = await Promise.all(tokens.map(async (token: string) => {
//       const res = await fetch(`https://${JUDGE0_HOST}/submissions/${token}?base64_encoded=false`, {
//         headers: {
//           'X-RapidAPI-Host': JUDGE0_HOST,
//           'X-RapidAPI-Key': JUDGE0_API_KEY,
//         }
//       })
//       return res.json()
//     }))

//     // 3. Return results with matching test cases
//     return NextResponse.json({
//       results: results.map((res, index) => ({
//         index,
//         stdout: res.stdout || '',
//         stderr: res.stderr || '',
//         compile_output: res.compile_output || '',
//         expected_output: testCases[index]?.expected_output || '',
//         passed: res.stdout?.trim() === testCases[index]?.expected_output?.trim(),
//         status: res.status?.description || 'Unknown',
//         time: res.time,
//         memory: res.memory,
//       }))
//     })

//   } catch (error: any) {
//     console.error('Judge0 Batch Error:', error)
//     return NextResponse.json({ error: `Internal server error: ${error.message}` }, { status: 500 })
//   }
// }

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Define the schema for individual test case
const Judge0TestCaseSchema = z.object({
  language_id: z.number(),
  source_code: z.string(),
  stdin: z.string().optional(),
  expected_output: z.string().optional(),
  wait: z.boolean().optional().default(true),
})

// Define the schema for the batch submission
const Judge0BatchSchema = z.object({
  source_code: z.string(),
  language_id: z.number(),
  test_cases: z.array(Judge0TestCaseSchema)
})

export async function POST(req: NextRequest) {
  try {
    const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY
    const JUDGE0_HOST = process.env.JUDGE0_HOST || 'judge0-ce.p.rapidapi.com'

    if (!JUDGE0_API_KEY) {
      return NextResponse.json({ error: 'Missing Judge0 API key' }, { status: 500 })
    }

    const body = await req.json()
    const parsed = Judge0BatchSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const { source_code, language_id, test_cases } = parsed.data

    // 1. Submit batch of test cases
    const submissionRes = await fetch(`https://${JUDGE0_HOST}/submissions/batch?base64_encoded=false`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': JUDGE0_HOST,
        'X-RapidAPI-Key': JUDGE0_API_KEY,
      },
      body: JSON.stringify({
        submissions: test_cases.map((testCase) => ({
          source_code,
          language_id,
          stdin: testCase.stdin,
          expected_output: testCase.expected_output,
        }))
      }),
    })

    const submissionJson = await submissionRes.json()

    // Extract tokens from submission response
    const tokens = submissionJson.map((res: any) => res.token)

    // 2. Wait for all token results
    const results = await Promise.all(tokens.map(async (token: string) => {
      const res = await fetch(`https://${JUDGE0_HOST}/submissions/${token}?base64_encoded=false`, {
        headers: {
          'X-RapidAPI-Host': JUDGE0_HOST,
          'X-RapidAPI-Key': JUDGE0_API_KEY,
        }
      })
      return res.json()
    }))

    // 3. Process and return results with matching test cases
    return NextResponse.json({
      results: results.map((res, index) => ({
        index,
        stdout: res.stdout || 'No output',
        stderr: res.stderr || 'No errors',
        compile_output: res.compile_output || 'No compilation errors',
        expected_output: test_cases[index]?.expected_output || 'No expected output provided',
        passed: res.stdout?.trim() === test_cases[index]?.expected_output?.trim(), // Compare stdout with expected_output
        status: res.status?.description || 'Unknown',
        time: res.time,
        memory: res.memory,
      }))
    })

  } catch (error: any) {
    console.error('Judge0 Batch Error:', error)
    return NextResponse.json({ error: `Internal server error: ${error.message || String(error)}` }, { status: 500 })
  }
}
