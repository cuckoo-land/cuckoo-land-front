export default function ProfileCard() {
  return (
    <div className=" w-96 mx-auto bg-dark_modal bg-no-repeat bg-cover p-5 border rounded-xl mb-5 shadow-xl">
      <div className="flex">
        <div className="pr-8 py-2">
          <div className="bg-slate-200 rounded-full w-16 h-16 shadow-2xl" />
        </div>
        <div className="flex flex-col w-full space-y-3">
          <div className="text-gray text-white font-bold text-2xl md:text-3xl">GUEST0001</div>
          <div className="font-medium text-white text-md md:text-xl">10전 1승 (10%)</div>
          <div className="font-bold text-white text-md md:text-xl">Tier Bronze II</div>
        </div>
      </div>
    </div>
  );
}
