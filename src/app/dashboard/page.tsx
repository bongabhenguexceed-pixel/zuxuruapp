import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
export default async function DashboardPage() {
 const supabase=createClient();
 const {data:{user}}=await supabase.auth.getUser();
 if(!user)redirect("/login");
 const {data:business}=await supabase.from("businesses").select("id").eq("owner_id",user.id).limit(1).maybeSingle();
 return <main className="main"><div className="topline"><div><div className="eyebrow">Owner workspace</div><h1 className="heading">Your command centre</h1><p className="muted">Signed in as {user.email}</p></div><div style={{display:"flex",gap:10,alignItems:"center"}}><span className="pill">AUTHENTICATED</span><a href="/settings" className="action" style={{marginTop:0}}>Account settings</a></div></div>{business?<section className="panel" style={{marginTop:24}}><h2 className="section-title">Business workspace found</h2><p className="muted">Your account is linked to a business workspace. Live modules can now be connected to your verified database schema.</p><p className="tag">Workspace ID: {business.id}</p></section>:<section className="panel" style={{marginTop:24}}><h2 className="section-title">Set up your business workspace</h2><p className="muted">Your account is signed in, but no business workspace was found. Check that the signup trigger has created your owner workspace.</p></section>}<form action="/auth/signout" method="post"><button className="action" style={{border:0,cursor:"pointer"}}>Sign out</button></form><p style={{marginTop:20}}><Link href="/" className="muted">Back to public home</Link></p></main>;
}
