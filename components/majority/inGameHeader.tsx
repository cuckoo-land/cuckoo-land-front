export default function InGameHeader({ time }: { time: number }) {
  return (
    <header>
      <section className="my-4 flex flex-col gap-2">
        <span className="rounded-lg bg-dark_banner bg-cover bg-center w-1/4 mx-auto font-bold text-xl text-white text-center">
          {time}
        </span>
        <div className="flex gap-2 mx-auto font-bold text-base text-white text-center">
          <span className="bg-woody_banner bg-cover bg-center w-64">좋아하는 동물</span>
          <span className="bg-woody_banner bg-cover bg-center w-32">32강</span>
        </div>
      </section>
    </header>
  );
}
