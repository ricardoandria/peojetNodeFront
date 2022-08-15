import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const addRetrait = (retrait) => {
  return axios.post("http://localhost:7072/API/Banking/retrait", retrait);
};
const FetchRetrait = () => {
  return axios.get("http://localhost:7072/API/Banking/retrait");
};

export const useCreateRetrait = () => {
  return useQuery("retrait", FetchRetrait, {});
};

export const useAddRetrait = () => {
  const queryClient = useQueryClient();
  return useMutation(addRetrait, {
    onSuccess: () => {
      queryClient.invalidateQueries("retrait");
    },
  });
};
