export default function Member() {
  return (
    <div className="w-full mt-20 bg-cover h-1/2 bg-woody_modal">
      <div className="grid w-full grid-cols-4 gap-4 place-items-center ">
        {[...new Array(12)].map(() => (
          <div className="flex items-center justify-center bg-cover bg-white_rounded_button h-28 w-28 rounded-xl">
            <div className="w-20 h-20 bg-cover rounded-full bg-cuckoo_character" />
          </div>
        ))}
      </div>
    </div>
  );
}
