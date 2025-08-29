"use client";

import { Clock, User } from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useStoreData } from "../hooks/useStoreData";
import { useGetAllCategories } from "../hooks/useGetAllCategories";
import TabsButton from "./components/TabsButton";
import { useGetAllProductsByCategory } from "../hooks/useGetAllProductsByCategory";
import ProductCard from "./components/ProductCard";
import { AnimatePresence } from "motion/react";
import LoadingScreen from "./components/LoadingScreen";
import MenuFooter from "./components/MenuFooter";
import CartSheet from "./components/CartSheet";

export interface ISelectedCategory {
  id: number;
  name: string;
}

export default function Home() {
  const { store } = useStoreData();
  const [selectedCategory, setSelectedCategory] = useState<ISelectedCategory>({
    id: 0,
    name: "",
  });
  const { categories } = useGetAllCategories();
  const { productsData } = useGetAllProductsByCategory(selectedCategory.id);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedCategory({
        id: categories[0].id,
        name: categories[0].name,
      });
    }
  }, [categories]);

  useEffect(() => {
    if (store && categories) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store, categories]);

  const storeWorkingStatus = (isOpen: boolean = false): ReactNode => {
    const textColor: string = isOpen ? "text-green-500" : "text-red-400";
    const text: string = isOpen ? "ABERTO" : "FECHADO";

    return (
      <div className={`${textColor} flex gap-2`}>
        <Clock />
        <p>{text}</p>
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      <a
        href="#"
        className="absolute z-49 right-5 top-5 bg-white p-2 rounded-full text-mygray-400"
      >
        <User width={32} height={32} />
      </a>

      <div className="relative">
        <div className="relative w-full h-[35dvh]">
          <Image src={"/bg.jpg"} alt="background" fill />
        </div>

        <div className="absolute w-full top-[23dvh] h-[77dvh] rounded-t-4xl bg-white">
          <div className="w-full flex flex-col items-center gap-8 p-3 h-[67dvh]">
            <div className="w-fit h-[6dvh] flex items-center gap-2">
              {store && (
                <Image
                  src={`/${store?.logoUrl}`}
                  alt="Logo da loja"
                  width={48}
                  height={24}
                />
              )}
              <div>
                <h2 className="font-bold text-xl text-mygray-400">
                  SE AVEXE NÃO AÇAITERIA
                </h2>
                <div className="flex justify-between">
                  {storeWorkingStatus(store?.isOpen)}
                  <p className="text-mygray-300">
                    {store?.startHour}:00 - {store?.endHour}:00
                  </p>
                </div>
              </div>
            </div>

            <nav className="flex w-full h-[7dvh]">
              <ol className="flex flex-1 gap-6 font-semibold overflow-y-scroll">
                {categories?.map((category) => (
                  <TabsButton
                    key={category.id}
                    tab={{ id: category.id, name: category.name }}
                    selectedTab={selectedCategory}
                    setSelectedTab={setSelectedCategory}
                  />
                ))}
              </ol>
            </nav>

            <main className="w-full flex flex-col overflow-y-scroll h-[54dvh]">
              <ol className="flex flex-col gap-7">
                {!productsData ? (
                  <h1>Carregando</h1>
                ) : (
                  productsData.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))
                )}
              </ol>
            </main>
          </div>

          <MenuFooter />

          <CartSheet />
        </div>
      </div>
    </>
  );
}
