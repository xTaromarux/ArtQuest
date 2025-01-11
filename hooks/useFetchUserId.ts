import { useState, useEffect, startTransition } from "react";
import API_BASE_URL from "@/utils/config";
import { useUser } from "@clerk/clerk-expo";

const useFetchUserId = () => {
  const { user } = useUser();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        if (!user?.emailAddresses[0].emailAddress) {
          throw new Error("User email not found");
        }

        const response = await fetch(
          `${API_BASE_URL}/api/users/get-id-by-email?email=${user.emailAddresses[0].emailAddress}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "CustomAgent",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user_id");
        }

        const data = await response.json();
        if (!data?.id) {
          throw new Error("No user_id found in response");
        }
        startTransition(() => {
          setUserId(data.id);
        });
      } catch (err: any) {
        console.error("Error fetching userId:", err);
        startTransition(() => {
          setError(err.message || "An error occurred");
        });
      } finally {
        startTransition(() => {
          setLoading(false);
        });
      }
    };

    fetchUserId();
  }, [user]);

  return { userId, loading, error };
};

export default useFetchUserId;
