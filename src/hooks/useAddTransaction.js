import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const FetchTransaction = () => {
  return axios.get("http://localhost:7072/API/Banking/etat_compte");
};

export const useCreateTransaction = () => {
  return useQuery("retrait", FetchTransaction, {});
};
