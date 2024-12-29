import { useState, useEffect } from "react";
import API_BASE_URL from "@/utils/config";

const useFetchCourseDetails = (userId: string | null) => {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCourseDetails = async () => {
      try {
        const coursesResponse = await fetch(
          `${API_BASE_URL}/api/courses/${userId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "CustomAgent",
            },
          }
        );

        if (!coursesResponse.ok) {
          throw new Error("Failed to fetch courses");
        }

        const coursesData = await coursesResponse.json();
        const courseId = coursesData[0]?.course_id;

        if (!courseId) {
          throw new Error("No course_id found in response");
        }

        const courseDetailsResponse = await fetch(
          `${API_BASE_URL}/api/course_details/${courseId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "CustomAgent",
            },
          }
        );

        if (!courseDetailsResponse.ok) {
          throw new Error("Failed to fetch course details");
        }

        const courseDetails = await courseDetailsResponse.json();
        courseDetails.stage = coursesData.stage;
        setCourse(courseDetails);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
            console.error("Error fetching course details:", err.message);
          } else {
            setError("An unknown error occurred");
            console.error("Unknown error:", err);
          }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [userId]);

  return { course, loading, error };
};

export default useFetchCourseDetails;
