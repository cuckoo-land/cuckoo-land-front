import { api } from 'api/core/instance';
import { useInfiniteQuery } from 'react-query/react';

export default function useGetGameRooms() {
  const fetchGameRoomList = async (pageParam: number) => {
    const response = await api.get(`/auth/rooms?page=${pageParam}&size=7&sort=id,DESC`);
    const { content, last: isLast } = response.data;
    return { content, nextPage: pageParam + 1, isLast };
  };
  const {
    data: gameRooms,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(['gamerooms'], ({ pageParam = 0 }) => fetchGameRoomList(pageParam), {
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => (!lastPage.isLast ? lastPage.nextPage : undefined),
  });

  return { gameRooms, fetchNextPage, isFetchingNextPage, refetch };
}
