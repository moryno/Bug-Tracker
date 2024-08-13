import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAll= (service : () => void, queryKey : string) => {
  const response = useQuery({
    queryKey: [queryKey],
    queryFn: () => service(),
  });

  return response;
};

export const useGetById = (service : (value: any) => void, queryKey : string, id : any) => {
  const response = useQuery({
    queryKey: [`${queryKey}.${id}`, id],
    queryFn: () => service(id),
    enabled: !!id,
  });

  return response;
};

export const useCreateService = (service : (value: any) => Promise<void>, queryKey : string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => {
      return service(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return mutation;
};
