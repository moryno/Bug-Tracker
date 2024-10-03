import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { dashboardService } from "_services";
import { message } from "antd";

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
    enabled: !!id
  });

  return response;
};

export const useGetDashboardStats = () => {
  const fetchDashboardStats = () => {
    return Promise.all([dashboardService.getDashboardCountStats(), dashboardService.getDashboardGridStats()])
  }
  const response: UseQueryResult<any> = useQuery({
    queryKey: ["DashboardStats"],
    queryFn: () => fetchDashboardStats(),
  });

  return response;
};


export const useCreateService = (service : any, queryKey : string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: any) => {
      return service(payload);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return mutation;
};

export function useDeleteRecord(service : any, queryKey: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
      mutationFn: (payload: string | number) => {
        return service(payload);
      },
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
      onError: (error) => {
        // Handle errors if the mutation fails.
        console.error("Delete failed:", error);
        message.error("Record could not be deleted.");
      },
    }
  );

  return mutation;
}