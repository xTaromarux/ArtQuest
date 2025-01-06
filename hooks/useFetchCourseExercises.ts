import { useState, useEffect, startTransition } from "react";
import API_BASE_URL from "@/utils/config";

const useFetchCourseExercises = (
  courseId: string | null,
  newCourse: string | null
) => {
  const [pathItems, setPathItems] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      startTransition(() => {
        setLoading(false);
      });
      return;
    }
    startTransition(() => {
      setLoading(true);
    });

    const fetchCourseDetails = async () => {
      try {
        const coursesResponse = await fetch(
          `${API_BASE_URL}/api/course_exercises/${courseId}`,
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

        const courseDetails = await coursesResponse.json();
        startTransition(() => {
          setPathItems(courseDetails);
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
  }, [courseId, newCourse]);

  return { pathItems, loading, error };
};

export default useFetchCourseExercises;
