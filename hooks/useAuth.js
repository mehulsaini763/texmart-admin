import { useAppDispatch, useAppSelector } from "./useRedux";
import { updateAdmin } from "@/redux/slices/adminSlice";

const useAuth = () => {
  const admin = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const update = (data) => dispatch(updateAdmin(data));

  const remove = () => {};

  return {
    admin,
    update,
    remove
  };
};

export default useAuth;
