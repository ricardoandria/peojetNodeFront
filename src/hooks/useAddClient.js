import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const addClient = (client) => {
  return axios.post("http://localhost:7072/API/Banking/client", client);
};
const FetchClient = () => {
  return axios.get("http://localhost:7072/API/Banking/client");
};

export const useCreateClient = () => {
  return useQuery("client", FetchClient, {});
};
export const useAddClient = () => {
  const queryClient = useQueryClient();
  return useMutation(addClient, {
    onSuccess: () => {
      queryClient.invalidateQueries("client");
    },
  });
};
