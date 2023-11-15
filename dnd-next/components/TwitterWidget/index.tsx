import Link from "next/link";

export const TwitterWidget = () => {
  return (
    <div>
      <a
        className="twitter-timeline"
        href="https://twitter.com/dndphl?ref_src=twsrc%5Etfw"
      >
        Tweets by dndphl
      </a>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </div>

    // from https://publish.twitter.com/?query=https%3A%2F%2Ftwitter.com%2Fdndphl%3Flang%3Den&widget=Timeline
  );
};
