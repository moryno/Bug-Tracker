import { RootState } from "_redux";
import { useSelector } from "react-redux";

export const useAuthUser = () => {
  const user = useSelector((store: RootState) => store.user?.currentUser);

  return {
    isAuthenticated: !!user,
    user,
  };
};
