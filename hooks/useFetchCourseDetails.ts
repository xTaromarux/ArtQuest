import { useState, useEffect, startTransition, useRef } from "react";
import API_BASE_URL from "@/utils/config";
import useFetchCreateCourseState from "./useFetchCreateCourseState";

const useFetchCourseDetails = (
  userId: string | null,
  prevCourseId: string | null,
  newCourse: string | null
) => {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [userCourse, setUserCourse] = useState<string>("");

  const { loading: courseLoading, error: courseError } =
    useFetchCreateCourseState(userCourse, newCourse, prevCourseId);

  useEffect(() => {
    console.log("setFetchTrigger ", newCourse);
    startTransition(() => {
      setFetchTrigger((prev) => prev + 1);
    });
  }, [newCourse]);

  useEffect(() => {
    if (!userId) {
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
        startTransition(() => {
          setUserCourse((prev) =>
            prev === coursesData[0].user_course_id
              ? prev
              : coursesData[0].user_course_id
          );
          console.log("userCourse", userCourse);

        });
        console.log("coursesData");
        console.log(coursesData);

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
        console.log("courseDetails - stage");
        console.log(coursesData[0]?.stage);
        courseDetails.stage = coursesData[0]?.stage / 10;
        courseDetails.user_course_id = coursesData[0].user_course_id;
        startTransition(() => {
          setCourse(courseDetails);
        });
      } catch (err) {
        if (err instanceof Error) {
          startTransition(() => {
            setError(err.message);
          });
          console.error("Error fetching course details:", err.message);
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
  }, [userId, fetchTrigger]);

  return { course, loading, error };
};

export default useFetchCourseDetails;
