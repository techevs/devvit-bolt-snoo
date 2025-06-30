import { Devvit } from '@devvit/public-api';
import { defineConfig } from '@devvit/server';

// Side effect import to bundle the server
import '../server/index';

defineConfig({
  name: 'Love or Irritate Snoo & Get Surprised',
  entry: 'index.html',
  height: 'regular',
  menu: { enable: false },
});

export const Preview: Devvit.BlockComponent = () => {
  return (
    <vstack width={'100%'} height={'100%'} alignment="center middle">
      <text size="large" weight="bold">
      Love or Irritate Snoo & Get Surprised
      </text>
      <text size="medium" color="neutral-content-weak">
        Love or irritate Snoo with emojis!
      </text>
    </vstack>
  );
};

Devvit.addMenuItem({
  label: 'Create "Love or Irritate Snoo & Get Surprised" Game',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;

    try {
      const subreddit = await reddit.getCurrentSubreddit();
      const post = await reddit.submitPost({
        title: 'Love or Irritate Snoo & Get Surprised',
        subredditName: subreddit.name,
        preview: <Preview />,
      });
      ui.showToast({ text: 'Created Love or Irritate Snoo game post!' });
      ui.navigateTo(post.url);
    } catch (error) {
      if (error instanceof Error) {
        ui.showToast({ text: `Error creating post: ${error.message}` });
      } else {
        ui.showToast({ text: 'Error creating post!' });
      }
    }
  },
});

export default Devvit;