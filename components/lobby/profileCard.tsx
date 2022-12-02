export default function ProfileCard() {
  return (
    <div className="w-5/6 mx-auto h-36 bg-white p-5 border rounded-xl mb-5 shadow-xl">
      <div className="flex">
        <div className="pr-8 py-2">
          <div className="bg-slate-200 rounded-full w-16 h-16" />
        </div>
        <div className="flex flex-col w-full space-y-3">
          <div className="font-bold text-2xl md:text-3xl">GUEST0001</div>
          <div className="font-medium text-md md:text-xl">10전 1승 (10%)</div>
          <div className="font-bold text-md md:text-xl">Tier Bronze II</div>
        </div>
      </div>
    </div>
  );
}
