import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
export async function GET(request: NextRequest) {
 const { searchParams, origin } = new URL(request.url);
 const code = searchParams.get("code");
 const next = searchParams.get("next") ?? "/dashboard";
 if (code) {
  const response = NextResponse.redirect(new URL(next, origin));
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL; const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if(!url||!key)return NextResponse.redirect(new URL("/login?error=configuration",origin));
  const supabase=createServerClient(url,key,{cookies:{getAll:()=>request.cookies.getAll(),setAll:(items)=>items.forEach(({name,value,options})=>response.cookies.set(name,value,options))}});
  const {error}=await supabase.auth.exchangeCodeForSession(code);
  if(!error)return response;
 }
 return NextResponse.redirect(new URL("/login?error=confirmation",origin));
}
