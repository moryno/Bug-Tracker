import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";

export const useGetAll = (service : () => void, queryKey : string) => {
  const response: UseQueryResult<any> = useQuery({
    queryKey: [queryKey],
    queryFn: () => service(),
  });

  return response;
};

export const useGetById = (service : (value: any) => void, queryKey : string, id : any) => {
  const response: UseQueryResult<any>  = useQuery({
    queryKey: [`${queryKey}.${id}`, id],
    queryFn: () => service(id),
    enabled: !!id,
  });

  return response;
};

export const useCreateService = (service : any, queryKey : string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      return service(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return mutation;
};
