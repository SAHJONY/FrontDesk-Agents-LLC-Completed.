import Image from "next/image";

export default function PremiumImage({ src, alt, ...props }: any) {
  return (
    <Image
      src={src}
      alt={alt}
      className="rounded-xl shadow-lg"
      {...props}
    />
  );
}
