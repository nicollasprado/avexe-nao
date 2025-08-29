import { motion } from "motion/react";
import Image from "next/image";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex flex-col gap-10 items-center justify-center bg-black z-50"
    >
      <motion.h1
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
      >
        <Image
          src="/logo.jpg"
          alt="Logo da Avexe não açaiteria"
          width={128}
          height={128}
          className="rounded-lg"
        />
      </motion.h1>
      <p>Carregando, aguarde um momento...</p>
    </motion.div>
  );
}
