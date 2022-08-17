import Post from "../components/Post.js";
import { useState } from "react";
import { timeline } from "../queries/fetchTimeline.js";
import { useQuery } from "@apollo/client";

import fetchTimeline from "../queries/fetchTimeline.js";

export default function Timeline({ profileId }) {
  const getTimeline = async (profileId) => {
    console.log(profileId);
    const currentTimeline = await timeline(profileId);
    console.log(currentTimeline);
    setTimeLine(currentTimeline);
  };
  console.log("profileid", profileId);
  const {
    loading: timelineLoading,
    error: timelineError,
    data: timelineData,
  } = useQuery(fetchTimeline, {
    variables: {
      request: { profileId: profileId, limit: 10 },
    },
  });
  if (timelineLoading) return "";
  if (timelineError) return `Error! ${timelineError.message}`;
  console.log("Query", timelineData);
  const timeline = timelineData.timeline;

  return (
    <div className="">
      <h2 className="p-8 mx-auto max-w-md uppercase tracking-wide text-3xl font-semibold text-green-700 pb-8">
        Timeline
      </h2>
      {timeline.items.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}
