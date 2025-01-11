import { useState, useEffect, startTransition } from "react";
import API_BASE_URL from "@/utils/config";
import { Exercise } from "@/utils/types";

const useFetchViewById = (viewId: string | null, index: number) => {
  const [view, setView] = useState<Exercise>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!viewId) {
      startTransition(() => {
        setLoading(false);
      });
      return;
    }

    const fetchCourseDetails = async () => {
      try {

        const coursesResponse = await fetch(
          `${API_BASE_URL}/api/view_details_by_id/${viewId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "CustomAgent",
            },
          }
        );

        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses exercises");
        }
        const viewDetails = await coursesResponse.json();
        viewDetails.percentage = (index + 1) / 10;
        startTransition(() => {
          setView(viewDetails);
        });
      } catch (err) {
        if (err instanceof Error) {
          startTransition(() => {
            setError(err.message);
          });
          console.error("Error fetching course exercises:", err.message);
        } else {
          startTransition(() => {
            setError("An unknown error occurred");
          });
          console.error("Unknown error:", err);
        }
      } finally {
        startTransition(() => {
          setLoading(false);
        });
      }
    };

    fetchCourseDetails();
  }, [viewId]);

  return { view, loading, error };
};

export default useFetchViewById;
