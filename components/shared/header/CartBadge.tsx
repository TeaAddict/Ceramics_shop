import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

const CartBadge = ({ value = 0 }: { value: number }) => {
  return (
    <Link className="flex relative px-10 py-10" href="/cart">
      <IoCartOutline size={40} className="cursor-pointer" />
      {value > 0 && (
        <span className="absolute flex justify-center items-center w-[30px] h-[30px] bg-primary rounded-full top-8 left-14 cursor-pointer">
          <p>{value}</p>
        </span>
      )}
    </Link>
  );
};

export default CartBadge;
