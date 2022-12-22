import Image from 'next/image';

export default function SeletContent() {
  const handleSelect = () => {
    // 선택한 이미지를 서버로 전송하는 로직?
    alert('선택 완료!');
  };

  return (
    <main>
      <section className="bg-dark_modal bg-cover bg-center p-4 w-3/4 h-1/2 flex flex-col gap-1 mx-auto shadow-2xl">
        <Image
          onClick={handleSelect}
          className="object-cover rounded-lg hover:opacity-90 cursor-pointer"
          src="/dog.jpeg"
          width="100%"
          height="200px"
        />
        <span className="bg-woody_banner bg-cover bg-center w-1/4 mx-auto font-bold text-3xl text-white text-center">
          VS
        </span>
        <Image
          onClick={handleSelect}
          className="object-cover rounded-lg hover:opacity-90 cursor-pointer"
          src="/cat.jpeg"
          width="100%"
          height="200px"
        />
      </section>
    </main>
  );
}
