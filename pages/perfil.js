import Profile from "../components/Profile.js";
import { Tabs } from "flowbite-react";
import { CollectionIcon, UserIcon } from "@heroicons/react/outline";
import Post from "../components/Post.js";
import NftGallery from "../components/NftGallery.js";

export default function Perfil({ data }) {
  return (
    <div className="max-w-md mx-auto bg-white  overflow-hidden md:max-w-2xl">
      <Tabs.Group
        aria-label="Tabs with icons"
        style="underline"
        className="flex justify-between items-center"
      >
        <Tabs.Item
          active={true}
          title="Profile"
          icon={UserIcon}
          className="flex justify-between items-center"
        >
          <div className="">
            <Profile profile={data.profile} displayFullProfile={true} />
            {data.publications.items.map((post, idx) => {
              return <Post key={idx} post={post} />;
            })}
          </div>
        </Tabs.Item>
        <Tabs.Item
          title="NFTs"
          icon={CollectionIcon}
          className="flex justify-between items-center"
        >
          <NftGallery address={data.profile.ownedBy} />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}
