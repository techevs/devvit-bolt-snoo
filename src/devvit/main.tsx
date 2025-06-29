import { Devvit, useState } from '@devvit/public-api';

// Configure Devvit app with proper permissions
Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
});

export const App: Devvit.CustomPostComponent = (context) => {
  const { redis } = context;
  const [webviewVisible, setWebviewVisible] = useState(false);

  const onMessage = async (msg: any) => {
    console.log('Received message in Devvit:', msg);
    
    try {
      switch (msg.type) {
        case 'SAVE_CLICKS':
          try {
            const clicks = msg.data?.clicks;
            if (typeof clicks !== 'number' || clicks <= 0) {
              console.error('Invalid clicks value:', clicks);
              return { type: 'ERROR', data: { message: 'Invalid clicks value' } };
            }

            console.log(`Saving ${clicks} clicks to Redis`);
            const newTotal = await redis.incrby('total_clicks', clicks);
            console.log(`Successfully saved clicks. New total: ${newTotal}`);
            
            return { type: 'CLICKS_SAVED', data: { totalClicks: newTotal } };
          } catch (error) {
            console.error('Error saving clicks to Redis:', error);
            return { type: 'ERROR', data: { message: 'Failed to save clicks to storage' } };
          }
          
        case 'GET_TOTAL_CLICKS':
          try {
            console.log('Retrieving total clicks from Redis');
            const clicks = await redis.get('total_clicks');
            const count = clicks ? parseInt(clicks, 10) : 0;
            console.log('Retrieved total clicks from Redis:', count);
            
            return { type: 'TOTAL_CLICKS', data: { totalClicks: count } };
          } catch (error) {
            console.error('Error getting total clicks from Redis:', error);
            return { type: 'ERROR', data: { message: 'Failed to get total clicks from storage' } };
          }
          
        default:
          console.log('Unknown message type:', msg.type);
          return { type: 'ERROR', data: { message: 'Unknown message type' } };
      }
    } catch (error) {
      console.error('Error processing message:', error);
      return { type: 'ERROR', data: { message: 'Internal error processing message' } };
    }
  };

  if (webviewVisible) {
    return (
      <vstack height="100%" width="100%">
        <webview
          id="myWebView"
          url="index.html"
          onMessage={onMessage}
          height="100%"
          width="100%"
        />
      </vstack>
    );
  }

  return (
    <vstack height="100%" width="100%" alignment="center middle" gap="medium" padding="medium">
      <text size="xxlarge" weight="bold" color="primary">
        🎮 Surprise Snoo
      </text>
      <text size="medium" color="secondary" alignment="center">
        Love or irritate Snoo with emoji effects!
      </text>
      <text size="small" color="neutral-content-weak" alignment="center">
        Click below to start playing and track your clicks across all sessions!
      </text>
      <button
        appearance="primary"
        size="large"
        onPress={() => setWebviewVisible(true)}
      >
        🚀 Start Game
      </button>
    </vstack>
  );
};

// Register the custom post type
Devvit.addCustomPostType({
  name: 'Surprise Snoo',
  height: 'regular',
  render: App,
});

// Menu item to create posts
Devvit.addMenuItem({
  label: 'Create Surprise Snoo Game',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;

    try {
      const subreddit = await reddit.getCurrentSubreddit();
      const post = await reddit.submitPost({
        title: 'Surprise Snoo - Love or Irritate Snoo!',
        subredditName: subreddit.name,
        preview: (
          <vstack width={'100%'} height={'100%'} alignment="center middle">
            <text size="large" weight="bold">
              Surprise Snoo
            </text>
            <text size="medium" color="neutral-content-weak">
              Love or irritate Snoo with emoji effects!
            </text>
          </vstack>
        ),
      });
      ui.showToast({ text: 'Created Surprise Snoo game post!' });
      ui.navigateTo(post.url);
    } catch (error) {
      console.error('Error creating post:', error);
      if (error instanceof Error) {
        ui.showToast({ text: `Error creating post: ${error.message}` });
      } else {
        ui.showToast({ text: 'Error creating post!' });
      }
    }
  },
});

export default Devvit;