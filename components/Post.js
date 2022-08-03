import { Timeline } from "flowbite-react";

export default function Post(props) {
  const post = props.post;
  let date = new Date(post.createdAt);
  return (
    <Timeline>
      <Timeline.Item className="">
        <Timeline.Content>
          <Timeline.Time>{date.toString().substring(0, 21)}</Timeline.Time>
          <Timeline.Body>{post.metadata.content}</Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  );
}
