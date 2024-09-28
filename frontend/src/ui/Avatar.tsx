interface AvatarProps {
    name: string;
    src?: string;
    size?: number;
  }
  
  export default function Avatar({ name, src, size = 6}: AvatarProps) {
    return (
      <>
        {src ? (
          <img src={src} alt={name} className={`w-${size} h-${size} rounded-full`} />
        ) : (
          <div
            className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
          >
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {name[0].toUpperCase()}
            </span>
          </div>
        )}
      </>
    );
  }