export default async function handler(req: any, res: any) {
 const key=process.env.GOOGLE_PLACES_API_KEY;
 if(!key) return res.status(500).json({error:"Missing GOOGLE_PLACES_API_KEY in Vercel environment variables."});
 try {
  if(typeof req.query?.photo==="string"){
   const p=req.query.photo;
   if(!p.startsWith("places/")||!p.includes("/photos/")) return res.status(400).json({error:"Invalid photo reference."});
   const media=await fetch("https://places.googleapis.com/v1/"+p+"/media?maxWidthPx=1200&key="+encodeURIComponent(key),{redirect:"manual"});
   const location=media.headers.get("location");
   if(!location) return res.status(media.status||502).json({error:"Google did not return a photo URL."});
   res.setHeader("Cache-Control","public, s-maxage=86400, stale-while-revalidate=604800");
   return res.redirect(302,location);
  }
  const response=await fetch("https://places.googleapis.com/v1/places:searchText",{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":key,"X-Goog-FieldMask":"places.id,places.displayName,places.rating,places.userRatingCount,places.googleMapsUri,places.reviews,places.photos"},body:JSON.stringify({textQuery:"Animality Pets, 2 Agra Mumbai Highway, Jadhav Mala, Adgaon, Nashik, Maharashtra 422003, India",maxResultCount:1})});
  const result=await response.json();
  if(!response.ok) return res.status(response.status).json({error:result.error?.message||"Google Places search failed",details:result});
  if(!result.places?.length) return res.status(404).json({error:"Animality Pets was not found in Google Places."});
  res.setHeader("Cache-Control","s-maxage=3600, stale-while-revalidate=86400");
  return res.status(200).json(result.places[0]);
 } catch(e:any){return res.status(500).json({error:e.message||"Unexpected Google Places API error"});}
}