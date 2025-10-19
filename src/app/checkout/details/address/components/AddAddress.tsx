"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import AddAddressForm from "./AddAddressForm";

export default function AddAddress() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full bg-mypurple text-white py-4 mb-2 rounded-md font-semibold cursor-pointer"
      >
        Adicionar Novo
      </button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Adicionar Novo Endereço</DrawerTitle>
            <DrawerDescription>
              Preencha as informações abaixo para adicionar um novo endereço.
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4">
            <AddAddressForm />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
