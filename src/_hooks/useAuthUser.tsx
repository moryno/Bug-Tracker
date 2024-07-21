import { useSelector } from "react-redux";

export const useAuthUser = () => {
//   const user = useSelector((store) => store.auth.user);
  const user = {
    fullName: "Diana Nyambura",
    email: "deetee@gmail.com",
  };

  return {
    isAuthenticated: !!user,
    user,
  };
};
