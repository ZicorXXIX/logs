interface AvatarProps {
    name: string;
    src?: string;
    size?: "small" | "large";
  }
  
  export default function Avatar({ name, src, size = "small"}: AvatarProps) {
    
    const sizeVariants = {
      small: "w-6 h-6", // 6
      large: "w-10 h-10", // 10
    }

    return (
      <>
        {src ? (
          <img src={src} alt={name} className={`${sizeVariants[size]} rounded-full`} />
        ) : (
          <>
          <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${sizeVariants[size]} `}
          >
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {name[0].toUpperCase()}
            </span>
          </div>          
          </>
          
        )}
      </>
    );
  }