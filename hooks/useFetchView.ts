import { useState, useEffect } from "react";
import API_BASE_URL from "@/utils/config";
import { Exercise } from "@/utils/types";

const useFetchView = (exerciseId: string | null, index: number) => {
  const [view, setView] = useState<Exercise>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!exerciseId) {
      setLoading(false);
      return;
    }

    const fetchCourseDetails = async () => {
      try {
        const coursesResponse = await fetch(
          `${API_BASE_URL}/api/view_details/${exerciseId}`,
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
        viewDetails.percentage = index/10
        setView(viewDetails);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
            console.error("Error fetching course exercises:", err.message);
          } else {
            setError("An unknown error occurred");
            console.error("Unknown error:", err);
          }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [exerciseId]);

  return { view, loading, error };
};

export default useFetchView;
