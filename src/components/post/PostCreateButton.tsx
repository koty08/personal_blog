import Link from "next/link";

export default function PostCreateButton() {
  return (
    <Link href={"/posts/create"} className="border border-sky-300 px-2 py-1 hover:border-sky-500 hover:bg-gray-100">
      게시글 생성
    </Link>
  );
}
