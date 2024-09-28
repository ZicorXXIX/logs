interface buttonProps {
    color: "peach" | "black";
    children: string;
    handleClick?: (e: any) => Promise<void>;
    type: "submit" | "button";
    size?: "small" | "large";
}
export function Button({
    color,
    children,
    handleClick,
    type,
    size
}: buttonProps) {
    return <>
     {size === "small" ? 
        <div className={`bg-${color} w-full max-w-[100px] min-w-[100px] p-2 rounded text-sm text-custom-white hover:bg-light-red`}>
            <button className="w-full font-medium" type={type} onClick={handleClick}>{children}</button>
        </div>
     :
        <div className={`bg-${color} w-full max-w-md min-w-[200px] p-2 rounded-md text-sm text-custom-white hover:bg-light-red`}>
            <button className="w-full font-medium" type={type} onClick={handleClick}>{children}</button>
        </div>
        }            
        </>
}