import {
  CommentCount,
  CommentEmbed,
  DiscussionEmbed,
  Recommendations,
} from "disqus-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Provider from "@/components/Navbar/provider";

const Disqus = ({ className }: { className?: string }) => {
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const url = `${origin}${asPath}`;
  console.log(url, "url");
  const { theme } = useTheme();

  // https://disqus.com/by/subhammaityxam/comments/
  return (
    <div className={className} key={theme}>
      <DiscussionEmbed
        shortname="https-purplesale-ui-vercel-app"
        config={
          {
            url,
            identifier: url,
            title: "PurpleSale",
            language: "en_US",
            sso: {
              name: "SampleNews",
              button: "http://example.com/images/samplenews.gif",
              icon: "http://example.com/favicon.png",
              url: "http://example.com/login/",
              logout: "http://example.com/logout/",
              profile_url: "http://example.com/profileUrlTemplate/{username}",
            },
            colorScheme: theme === "dark" ? "dark" : "light",
          } as any
        }
      />
    </div>
  );
};

export default Disqus;
