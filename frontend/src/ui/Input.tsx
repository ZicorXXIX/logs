import { ChangeEvent } from 'react';
interface InputProps {
    name: string;
    type?: string;
    placeholder: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ name, type, placeholder, onChange } : InputProps) {
  return<>
        <div className="w-full max-w-md min-w-[200px] my-4">
            <input 
                className="w-full border border-slate-200 focus:outline-none focus:border-slate-400 focus:shadow rounded-md p-2 text-sm text-black/30 hover:border-slate-300"
                type={type || "text"} 
                name={name} 
                placeholder={placeholder} 
                onChange={onChange}
                autoComplete={type === 'password' ? "current-password" : "on"}
                required 
            />
        </div>
  </>;
}