import { Camera } from "lucide-react";

interface IPhotoPlaceholderProps {
  width: number;
  height: number;
}

export function PhotoPlaceholder({ width, height }: IPhotoPlaceholderProps) {
  return (
    <div
      className={`bg-mygray-200 rounded flex items-center justify-center`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Camera className="text-mygray-300" />
    </div>
  );
}
