import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface AuthorDataProps {
  author: {
    name: string;
    avatar: string;
    slug: string;
  };
  date: string;
}

export const AuthorData = ({ author, date }: AuthorDataProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Link
        href={`/blog/authors/${author.slug}`}
        className="flex flex-row items-center gap-2 hover:opacity-80"
      >
        <Image
          src={author.avatar}
          alt={author.name}
          width={36}
          height={36}
          className="rounded-full"
        />
        <p className="font-body-5 text-left">{author.name}</p>
      </Link>
      <div className="h-4 w-0.5 bg-gray-400 mx-3" />
      <p className="font-body-6 text-left">{formatDate(date)}</p>
    </div>
  );
};
