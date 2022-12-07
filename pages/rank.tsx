import Button from '@components/button';
import Header from '@components/header';
import IconButton from '@components/iconButton';
import RankCard from '@components/rank/rankCard';

export default function Rank() {
  return (
    <div className="w-full min-w-md mx-auto max-h-screen overflow-hidden flex justify-center bg-[url('/intro-bgi.gif')] bg-cover">
      <Header isRankPage />
      <div className="w-full flex justify-center flex-col h-fit mt-20 relative">
        <div className="flex flex-col justify-center items-center">
          <div className="max-w-80 flex justify-center space-x-3">
            <div className="w-1/2">
              <Button text="마피아 게임" onClick={() => console.log('마피아 게임 랭킹 불러오기')} />
            </div>
            <div className="w-1/2">
              <Button text="다수결 게임" onClick={() => console.log('다수결 게임 랭킹 불러오기')} />
            </div>
            <label htmlFor="my-drawer-4">
              <IconButton onClick={() => console.log('새로고침 버튼 클릭')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </IconButton>
            </label>
          </div>
        </div>
        <div
          className="w-full flex flex-col max-h-[100vh] pb-16
           justify-start space-y-3 overflow-y-scroll mt-8 scrollbar-hide">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data, index) => (
            <RankCard key={data} rankingNumber={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
