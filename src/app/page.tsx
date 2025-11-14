import { ProjectsList } from "@/components";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-linear-to-r from-[#676ece] to-[#c7a2da]">
      <main className="flex min-h-screen w-full flex-col items-center justify-between sm:items-start">
        <ProjectsList />
      </main>
    </div>
  );
}
