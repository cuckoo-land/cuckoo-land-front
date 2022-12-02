import Member from '@components/gameroom/member';
import Layout from '@components/layout';
import Button from '@components/button';
import Chat from '@components/gameroom/chat';

function GameRoom() {
  return (
    <Layout title="Gameroom" seoTitle="Gameroom">
      <div className="h-20 font-bold text-center">header</div>
      <Member />
      <div className="flex">
        <Button text="hi" />
      </div>
      <Chat />
    </Layout>
  );
}

export default GameRoom;
