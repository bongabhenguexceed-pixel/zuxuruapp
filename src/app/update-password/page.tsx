"use client";
import {useState} from "react";
import Link from "next/link";
import {createClient} from "@/lib/supabase/client";
export default function UpdatePasswordPage(){
 const [password,setPassword]=useState("");const [message,setMessage]=useState("");const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setMessage("");try{const supabase=createClient();const {error}=await supabase.auth.updateUser({password});if(error)throw error;setMessage("Password updated. You can now sign in with your new password.");}catch(err){setMessage(err instanceof Error?err.message:"Unable to update password.");}finally{setBusy(false);}}
 return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:20}}><section className="panel" style={{width:"100%",maxWidth:440,padding:30}}><div className="eyebrow">ACCOUNT SECURITY</div><h1 className="heading">Choose a new password</h1><p className="muted">Use at least 8 characters.</p><form onSubmit={submit} style={{display:"grid",gap:14,marginTop:24}}><label className="muted">New password<input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} style={field}/></label><button disabled={busy} className="action" style={{border:0,cursor:"pointer"}}>{busy?"Updating…":"Update password"}</button></form>{message&&<p role="status" className="muted">{message}</p>}<Link href="/login" className="muted" style={{fontSize:13}}>Back to sign in</Link></section></main>;
}
const field:React.CSSProperties={display:"block",width:"100%",marginTop:7,padding:12,borderRadius:9,border:"1px solid #3a4a65",background:"#0b1020",color:"#fff"};
