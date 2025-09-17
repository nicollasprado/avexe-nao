import { PhotoPlaceholder } from "@/app/components/PhotoPlaceholder";
import Image from "next/image";
import { ChangeEvent } from "react";
import { Topping } from "~/prisma/generated/prisma";

interface IToppingRowProps {
  topping: Topping;
  onCheck: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function ToppingRow({ topping, onCheck }: IToppingRowProps) {
  const getToppingImg = (topping: Topping) => {
    if (topping.imgUrl) {
      return (
        <Image
          src={`/${topping.imgUrl}`}
          alt={`foto do ${topping.name}`}
          fill
        />
      );
    }

    return <PhotoPlaceholder width={40} height={40} />;
  };

  return (
    <li key={topping.id} className="flex justify-between items-center px-2">
      <label
        htmlFor={`${topping.name}-${topping.id}`}
        className="flex gap-2 items-center"
      >
        <div className="relative w-10 h-10">{getToppingImg(topping)}</div>
        {topping.name}
      </label>
      <input
        type="checkbox"
        name={`${topping.name}-${topping.id}`}
        id={`${topping.name}-${topping.id}`}
        className="w-6 h-6 toppingCheckbox"
        onChange={(e) => onCheck(e)}
      />
    </li>
  );
}
