import { useQuery } from "@apollo/client";
import recommendedProfilesQuery from "../queries/recommendedProfilesQuery.js";
import Profile from "../components/Profile.js";

export default function RecommendedProfiles() {
  const { loading, error, data } = useQuery(recommendedProfilesQuery);

  if (loading) return "";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h2 className="p-8 mx-auto max-w-md uppercase tracking-wide text-3xl font-semibold text-green-700 pb-8">
        Recommended Profiles
      </h2>
      {data.recommendedProfiles.map((profile, index) => {
        return (
          <Profile
            key={profile.id}
            profile={profile}
            displayFullProfile={false}
          />
        );
      })}
    </div>
  );
}
