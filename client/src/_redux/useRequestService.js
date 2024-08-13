import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AffiliateQueryEnums } from "_constants";
import { productService } from "_services";

export const useGetProducts = (params, min, max, sort) => {
  const response = useQuery({
    queryKey: [AffiliateQueryEnums.PRODUCTS],
    queryFn: () => productService.getProducts(params, min, max, sort),
  });

  return response;
};

export const useGetAll = (service, queryKey) => {
  const response = useQuery({
    queryKey: [queryKey],
    queryFn: () => service(),
  });

  return response;
};

export const useGetById = (service, queryKey, id) => {
  const response = useQuery({
    queryKey: [`${queryKey}.${id}`],
    queryFn: () => service(id),
    enabled: !!id,
  });

  return response;
};

export const useCreateService = (service, queryKey) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => {
      return service(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
  });

  return mutation;
};
