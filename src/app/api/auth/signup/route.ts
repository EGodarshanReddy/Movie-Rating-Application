import { NextRequest, NextResponse } from "next/server";
import { SignupSchema } from "../../../../utils/validators/user.schema.ts";
import { signupService } from "../../../service/sinupservice.ts";


export async function POST(req: NextRequest): Promise<NextResponse> {
    try {

      const body = await req.json(); // Parse the request body
      console.log("body",body);
      const parsed = SignupSchema.safeParse(body);
      console.log("parsed",parsed);
  
      if (!parsed.success) {
        return NextResponse.json(
          { errors: parsed.error.flatten().fieldErrors },
          { status: 400 }as any
        );
      }
     
  
      const {name, email, password } = parsed.data;
      // console.log("Password",password);
      // console.log("type of password is: ",typeof(password));
      const data=await signupService(name,email,password);
      if(data instanceof NextResponse)
      {return data;}
      else
      {
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 }as any);
      }
    } catch (error) {
      console.error('Sign In error:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 }as any);
    }
  }
