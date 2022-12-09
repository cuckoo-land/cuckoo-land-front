export default function Member() {
  return (
    <div className="mt-20 h-1/2">
      <div className="grid grid-cols-4 gap-4 place-items-center h-2/3">
        {[...new Array(10)].map(() => (
          <div className="flex items-center justify-center bg-cover bg-woody_rounded_button h-28 w-28 rounded-xl">
            <div className="w-20 h-20 bg-cover rounded-full bg-cuckoo_character" />
          </div>
        ))}
      </div>
    </div>
  );
}
