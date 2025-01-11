import { useState, useEffect } from "react";
import API_BASE_URL from "@/utils/config";

const useFetchCreateCourseState = (
  userCourseId: string,
  courseId: string | null,
  prevCourseId: string | null
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createCourseState = async () => {
      if (!userCourseId || courseId === prevCourseId) return;

      try {
        setLoading(true);
        const data = {
          user_course_id: userCourseId,
          stage: "0",
        };
        const formBody = new URLSearchParams(data).toString();

        const response = await fetch(`${API_BASE_URL}/api/progresses/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server response:", errorText);
          throw new Error("Failed to save course progress. Please try again.");
        }
      } catch (err: any) {
        console.error("Error creating course state:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    createCourseState();
  }, [userCourseId, courseId]);

  return { loading, error };
};

export default useFetchCreateCourseState;
