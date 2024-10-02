import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { ChangeEvent, useState } from "react";
import { SignupSchema, SigninSchema } from "@zicor/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config.ts";

export default function Auth({type}: {type: "login" | "signup"}) {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [postInputs, setPostInputs] = useState< SigninSchema | SignupSchema>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPostInputs({
          ...postInputs,
          [e.target.name]: e.target.value,
        });
      };

    const sendRequest = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs);
            localStorage.setItem("jwt", response.data.jwt);
            setLoading(false)
            navigate("/blogs");
            console.log(response.status);

        } catch (error : any) {
            console.log(error.response.data);
            setLoading(false)
            setError(error.response.data.error[0].message);
        }

    };
    return <>
    {/* <pre>{JSON.stringify(postInputs, null, 2)}</pre> */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-4 py-8">
            {loading && <Spinner />}            
            <div className="flex justify-center">
                <h1 className="font-extrabold text-3xl mt-14 text-black">{type === "signup" ? "Create an account" : " Welcome Back "}</h1>
            </div>
                <p className="mt-2 text-center text-sm text-black/70">{type === "signup" ? "Join our community of writers and readers" : "Sign in to access your account "}</p>
            <form className="mt-8">                 
                {type === "signup" && <Input name="name" placeholder="Full Name" onChange={handleChange}/>}        
                <Input name="email" placeholder="Email Address" onChange={handleChange}/>
                <Input name="password" type="password" placeholder="Password" onChange={handleChange} />

                {error &&<p className=" text-peach font-normal">*{error} </p>  }              
               {type === "login" && <div className="flex items-center justify-between my-8">
                <div className="flex items-center">                    
                        <input
                            className="h-4 w-4 focus:ring-peach text-peach rounded border-peach accent-peach"
                            id="remember-me" 
                            name="remember-me" 
                            type="checkbox" 
                        />
                        <label className="ml-2 text-sm font-medium text-black" htmlFor="remember-me">Remember me</label>
                    </div>
                    <div>
                        <a className="text-sm text-peach hover:text-light-red font-medium" href="#">Forgot your password?</a>
                    </div>
                     </div>}
                     {type === "signup" ?
                        <Button color="peach" handleClick={sendRequest} type="button" >Sign up</Button>
                        : 
                        <Button type="button" color="black" handleClick={sendRequest}>Login</Button>
                        }
                    <div className="text-center mt-8 text-sm">
                        <p className="text-black/70">{type === "login" ? "Don't have an account? " : "Already have an account? "}
                            {type === "login" ?
                            <Link to={'/signup'}>
                                <span className="text-peach font-medium">Sign up</span>
                            </Link>
                            :
                            <Link to={'/login'}>
                                <span className="text-peach font-medium">Login</span>
                            </Link>
                            }
                        </p>
                    </div>
            </form>
            </div>

    </>;
}


const Spinner = ()=>{
    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 9-3-3m6 6a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        </>)
}