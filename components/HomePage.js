import { useQuery } from "@apollo/client";
import recommendedProfilesQuery from "../queries/recommendedProfilesQuery.js";
import Profile from "../components/Profile.js";

export default function HomePage() {
  const { loading, error, data } = useQuery(recommendedProfilesQuery);

  if (loading) return "";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {console.log(data)}
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
