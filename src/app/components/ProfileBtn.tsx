import { User } from "lucide-react";
import Link from "next/link";

export default function ProfileBtn() {
  return (
    <Link
      href="/profile"
      className="absolute z-49 right-5 top-5 bg-white p-2 rounded-full text-mygray-400"
    >
      <User width={32} height={32} />
    </Link>
  );
}
