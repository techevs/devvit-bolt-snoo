import { Devvit } from '@devvit/public-api';
import { defineConfig } from '@devvit/server';

// Side effect import to bundle the server
import '../server/index';

defineConfig({
  name: 'Snoo Pet Game',
  entry: 'index.html',
  height: 'regular',
  menu: { enable: false },
});

export const Preview: Devvit.BlockComponent = () => {
  return (
    <vstack width={'100%'} height={'100%'} alignment="center middle">
      <text size="large" weight="bold">
        Snoo Pet Game
      </text>
      <text size="medium" color="neutral-content-weak">
        Love or irritate Snoo with emoji effects!
      </text>
    </vstack>
  );
};

Devvit.addMenuItem({
  label: 'Create Snoo Pet Game',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;

    try {
      const subreddit = await reddit.getCurrentSubreddit();
      const post = await reddit.submitPost({
        title: 'Snoo Pet Game - Love or Irritate Snoo!',
        subredditName: subreddit.name,
        preview: <Preview />,
      });
      ui.showToast({ text: 'Created Snoo Pet Game post!' });
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