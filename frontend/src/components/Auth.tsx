import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { ChangeEvent, useState } from "react";
import { SignupSchema, SigninSchema } from "@zicor/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function Auth({type}: {type: "login" | "signup"}) {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState< SigninSchema | SignupSchema>({
        email: "",
        password: "",
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPostInputs({
          ...postInputs,
          [e.target.name]: e.target.value,
        });
      };

    const sendRequest = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs);
            localStorage.setItem("jwt", response.data.jwt);
            navigate("/blogs");
            console.log(response);

        } catch (error) {
            console.log(error);
        }

    };
    return <>
    {/* <pre>{JSON.stringify(postInputs, null, 2)}</pre> */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg px-4 py-8">
            <div className="flex justify-center">
                <h1 className="font-extrabold text-3xl mt-14 text-black">{type === "signup" ? "Create an account" : " Welcome Back "}</h1>
            </div>
                <p className="mt-2 text-center text-sm text-black/70">{type === "signup" ? "Join our community of writers and readers" : "Sign in to access your account "}</p>
            <form className="mt-8"  onSubmit={()=>{
                alert("Form submitted")
            }}>  
               
                {type === "signup" && <Input name="name" placeholder="Full Name" onChange={handleChange}/>}        
                <Input name="email" placeholder="Email Address" onChange={handleChange}/>
                <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
                
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