import React from "react";

interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string;
}

export function Avatar({ src, alt, fallback }: AvatarProps) {
  return (
    <div className="">
      {src ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-medium">
          {fallback}
        </div>
      )}
    </div>
  );
}
