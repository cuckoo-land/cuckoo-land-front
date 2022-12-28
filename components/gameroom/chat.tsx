interface IChatProps {
  sender: string;
  message: string;
}

export default function Chat({ sender, message }: IChatProps) {
  return (
    <div className="flex gap-2">
      <p className="font-bold">{sender}</p>
      <p> : </p>
      <p className="">{message}</p>
    </div>
  );
}
