import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const addVersement = (versement) => {
  return axios.post("http://localhost:7072/API/Banking/versement", versement);
};
const FetchVersement = () => {
  return axios.get("http://localhost:7072/API/Banking/versement");
};

export const useCreateVersement = () => {
  return useQuery("versement", FetchVersement, {});
};

export const useAddVersement = () => {
  const queryClient = useQueryClient();
  return useMutation(addVersement, {
    onSuccess: () => {
      queryClient.invalidateQueries("versement");
    },
  });
};
