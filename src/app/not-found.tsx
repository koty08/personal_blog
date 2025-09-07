import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <h2 className="font-bold">404 | Not Found</h2>
      <p className="text-xl">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="border p-2">
        메인 페이지로 돌아가기
      </Link>
    </div>
  );
}
