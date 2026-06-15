import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async()=>{
    const token = await getUserToken()
    const header = {
        authorization: `Bearer${token}`
    }
    return token?header :{};
}


export const serverFetch = async (path)=> {
    const res = await fetch(`${baseUrl}${path}`);
     // Handle empty response safely
  const text = await res.text();

  return text ? JSON.parse(text) : null;
}

export const serverMutation = async (path,data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            ...await authHeader()
        },
        body:JSON.stringify(data)

       
    })
     return res.json();
}