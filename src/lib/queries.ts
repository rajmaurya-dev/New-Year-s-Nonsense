import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { Resolution } from "../types/resolution";
import { useResolutionStore } from "@/store/resolution";
export const queryClient = new QueryClient();

export const useResolution = (id: string) => {
  return useQuery({
    queryKey: ["resolution", id],
    queryFn: async () => {
      const { data } = await axios.get<Resolution>(`/api/resolution/${id}`);
      return data;
    },
  });
};

export const useResolutions = (userId: string | null) => {
  return useQuery({
    queryKey: ["resolutions", userId],
    queryFn: async () => {
      const { data } = await axios.get<Resolution[]>("/api/my");
      return data;
    },
    enabled: !!userId,
  });
};

export const useDeleteResolution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      await axios.delete("/api/create", { data: { id, userId } });
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resolutions"] });
    },
  });
};

// lib/queries.ts
export const useUpdatePoint = () => {
  const queryClient = useQueryClient();
  const store = useResolutionStore();

  return useMutation({
    mutationFn: async ({
      resolutionId,
      pointId,
      userId,
      isCompleted,
    }: {
      resolutionId: string;
      pointId: string;
      userId: string;
      isCompleted: boolean;
    }) => {
      const { data } = await axios.put("/api/create", {
        id: resolutionId,
        userId,
        pointId,
        isCompleted,
      });
      return data;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["resolution", variables.resolutionId],
      });

      const previousResolution = queryClient.getQueryData<Resolution>([
        "resolution",
        variables.resolutionId,
      ]);

      const updatedResolution = {
        ...previousResolution!,
        points: previousResolution!.points.map((point) =>
          point.id === variables.pointId
            ? {
                ...point,
                isCompleted: variables.isCompleted,
                completedAt: variables.isCompleted
                  ? new Date().toISOString()
                  : null,
              }
            : point
        ),
      };

      store.setCurrentResolution(updatedResolution);
      queryClient.setQueryData(
        ["resolution", variables.resolutionId],
        updatedResolution
      );

      return { previousResolution };
    },
    onError: (err, variables, context) => {
      if (context?.previousResolution) {
        store.setCurrentResolution(context.previousResolution);
        queryClient.setQueryData(
          ["resolution", variables.resolutionId],
          context.previousResolution
        );
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["resolution", variables.resolutionId],
      });
    },
  });
};
