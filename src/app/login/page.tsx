"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
export default function LoginPage() {
 const [mode,setMode]=useState<"login"|"signup">("login");
 const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
 const [busy,setBusy]=useState(false); const [message,setMessage]=useState("");
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setMessage("");try{
  const supabase=createClient();
  if(mode==="login"){const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;window.location.href="/dashboard";}
  else {const {data,error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:window.location.origin+"/auth/callback"}});if(error)throw error;setMessage(data.session?"Account created. Opening your workspace…":"Account created. Check your email to confirm your address, then sign in.");}
 }catch(err){setMessage(err instanceof Error?err.message:"Unable to complete authentication.");}finally{setBusy(false);}}
 return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:20}}><section className="panel" style={{width:"100%",maxWidth:440,padding:30}}><div className="eyebrow">BONGA BHENGU OS</div><h1 className="heading">{mode==="login"?"Welcome back":"Create owner account"}</h1><p className="muted">Secure access to your personal brand workspace.</p><form onSubmit={submit} style={{display:"grid",gap:14,marginTop:24}}><label className="muted">Email address<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} style={field}/></label><label className="muted">Password<input required minLength={8} type="password" autoComplete={mode==="login"?"current-password":"new-password"} value={password} onChange={e=>setPassword(e.target.value)} style={field}/></label><button disabled={busy} className="action" style={{border:0,cursor:"pointer",marginTop:4}}>{busy?"Please wait…":mode==="login"?"Sign in":"Create account"}</button></form>{message&&<p role="status" className="muted" style={{marginTop:16}}>{message}</p>}<p className="muted" style={{marginTop:20,fontSize:13}}>{mode==="login"?"New to the workspace?":"Already registered?"} <button onClick={()=>{setMode(mode==="login"?"signup":"login");setMessage("");}} style={{background:"none",border:0,color:"#c7f77e",cursor:"pointer"}}>{mode==="login"?"Create an account":"Sign in"}</button></p><Link href="/" className="muted" style={{fontSize:12}}>← Back to home</Link></section></main>;
}
const field:React.CSSProperties={display:"block",width:"100%",marginTop:7,padding:"12px",borderRadius:9,border:"1px solid #3a4a65",background:"#0b1020",color:"#fff",outline:"none"};
